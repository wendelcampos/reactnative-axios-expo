import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

import { api } from "@/server/axios";

interface ModalPedidosProps {
    orderId?: string
    handleClose: () => void
    addOrderItem: (item: any) => void
}

export function ModalPedidos({ handleClose, orderId, addOrderItem }: ModalPedidosProps) {
    const router = useRouter()

    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    const [selectedValueCategory, setSelectedValueCategory] = useState("")
    const [selectedValueProducts, setSelectedValueProducts] = useState("")

    const [idProduct, seIdProduct] = useState("")
    const [priceProduct, setPriceProduct] = useState("")
    const [quantity, setQuantity] = useState("");

    async function getCategory() {
            try {
                const response = await api.get("/products");
                setCategory(response.data);
            } catch (error: any) {
                console.error(error.message);
            }
    }

    async function getProducts(categoryId: string) {
            try {
                const response = await api.get(`/products/${categoryId}`);
                setProducts(response.data);
            } catch (error: any) {
                console.error(error.message);
            }
    }

    async function handleSaveOrder() {
        try {
           
            const newItem = [
                {
                    order: orderId,
                    products: [
                        {
                            productId: idProduct,
                            productName: selectedValueProducts,
                            price: priceProduct,
                            quantity: quantity,
                        },
                    ],
                }
            ];
    
            await api.post("/orders-details", newItem)

            addOrderItem(newItem[0].products[0])
            handleClose()

            router.push({
                pathname: "/order"
            });

        } catch (error: any) {
            console.error("Erro ao salvar os dados:", error.message);
        }
    }

    useEffect(() => {
        getCategory()
    }, []);

    return (
        <View style={styles.container}>
                <View style={styles.content}>
                        <View style={styles.pedidoArea}>
                            <Text style={styles.textPedido}>Pedido</Text>
                            <TextInput
                                    style={styles.input}
                                    value={orderId}
                                    editable={false}
                            />
                        <Text style={styles.textPedido}>Categoria</Text>
                        <Picker
                            selectedValue={selectedValueCategory}
                            style={styles.pickerPedidos}
                            onValueChange={(item) => {
                                setSelectedValueCategory(item)
                                getProducts(item)
                            }}
                        >
                            <Picker.Item label="Selecione uma Categoria"/>
                            {category.map((category: any) => (
                                <Picker.Item key={category.id} label={category.category} value={category.id} />
                            ))}
                        </Picker>

                        <Text style={styles.textPedido}>Produto</Text>
                        <Picker
                            selectedValue={selectedValueProducts}
                            style={styles.pickerPedidos}
                            onValueChange={(itemValue) => {
                                const selectedProduct: any = products.find((product: any) => product.name === itemValue);
                                if (selectedProduct) {
                                    setSelectedValueProducts(selectedProduct.name); 
                                    seIdProduct(selectedProduct.id);
                                    setPriceProduct(selectedProduct.price); 
                                }
                            }}
                        >
                            <Picker.Item label="Selecione um produto" value="" />
                            {products.map((product: any) => (
                                <Picker.Item 
                                    key={product.id} 
                                    label={product.name} 
                                    value={product.name} />
                            ))}
                        </Picker>

                        <Text style={styles.textPedido}>Quantidade</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    text.replace(/[^0-9]/g, "")
                                    setQuantity(text)

                                }}
                            />
                </View>
                
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.buttonCancelar} onPress={handleClose}>
                        <Text style={styles.textCancelar}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSave} onPress={handleSaveOrder}>
                        <Text style={styles.textSalvar}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24, 24, 24, 0.6)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    buttonArea: {
        flexDirection: "row",
        width: '90%',
        marginTop: 8,
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonCancelar: {
        backgroundColor: "#FF0000",
        width: '45%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonSave: {
        backgroundColor: "#FF0000",
        width: '45%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    textCancelar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    textSalvar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "90%",
        height: 50,
        borderWidth: 3,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        fontSize: 16,
        color: "#333",
    },
    pedidoArea: {
        width: "90%",
    },
    textPedido: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    pickerPedidos: {
        height: 55,
        width: 280,
        color: "#fff",
        backgroundColor: "#333",
        marginBottom: 30,
    },
})
