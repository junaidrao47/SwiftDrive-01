// --- src/screens/main/Tracking.tsx ---
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tracking = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Vehicle Tracking</Text>
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

export default Tracking;

