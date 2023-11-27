import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ImageBackground,
    Image,

    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";

import { BarCodeScanner } from "expo-barcode-scanner";

import Clipboard from "@react-native-community/clipboard";
import AppServices from "../services/appService";
import { useNavigation } from "@react-navigation/native";
const appService = new AppServices();
export default function About() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [dataScanner, setDataScanner] = useState("");
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };
        loadBackground();
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setDataScanner(data);
    };

    const copiarData = () => {
        Clipboard.setString(dataScanner);
    }

    let loadBackground = async () => {
        if (JSON.parse(await appService.getFondo())) {
            let backgroundImage = JSON.parse(await appService.getFondo());
            setImage(backgroundImage.uri);
        }
    };



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={{ uri: image }} style={styles.fondo}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned ? (
                    <>
                        
                    </>
                ) : (
                    <>
                    </>
                )}
            
            <TouchableOpacity onPress={copiarData}>
            <Image
                source={require("../../assets/barcode.gif")}
            />
                <Text>copiar al Clipboard</Text>
            </TouchableOpacity>
           
             </ImageBackground>
        </SafeAreaView>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loginDiferente: {
        width: "75%",
        backgroundColor: "#D4AF37",
        paddingVertical: 12,
        marginTop: 15,
        marginBottom: 15,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    inputView: {
        backgroundColor: "#4b9197",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    fondo: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    boton: {
        marginHorizontal: 55,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00716F",
        paddingVertical: 8,
        borderRadius: 23,
    },
    textoBoton: {
        color: "white",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        width: 300,
        height: 550,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    /*buttonOpen: {
          backgroundColor: '#F194FF',
        },*/
    buttonClose: {
        backgroundColor: "#2196F3",
    },
})