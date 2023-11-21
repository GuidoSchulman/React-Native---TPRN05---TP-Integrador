import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ImageBackground, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Menu from '../components/Menu';
import { useNavigation } from '@react-navigation/native';

import AppServices from '../services/appService';

const appService = new AppServices();

export default function CambioImgFondo() {
  const [image, setImage] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await appService.setFondo(JSON.stringify(result.assets[0]));
      let backgroundImage = JSON.parse(await appService.getFondo());
      setImage(backgroundImage.uri);
    }
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    await appService.setFondo(JSON.stringify(photo));
    let backgroundImage = JSON.parse(await appService.getFondo());
    setImage(backgroundImage.uri);
    setStartCamera(false);
  };

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
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <Button onPress={pickImage} title='Elegi una imagen de tu galeria' style={styles.button} />
        {startCamera ? (
          <Camera
            style={{ flex: 1, width: '100%' }}
            ref={(r) => {
              camera = r;
            }}
          >
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 125,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                }}
              />
            </View>
          </Camera>
        ) : (
          <Button onPress={__startCamera} title='Sacar una foto' style={styles.button} />
        )}
      </ImageBackground>
      <View style={styles.menuContainer}>
        <Menu navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
