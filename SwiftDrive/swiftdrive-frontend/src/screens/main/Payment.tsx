// --- src/screens/main/Payment.tsx ---
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Payment = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment</Text>
            <Button title="View Payment Status" onPress={() => navigation.navigate('PaymentStatus')} />
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

export default Payment;

