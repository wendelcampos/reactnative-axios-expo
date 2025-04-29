import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router/build/hooks";

import { ModalPedidos } from "../../components/modal";
import { api } from "@/server/axios";

interface OrderProps {
    id?: string
    ProductName: string
    price: string
    quantity: string
}

export default function Order() {
    const { waiter, table } = useLocalSearchParams()
    const [selectedWaiter, setSelectedWaiter] = useState(waiter);
    const [selectedTable, setSelectedTable] = useState(table);


    const [orderId, setOrderId] = useState("");

    const [modalVisible, setModalVisible] = useState(false)

    const [orders, setOrders] = useState<OrderProps[]>([])

    useEffect(() => {
        if (!orderId) {
            const newOrderId = String(Math.floor(Math.random() * 90 + 10));
            setOrderId(newOrderId);
        }
    }, []);	

    useEffect(() => {
        if (orderId) {
            findOrders();
        }
    }, [orderId]);
   
    const findOrders = async () => {
        const response = await api.get(`/orders-details/find/${orderId}`);	
        
        const orders = response.data.map((order: any) => {

            return {
                productId: order.id.toString(),
                productName: order.order[0].productName,
                price: order.order[0].quantity.toString(),
                quantity: order.order[0].quantity.toString(),
            }
        })

        setOrders(orders)
    }

    const handlePedidos = () => {
        setModalVisible(true);
    }

    const handleSaveOrder = async () => {
        try {
            const payload = [{
                id: Number(orderId),
                waiter: selectedWaiter,
                table: selectedTable,
                order: orders.map((order: any) => ({
                    id: Number(order.productId),
                    item: order.productName,
                    price: parseFloat(order.price),
                    quantity: parseInt(order.quantity, 10),
                })),
                status: "Pendente",
            }];

            await api.post("/orders/create", payload);
    
            alert("Pedido salvo com sucesso!");
            handleDeleteOrder(orderId)
            setOrders([])
            setOrderId("")
            setSelectedWaiter("")
            setSelectedTable("")
        } catch (error) {
            console.error("Erro ao salvar o pedido:", error)
            alert("Erro ao salvar o pedido. Tente novamente.")
        }
    }

    const handleDeleteItem = async (itemId: string) => {

        await api.delete(`/orders-details/delete-item/${orderId}/${itemId}`)

        setOrders((prevOrders) => prevOrders.filter((order:any) => order.productId !== Number(itemId)))
    };

    const handleDeleteOrder = async (orderId: any) => {
        await api.delete(`/orders-details/delete/${orderId}`)

        setOrders([])
        setOrderId("")
        setSelectedWaiter("")
        setSelectedTable("")
    }

    const addOrderItem = (newItem: any) => {
        setOrders((prevOrders) => [...prevOrders, newItem]);
    }

    return (
        <View style={styles.container}>
                <Image
                    source={require("../../assets/images/logo.jpg")}
                    style={styles.logo}
                />
                <TouchableOpacity style={styles.button} onPress={handlePedidos}>
                    <Text style={{ color: "#fff" }}>Adicionar</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.headerCell}>Pedido</Text>
                    <Text style={styles.headerCell}>Quantidade</Text>
                    <Text style={styles.headerCell}>Actions</Text>
                </View>
                <FlatList
                    data={orders}
                    keyExtractor={(item: any) => item.productId}
                    renderItem={({ item }: any) => {
                        return (
                            <View style={styles.row}>
                                <Text style={styles.cell}>{item.productName}</Text>
                                <Text style={styles.cell}>{item.quantity}</Text>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => handleDeleteItem(item.productId)} style={{ marginLeft: 10 }}>
                                        <Icon name="delete" size={24} color="#FF0000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
                <View style={styles.containerButton}>
                    <Link href="/waiter" asChild>
                        <TouchableOpacity style={styles.buttonCancelar} onPress={() => handleDeleteOrder(orderId)}>
                            <Text style={{ color: "#fff" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/waiter" asChild>
                        <TouchableOpacity style={styles.buttonSalvar} onPress={handleSaveOrder}>
                            <Text style={{ color: "#fff" }}>Salvar</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                <Modal visible={modalVisible} animationType='fade' transparent={true}>
                    <ModalPedidos handleClose={ () => setModalVisible(false)} orderId={orderId} addOrderItem={addOrderItem}/>
                </Modal>     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    button: {
        backgroundColor: "#FF0000",
        width: '70%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
    },
    cell: {
        flex: 1,
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        paddingBottom: 5,
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    containerButton: {
        flexDirection: "row" ,
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
        marginTop: 20,
        marginBottom: 20,
    },
    buttonCancelar: {
        backgroundColor: "#FF0000",
        width: '45%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonSalvar: {
        backgroundColor: "#FF0000",
        width: '45%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 20,
    },
    
})