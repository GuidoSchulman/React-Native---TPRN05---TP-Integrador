import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text
} from "react-native";
import React from "react";


const BotonReutilizable = ({ onPress, style, texto }) => {
  const CalcularHora = () => {
    let hora = new Date();
    console.log(hora);
  };

  return (
    <TouchableOpacity onPress={() => { CalcularHora(); onPress(); }} 
      style={[styles.buttonContainer, style]}
    >
      <Text style={styles.buttonText}>{texto}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});


export default BotonReutilizable;
