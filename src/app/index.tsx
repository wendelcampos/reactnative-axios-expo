import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/logo.jpg")}
                style={styles.logo}
            />

            <Link href="/waiter" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text>Acessar</Text>
                </TouchableOpacity>
            </Link>
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
    }
})