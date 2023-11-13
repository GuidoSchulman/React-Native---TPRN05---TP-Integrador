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
  Pressable
} from "react-native";
import { Accelerometer } from "expo-sensors";
import React, { useState, useEffect } from "react";

export default function LlamadoEmergencia() {
    constructor=(props) =>{
        super(props);
        this.state = {
          accelerometerData: {},
          handRaised: false,
        };
    
        this.socket = io(SERVER_URI);
        this.getInQueue = this.getInQueue.bind(this);
        this.sendSocket = _.debounce(this.sendSocket.bind(this), 2000);
      }
    
      componentDidMount=()=> {
        this._subscribe();
      }
    
      componentWillUnmount=()=> {
        this.state.handRaised = false;
        this._unsubscribe();
        this.socket.close();
      }
    
      getInQueue=()=> {
        const { y } = this.state.accelerometerData;
        if (y > 0.7) {
          this.state.handRaised = true;
          this.sendSocket();
        }
      }
    
      sendSocket=()=>{
        this.socket.emit(
          llamarNumero()
        );
      }
    
      _subscribe = () => {
        // When invoked, the listener is provided a single argumument that is an object containing keys x, y, z.
        this._subscription = Accelerometer.addListener((accelerometerData) => {
          this.setState({ accelerometerData });
          this.getInQueue();
        });
      }
    
      _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
      }
//llamar
  const llamarNumero = () => {
    if (texto==="") {
        console.log("Llega");
        setShowModal(true)
    }else{
        const phoneNumber = texto;
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
    Alert.alert('Modal has been closed.');
    setShowModal(false);
  }}>
    {/* USAR LAS VARIABLES DEL BACK Q LE PASAMOS ARRIBA (SI NECECESITAMOS AYUDA VER EL TP NAVIGATION)*/}
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>NUMERO NO IDENTIFICADO</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setShowModal(false)}>
            
        <Text style={styles.textStyle}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
</Modal>
<Text style={styles.textoPrincipal}>Ingrese el numero</Text>

      <TextInput
        onChangeText={setTexto}
        value={texto}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.textoSecundario}>LLAMADAS TELEFONICAS:</Text>

      <TouchableOpacity
        onPress={() => llamarNumero({ texto })}
        style={styles.boton}
      >
        <Text style={styles.textoBoton}>Llamar</Text>
      </TouchableOpacity>
      
</View> 
    


  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      input: {
        backgroundColor: 'lightgray',
        borderRadius: 23,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginHorizontal: 55,
        borderWidth: 2,
        marginTop: 8,
        justifyContent: 'center',
        borderColor: '#00716F'
      },
      image: {
        width: '100%',
        height: '40%'
      },
      textoPrincipal: {
        fontSize: 20,
        alignSelf: 'center'
      },
      textoSecundario: {
        marginHorizontal: 50,
        textAlign: 'center',
        marginTop: 5,
      },
      boton: {
        marginHorizontal: 55,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00716F',
        paddingVertical: 8,
        borderRadius: 23
      },
      textoBoton: {
        color: 'white',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 300,
        height: 550,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});
