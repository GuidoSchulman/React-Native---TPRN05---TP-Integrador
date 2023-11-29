import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Image, Modal, Pressable, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Clipboard from 'expo-clipboard'
import AppServices from "../services/appService";
import { useNavigation } from "@react-navigation/native";
import Menu from "../components/Menu";

const appService = new AppServices();

export default function About() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScanner, setDataScanner] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const Nombres="GUIDO SCHULMAN Y BAUTISTA LARRAIN"
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    const loadBackground = async () => {
      if (JSON.parse(await appService.getFondo())) {
        let backgroundImage = JSON.parse(await appService.getFondo());
        setImage(backgroundImage.uri);
      }
    };

    loadBackground();
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShowModal(true);
    setDataScanner(data);
  };

  const copyToClipboard = () => {
    Clipboard.setString(Nombres);
  };


  return (
<View style={styles.centeredView}>
      <ImageBackground source={{ uri: image }} style={styles.fondo}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          // Add any other necessary props
        />
        {scanned && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShowModal(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle}>{Nombres}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
    <View   >
    <TouchableOpacity onPress={copyToClipboard}>
          <Image source={require("../../assets/barcode.gif")} />
          <Text>copiar al Clipboard</Text>
        </TouchableOpacity>
    </View>
    
      </ImageBackground>
  <View style={styles.menuContainer}>
  <Menu navigation={navigation} />
</View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  fondo: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "blue",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    alignItems: "center"
  },
});
