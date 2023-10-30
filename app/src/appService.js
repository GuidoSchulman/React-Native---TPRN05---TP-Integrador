import AsyncStorage from "@react-native-async-storage/async-storage";
const PHONENUMBER_KEY = "PHONE_NUMBER";
const VIDEOURL_KEY = "VIDEO_URL";
const AUURL_KEY = "AU_URL";
class AppServices{
    guardarNumero = async(numero)=>{
            console.log("Numero de telefono: ", numero);
            await AsyncStorage.setItem(PHONENUMBER_KEY, numero); 
    };
    guardarUrlVid = async(urlVid)=>{
        console.log("url: ", urlVid);
        await AsyncStorage.setItem(VIDEOURL_KEY, urlVid); 
}; 
guardarUrlAu = async(urlAu)=>{
    console.log("url: ", urlAu);
    await AsyncStorage.setItem(AUURL_KEY, urlAu); 
};

}
export default AppServices;