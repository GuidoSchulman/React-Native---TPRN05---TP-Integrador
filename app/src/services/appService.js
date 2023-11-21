import AsyncStorage from "@react-native-async-storage/async-storage";
import Perfil from "../models/perfil";
const PERFIL_KEY = "PERFIL";
const FONDO_KEY="FONDO"
class AppServices {
  setObject = async (key, object) => {
    try {
      const jsonValue = JSON.stringify(object);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // error
    }
  };
  getObject = async (key) => {
    let returnValue = null;
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      returnValue = jsonValue != null ? JSON.parse(jsonValue) : defaultValue; // Provide a default value here
    } catch (e) {
      // handle error
    }
    return returnValue;
  };
  setPerfil = async (perfil) => {
    console.log(perfil);
    await this.setObject(PERFIL_KEY, perfil);
  };
  
  getPerfil = async () => {
    try {
      let perfil = await this.getObject(PERFIL_KEY);
      console.log(perfil);
      return perfil != null ? perfil : new Perfil();
    } catch (error) {
      console.error("Error getting perfil:", error);
      return new Perfil();
    }
  };
  getFondo=async()=>{
    let fondo = await AsyncStorage.getItem(FONDO_KEY);
    const returnValue = fondo; 
    return returnValue; 
  }
  setFondo=async(fondo)=>{
      
      await AsyncStorage.setItem(FONDO_KEY, fondo); 

  }
}
export default AppServices;
