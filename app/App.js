import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from "./src/screens/SplashScreen"
import ConfigAplicacion from './src/screens/ConfigAplicacion';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="ConfigAplicacion">
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
