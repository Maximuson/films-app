import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStoreService = () => {

    const setData = async (item, key) => {
        const jsonItem = JSON.stringify(item)
        await AsyncStorage.setItem(key, jsonItem)
    }

    const getData = async (key) => {
        const item = await AsyncStorage.getItem(key)
        return item != null ? JSON.parse(item) : null
    }

    return {setData, getData}
}

export default AsyncStoreService