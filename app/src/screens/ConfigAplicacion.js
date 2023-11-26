import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppServices from '../services/appService'; 

const appService = new AppServices();

export default function ConfigAplicacion({navigation}) {
  const [numero, setNumero] = useState('');
  const [urlVid, setUrlVid] = useState('');
  const [urlAu, setUrlAu] = useState('');
  const [image, setImage] = useState(null);
  const GuardarPerfil=async()=>{
    let perfil= await appService.getPerfil()
    console.log(perfil);
    perfil.numero = numero
    perfil.urlVid= urlVid
    perfil.urlAu=urlAu
    console.log(perfil);
    await appService.setPerfil(perfil)
    navigation.navigate("LlamadoEmergencia")
  }
  let loadBackground = async () => {
    if (JSON.parse(await appService.getFondo())) {
      let backgroundImage = JSON.parse(await appService.getFondo());
      setImage(backgroundImage.uri);
    }
  };

  useEffect(() => {
    loadBackground();
  }, []);


  return (
    <ImageBackground source={{ uri: image }} style={styles.image}>
    <View style={styles.container}>
      
      <Text style={styles.textoPrincipal}>Ingrese el numero de mergencia</Text>
      <TextInput
        onChangeText={setNumero}
        value={numero}
        style={styles.input}
        keyboardType="numeric"
      />

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
    </ImageBackground>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
