import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Modal,
  Alert,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import React, { useState, useEffect } from "react";
import AppServices from "../services/appService";

export default function LlamadoEmergencia() {
  const [numero, setNumero] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  
  const appService = new AppServices()
  const loadPerfil = async () => {
    let perfil = await appService.getPerfil();
    setNumero(perfil.numero);
  };
  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(async (accelerometerData) => {
        auxiliarX = x;
        if (accelerometerData.x < auxiliarX) {
          if (auxiliarX - accelerometerData.x > 0.5) {
            llamarNumero();
          }
        } else {
          if (accelerometerData.x - auxiliarX > 0.5) {
            if (auxiliarX - accelerometerData.x > 0.5) {
              llamarNumero();
            }
          }
        }
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    loadPerfil()
    _subscribe();

    return () => _unsubscribe();
  }, []);
  //llamar
  const llamarNumero = () => {
    if (numero === "") {
        console.log("Vacio ",numero);
      setShowModal(true);
    } else {
      const phoneNumber = numero;
      console.log(phoneNumber);
       Linking.openURL(`tel:${phoneNumber}`);
     
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(false);
        }}
      >
        {/* USAR LAS VARIABLES DEL BACK Q LE PASAMOS ARRIBA (SI NECECESITAMOS AYUDA VER EL TP NAVIGATION)*/}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>NUMERO NO IDENTIFICADO</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.textoPrincipal}>Ingrese el numero</Text>
    
    
      
<Text>{numero}</Text>
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    backgroundColor: "lightgray",
    borderRadius: 23,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 8,
    justifyContent: "center",
    borderColor: "#00716F",
  },
  image: {
    width: "100%",
    height: "40%",
  },
  textoPrincipal: {
    fontSize: 20,
    alignSelf: "center",
  },
  textoSecundario: {
    marginHorizontal: 50,
    textAlign: "center",
    marginTop: 5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
