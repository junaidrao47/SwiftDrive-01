// --- src/screens/main/Profile.tsx ---
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Profile</Text>
            <Button title="View Booking History" onPress={() => navigation.navigate('BookingHistory')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Profile;

