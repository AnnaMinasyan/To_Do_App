const BASE_URL='http://annaniks.com:5060/api/'
import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key:any,value:any) => {
    console.log("value",key, value);
    
	try {
	  await AsyncStorage.setItem(key,  JSON.stringify(value))
	} catch (e) {
	  // saving error
	}
  }
  export const getData = async (key:string) => {
	try {
	  const value = await AsyncStorage.getItem(key)
	  console.log("uuuuuuuuu",key,value);
	  
	  if(value !== null) {
		return JSON.parse(value)
	  }
	} catch(e) {
	  // error reading value
	  return null;
	}
	return null;
  }