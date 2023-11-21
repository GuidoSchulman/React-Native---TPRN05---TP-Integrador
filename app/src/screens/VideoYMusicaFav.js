import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';
import React, { useState, useEffect } from 'react';

import AppServices from '../services/appService';
import Menu from '../components/Menu';
const appService = new AppServices();

export default function VideoYMusicaFav() {
    const [sound, setSound] = useState();
    const [isReproducing, setIsReproducing] = useState(false);
    const [status, setStatus] = useState({});
    const [uriVideo, setUriVideo] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const perfil = appService.getPerfil();
        const uriSound = perfil.urlAud;
        setUriVideo(perfil.urlVid);
    }, []);

    let selectSound = async () => {
        if (isReproducing && sound != undefined) {
            setIsReproducing(false);
            console.log('Unloading Sound');
            await sound.pauseAsync();
            sound.unloadAsync();
        } else {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync({ uri: uriSound }, { volume: 0.8 });
            setSound(sound);
        }
    };

    let playSound = async () => {
        setIsReproducing(true);
        console.log('Playing Sound');
        await sound.playAsync();
    };

    useEffect(() => {
        if (sound != undefined) {
            playSound();
        }
    }, [sound]);

    let audioContainer = {
        width: '50%',
        height: 300,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: isReproducing ? 'green' : 'white',
    };

    return (
        <>
            <TouchableOpacity style={audioContainer} onPress={() => selectSound()}>
                <Text style={{ color: 'black' }}>Play/Pause</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <Video
                    style={styles.video}
                    source={{
                        uri: uriVideo,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
            </View>

            <View style={styles.menuContainer}>
        <Menu navigation={navigation} />
      </View>
 
       
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    audioContainer: {
    },
    image: {
        objectFit: "contain",
        width: "100%",
        height: "100%",
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
      },
      menuContainer: {
        justifyContent: "flex-end",
        paddingBottom: "auto", // Add some padding to control spacing from the bottom
      },
    // Define other styles as needed
});
