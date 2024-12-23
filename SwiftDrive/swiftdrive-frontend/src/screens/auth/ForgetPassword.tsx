
// --- src/screens/auth/ForgetPassword.tsx ---
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ForgetPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Forget Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Reset Password" onPress={() => navigation.navigate('ResetPassword')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
});

export default ForgetPassword;

