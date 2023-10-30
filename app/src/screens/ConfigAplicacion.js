import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppServices from '../appService'; // Asegúrate de que la ruta del archivo sea correcta

const appService = new AppServices(); // Crea una instancia de AppServices

export default function ConfigAplicacion() {
  const [numero, setNumero] = useState('');
  const [url, setUrl] = useState('');
  const GuardarNumero = async (numero) => {
    await appService.guardarNumero(numero); // Usa el método de la instancia de AppServices
  };
  const GuardarUrl = async (url) => {
    await appService.guardarUrl(url); // Usa el método de la instancia de AppServices
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Ingrese el numero</Text>
      <TextInput
        onChangeText={setNumero}
        value={numero}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => GuardarNumero(numero)} style={styles.boton}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>

      <Text style={styles.textoPrincipal}>Ingrese el url</Text>
      <TextInput
        onChangeText={setUrl}
        value={url}
        style={styles.input}
      
      />
      <TouchableOpacity onPress={() => GuardarUrl(url)} style={styles.boton}>
        <Text style={styles.textoBoton}>Guardar</Text>
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
    borderColor: '#00716F',
  },
  textoPrincipal: {
    fontSize: 20,
    alignSelf: 'center',
  },
  boton: {
    backgroundColor: '#00716F',
    borderRadius: 23,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});
