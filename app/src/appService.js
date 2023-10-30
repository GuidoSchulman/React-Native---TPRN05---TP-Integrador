import AsyncStorage from "@react-native-async-storage/async-storage";
const PHONENUMBER_KEY = "PHONE_NUMBER";
const VIDEOURL_KEY = "VIDEO_URL";
class AppServices{
    guardarNumero = async(numero)=>{
            console.log("Numero de telefono: ", numero);
            await AsyncStorage.setItem(PHONENUMBER_KEY, numero); 
    };
    guardarUrl = async(url)=>{
        console.log("url: ", url);
        await AsyncStorage.setItem(VIDEOURL_KEY, url); 
};

}
export default AppServices;