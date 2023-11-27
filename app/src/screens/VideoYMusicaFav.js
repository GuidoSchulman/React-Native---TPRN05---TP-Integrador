import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import AppServices from '../services/appService';
import Menu from '../components/Menu';

const appService = new AppServices();

export default function VideoYMusicaFav() {
    // State variables
    const [sound, setSound] = useState();
    const [isReproducing, setIsReproducing] = useState(false);
    const [status, setStatus] = useState({});
    const [uriVideo, setUriVideo] = useState('');
    const [uriAudio, setUriAudio] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true); // New state to track image loading
    const navigation = useNavigation();
    const video = useRef(null);

    useEffect(() => {
        // Load background image and user profile data on component mount
        loadBackground();
        loadPerfil();
    }, []);

    // Load background image from AsyncStorage
    const loadBackground = async () => {
        try {
            const backgroundImage = JSON.parse(await appService.getFondo());
            setImage(backgroundImage.uri);
        } catch (error) {
            console.error('Error loading background image', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    // Load user profile data from AsyncStorage
    const loadPerfil = async () => {
        const perfil = await appService.getPerfil();
        setUriVideo(perfil.urlVid);
        setUriAudio(perfil.urlAu);
    };

    // Function to handle sound selection (play/pause)
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

    // Function to play the loaded sound
    const playSound = async () => {
        console.log('Playing Sound');
        setIsReproducing(true);
        await sound.playAsync();
        console.log('Sound Played');
    };

    // Play the sound when the sound state changes
    useEffect(() => {
        if (sound !== undefined) {
            playSound();
        }
    }, [sound]);

    // Render the component
    return (
        <View style={styles.container}>
           
           <ImageBackground source={{ uri: image }} style={styles.image}>
                    {/* Your existing UI components */}
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
 </ImageBackground>
                    <View style={styles.menuContainer}>
                        <Menu navigation={navigation} />
                    </View>
                
                   
        </View>
       
    );
}

// Styles
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',

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
        backgroundColor: 'white',
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    // Define other styles as needed
};
