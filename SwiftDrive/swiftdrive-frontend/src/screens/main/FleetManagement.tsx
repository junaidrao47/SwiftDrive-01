import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FleetManagement = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fleet Management</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default FleetManagement;