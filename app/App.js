import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from "./src/screens/SplashScreen"
import ConfigAplicacion from './src/screens/ConfigAplicacion';
import LlamadoEmergencia from './src/screens/LlamadoEmergencia';
import CambioImgFondo from './src/screens/CambioImgFondo';
import VideoYMusicaFav from './src/screens/VideoYMusicaFav';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="VideoYMusicaFav">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: "Welcome" }}
        />
         <Stack.Screen
          name="ConfigAplicacion"
          component={ConfigAplicacion}
          options={{ title: "Welcome" }}
        />
         <Stack.Screen
          name="LlamadoEmergencia"
          component={LlamadoEmergencia}
          options={{ title: "Seccion emergencia" }}
        />
         <Stack.Screen
          name="CambioImgFondo"
          component={CambioImgFondo}
          options={{ title: "Cambiar Fondo" }}
        />
         <Stack.Screen
          name="VideoYMusicaFav"
          component={VideoYMusicaFav}
          options={{ title: "Video y Musica" }}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
