// --- src/screens/main/BookingForm.tsx ---


import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BookingForm = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Booking Form</Text>
            <Button title="Confirm Booking" onPress={() => navigation.navigate('BookingConfirmation')} />
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

export default BookingForm;
