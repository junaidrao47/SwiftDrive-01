import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('jwt', token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('jwt');
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('jwt');
    } catch (error) {
        console.error('Error removing token:', error);
    }
};
