// --- src/screens/main/BookingConfirmation.tsx ---
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BookingConfirmation = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Booking Confirmation</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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

export default BookingConfirmation;

