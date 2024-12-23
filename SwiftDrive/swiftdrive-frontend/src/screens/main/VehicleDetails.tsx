// --- src/screens/main/VehicleDetails.tsx ---
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const VehicleDetails = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Vehicle Details</Text>
            <Button title="Book Now" onPress={() => navigation.navigate('BookingForm')} />
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

export default VehicleDetails;
