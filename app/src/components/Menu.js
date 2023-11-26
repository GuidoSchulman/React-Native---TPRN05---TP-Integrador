import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import BotonReutilizable from "../components/BotonReutilizable";

const Menu = ({navigation}) => {
  const navigateBlue = () => navigation.navigate("LlamadoEmergencia");
  const navigateGreen = () => navigation.navigate("CambioImgFondo");
  const navigateRed = () => navigation.navigate("VideoYMusicaFav");
  const navigateVioleta = () => navigation.navigate("About");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <BotonReutilizable style={[styles.button, styles.azul]} onPress={navigateBlue}texto="LlamadoEmergencia">
        </BotonReutilizable>
        <BotonReutilizable style={[styles.button, styles.verde]} onPress={navigateGreen}texto="CambioImgFondo">
         
        </BotonReutilizable>
        <BotonReutilizable style={[styles.button, styles.rojo]} onPress={navigateRed}texto="VideoYMusicaFav">

        </BotonReutilizable>
        <BotonReutilizable style={[styles.button, styles.violeta]} onPress={navigateVioleta}texto="About">

        </BotonReutilizable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  menu: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flex: 0.1,

  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 4,
  },
  textButton: {
    color: "white",
    fontSize: 18, 
    fontWeight: "bold",
  },
  azul: {
    backgroundColor: "blue",
  },
  verde: {
    backgroundColor: "green",
  },
  rojo: {
    backgroundColor: "red",
  },
  violeta: {
    backgroundColor: "purple",
  },
});

export default Menu;