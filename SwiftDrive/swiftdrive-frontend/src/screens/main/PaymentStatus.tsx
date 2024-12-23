
// --- src/screens/main/PaymentStatus.tsx ---
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentStatus = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment Status</Text>
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

export default PaymentStatus;

