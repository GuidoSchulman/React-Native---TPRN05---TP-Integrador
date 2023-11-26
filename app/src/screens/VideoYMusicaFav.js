import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import AppServices from '../services/appService';
import Menu from '../components/Menu';

const appService = new AppServices();

export default function VideoYMusicaFav() {
    const [sound, setSound] = useState();
    const [isReproducing, setIsReproducing] = useState(false);
    const [status, setStatus] = useState({});
    const [uriVideo, setUriVideo] = useState('');
    const [uriAudio, setUriAudio] = useState('');
    const navigation = useNavigation();
    const video = useRef(null);

    useEffect(() => {
        loadPerfil();
    }, []);

    const loadPerfil = async () => {
        const perfil = await appService.getPerfil();
        setUriVideo(perfil.urlVid);
        setUriAudio(perfil.urlAu);
    };

    const selectSound = async () => {
        console.log('Selecting Sound');
        if (isReproducing && sound !== undefined) {
            setIsReproducing(false);
            console.log('Unloading Sound');
            await sound.pauseAsync();
            await sound.unloadAsync();
            console.log('Sound Unloaded');
        } else {
            console.log('Loading Sound');
            console.log(uriAudio);
            if (uriAudio) {
                const { sound } = await Audio.Sound.createAsync({ uri: uriAudio }, { volume: 0.8 });
                setSound(sound);
                console.log('Sound Loaded');
            }
        }
    };

    const playSound = async () => {
        console.log('Playing Sound');
        setIsReproducing(true);
        await sound.playAsync();
        console.log('Sound Played');
    };

    useEffect(() => {
        if (sound !== undefined) {
            playSound();
        }
    }, [sound]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.audioContainer} onPress={selectSound}>
                <Text style={{ color: 'black' }}>Play/Pause</Text>
            </TouchableOpacity>

            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: uriVideo,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />

            <View style={styles.menuContainer}>
                <Menu navigation={navigation} />
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioContainer: {
        width: '50%',
        height: 300,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: isReproducing ? 'green' : 'white',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    menuContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 'auto',
    },
    // Define other styles as needed
};
