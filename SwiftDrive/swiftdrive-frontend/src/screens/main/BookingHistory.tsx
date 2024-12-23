
// --- src/screens/main/BookingHistory.tsx ---
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingHistory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Booking History</Text>
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
    },
});

export default BookingHistory;
