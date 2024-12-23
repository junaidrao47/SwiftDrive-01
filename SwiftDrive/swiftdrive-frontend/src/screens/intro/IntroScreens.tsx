import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const IntroScreens = ({ navigation }: any) => {
    const [currentScreen, setCurrentScreen] = useState(0);

    const screens = [
        {
            icon: 'car-sports',
            title: 'Premium Cars',
            description: 'Choose from our wide selection of luxury and comfort vehicles. From sports cars to SUVs, we have the perfect ride for every occasion.',
        },
        {
            icon: 'car-key',
            title: 'Easy Booking',
            description: 'Book your dream car in minutes with our simple and secure booking process. No hidden fees, transparent pricing guaranteed.',
        },
        {
            icon: 'map-marker-radius',
            title: 'Flexible Pickup',
            description: 'Pick up your car from convenient locations across the city. 24/7 support and roadside assistance for worry-free travels.',
        },
    ];

    const goToNextScreen = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <MaterialCommunityIcons
                    name={screens[currentScreen].icon as any}
                    size={120}
                    color="#007AFF"
                />
                <Text style={styles.title}>{screens[currentScreen].title}</Text>
                <Text style={styles.description}>
                    {screens[currentScreen].description}
                </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {screens.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                currentScreen === index && styles.paginationDotActive,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={goToNextScreen}
                >
                    <Text style={styles.buttonText}>
                        {currentScreen === screens.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center',
        color: '#1a1a1a',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666666',
        lineHeight: 24,
    },
    footer: {
        padding: 40,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cccccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: '#007AFF',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default IntroScreens;