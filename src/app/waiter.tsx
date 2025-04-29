import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Link, router } from "expo-router";

import { api } from "@/server/axios";

export default function Waiter() {
    const [waiters, setWaiter] = useState([])
    const [tables, setTables] = useState([])

    const [selectedValueWaiters, setSelectedValueWaiters] = useState("")
    const [selectedValueTables, setSelectedTables] = useState("")

    async function goToHome() {
        router.push("/");
    }

    async function getWaiters() {
        try {
            const response = await api.get("/waiters");
            setWaiter(response.data);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    async function getTables() {
        try {
            const response = await api.get("/tables");
            setTables(response.data);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getWaiters();
        getTables()
    }, []);

    return (
        <View style={styles.container}>
                <Image
                    source={require("../../assets/images/logo.jpg")}
                    style={styles.logo}
                    />
                <Text style={styles.textGarcon}>Garçon</Text>

                <Picker
                    selectedValue={selectedValueWaiters}
                    style={styles.pickerGarcon}
                    onValueChange={(item) => setSelectedValueWaiters(item)}
                >
                    <Picker.Item label="Selecione um Garçon" value="" />
                    {waiters.map((waiter: any) => (
                        <Picker.Item key={waiter.id} label={waiter.name} value={waiter.name} />
                    ))}
                </Picker>

                <Text style={styles.textMesa}>Mesa</Text>

                <Picker
                    selectedValue={selectedValueTables}
                    style={styles.pickerMesa}
                    onValueChange={(item) => setSelectedTables(item)}
                >
                    <Picker.Item label="Selecione uma Mesa" value="" />
                    {tables.map((table: any, _) => (
                        <Picker.Item key={table.id} label={table.table} value={table.table} />
                    ))}       
                </Picker>

                <Link href={{ pathname: "/order", params: { waiter: selectedValueWaiters, table: selectedValueTables }}} style={styles.buttonLink} asChild>
                    <TouchableOpacity
                        style={[{ opacity: selectedValueWaiters && selectedValueTables ? 1 : 0.5 }]}
                        disabled={!(selectedValueWaiters || selectedValueTables)}
                    >
                        <Text style={{ color: "#fff" }}>Continuar</Text>
                    </TouchableOpacity>
                </Link>
                
                <TouchableOpacity style={styles.button} onPress={goToHome}>
                        <Text style={{ color: "#fff" }}>voltar</Text>
                </TouchableOpacity> 
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
    pickerGarcon: {
        height: 60,
        width: 250,
        color: "#fff",
        backgroundColor: "#333",
        marginBottom: 10
    },
    pickerMesa: {
        height: 60,
        width: 250,
        color: "#fff",
        backgroundColor: "#333",
    },
    textGarcon: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 10,
    },
    textMesa: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 10,
    },
    logo: {
        width: 300,
        height: 300,
    },
    button: {
        backgroundColor: "#FF0000",
        width: '70%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 20,
    },
    buttonLink: {
        backgroundColor: "#FF0000",
        width: '70%',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 18,
    }
})