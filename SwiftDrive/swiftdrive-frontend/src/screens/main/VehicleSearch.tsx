import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const VehicleSearch = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for Vehicles</Text>
            <Button title="Vehicle Details" onPress={() => navigation.navigate('VehicleDetails')} />
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

export default VehicleSearch;

