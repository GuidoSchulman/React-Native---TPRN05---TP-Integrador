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
    const onLoad=async()=>{ 
      await new Promise(resolve=>setTimeout(resolve,5000)); 
      navigation.navigate("ConfigAplicacion")
    }; 
    useEffect(()=> { 
        
        onLoad();

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
  
  });
  