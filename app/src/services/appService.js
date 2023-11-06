import AsyncStorage from "@react-native-async-storage/async-storage";
import Perfil from "../models/perfil";
const PERFIL_KEY = "PERFIL";
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
      returnValue = ((jsonValue != null) ? 
      JSON.parse(jsonValue) : defaultValue);
    } catch (e) {
      // error
    }
    return returnValue;
  };
  setPerfil = async (perfil) => {
    console.log(perfil);
    setObject(PERFIL_KEY, perfil);
  };
  getPerfil =  () => {
    let perfil = new Perfil();
    perfil= getObject(PERFIL_KEY);
  };
}
export default AppServices;
