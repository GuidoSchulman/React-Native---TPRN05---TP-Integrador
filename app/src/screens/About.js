import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, ActivityIndicator, Clipboard } from 'react-native';
import { Audio } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AppServices from '../services/appService';
import Menu from '../components/Menu';

const appService = new AppServices();

export default function About() {
    // State variables
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [fontLoaded, setFontLoaded] = useState(false); // State to track font loading

    useEffect(() => {
        // Load background image and user profile data on component mount
        loadBackground();
        loadFonts();
    }, []);

    // Load background image from AsyncStorage
    const loadBackground = async () => {
        try {
            const backgroundImage = JSON.parse(await appService.getFondo());
            setImage(backgroundImage.uri);
        } catch (error) {
            console.error('Error loading background image', error);
        }
    };

    // Load custom font
    const loadFonts = async () => {
        try {
            await Font.loadAsync({
                'font': require('../../assets/BarcodeFont.ttf'),
            });
            console.log('Font loaded successfully');
            setFontLoaded(true);
        } catch (error) {
            console.error('Error loading font', error);
        }
    };
    

    // Function to copy text to the clipboard
    const copyToClipboard = () => {
        Clipboard.setString('Text to be copied'); // Replace 'Text to be copied' with the actual text you want to copy
    };

    return (
        <View style={styles.container}>
            {fontLoaded ? ( // Render content only when the font is loaded
                <ImageBackground source={{ uri: image }} style={styles.image}>
                    <TouchableOpacity style={{ backgroundColor: 'white' }} onPress={copyToClipboard}>
                        <Text style={{ fontSize: 20 }}>APP GUIDO Y BAUTI</Text>
                        <Text style={{ fontFamily: 'font', fontSize: 60 }}>APP GUIDO Y BAUTI</Text>
                    </TouchableOpacity>
                </ImageBackground>
            ) : (
                <ActivityIndicator size="large" color="#000" />
            )}
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
