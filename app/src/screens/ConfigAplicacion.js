import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppServices from '../services/appService'; 

const appService = new AppServices();

export default function ConfigAplicacion() {
  const [numero, setNumero] = useState('');
  const [urlVid, setUrlVid] = useState('');
  const [urlAu, setUrlAu] = useState('');

  const GuardarPerfil=async()=>{
    let perfil= await appService.getPerfil()
    console.log(perfil);
    perfil.numero = numero
    perfil.urlVid= urlVid
    perfil.urlAu=urlAu
    console.log(perfil);
    await appService.setPerfil(perfil)

  }



  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Ingrese el numero</Text>
      <TextInput
        onChangeText={setNumero}
        value={numero}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>{numero}</Text>
      <Text style={styles.textoPrincipal}>Ingrese el url del video</Text>
      <TextInput
        onChangeText={setUrlVid}
        value={urlVid}
        style={styles.input}
      
      />
      <Text style={styles.textoPrincipal}>Ingrese el url de la cancion</Text>
      <TextInput
        onChangeText={setUrlAu}
        value={urlAu}
        style={styles.input}
      
      />
      <TouchableOpacity onPress={() => GuardarPerfil()} style={styles.boton}>
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
