import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Button,
    Alert,
    Image,
    ActivityIndicator,
    View
  } from "react-native";
  import React , {useEffect} from "react";

  
  const SplashScreen = ({ navigation }) => {

    useEffect(()=> { 
        const onLoad=async()=>{ 
          await new Promise(resolve=>setTimeout(resolve,5000)); 
        }; 
        onLoad();
        //Invoco el método asincrónico onLoad luego de definir su cuerpo. 
        return()=>{ 
          // 
        }; 
    },[]);
  
    
  
    return (
      <SafeAreaView>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="blue" />
        </View>
  
      </SafeAreaView>
    );
  };
  export default SplashScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
  
    input: { height: 40, borderrWidth: 2, padding: 1 },
  });
  