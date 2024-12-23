
import { View, Text } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import api from '../../services/api';

// type Vehicle = {
//   _id: string;
//   model: string;
//   make: string;
//   year: number;
//   color: string;
//   pricePerDay: number;
//   rating: number;
//   imageUrl: string;
//   status: string;
// };

// const Home = () => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       const response = await api.get('/vehicles');
//       setVehicles(response.data);
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const RatingStars = ({ rating }: { rating: number }) => {
//     return (
//       <View style={styles.ratingContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Ionicons
//             key={star}
//             name={star <= rating ? 'star' : 'star-outline'}
//             size={16}
//             color="#FFD700"
//           />
//         ))}
//       </View>
//     );
//   };

//   const renderVehicleCard = ({ item }: { item: Vehicle }) => (
//     <TouchableOpacity style={styles.card}>
//       <Image
//         source={{ uri: item.imageUrl }}
//         style={styles.image}
//         defaultSource={require('../assets/car-placeholder.png')}
//       />
//       <View style={styles.cardContent}>
//         <Text style={styles.title}>{`${item.make} ${item.model}`}</Text>
//         <Text style={styles.year}>{item.year}</Text>
//         <RatingStars rating={item.rating} />
//         <View style={styles.footer}>
//           <Text style={styles.price}>${item.pricePerDay}/day</Text>
//           <View style={[
//             styles.statusBadge,
//             { backgroundColor: item.status === 'available' ? '#4CAF50' : '#FFA000' }
//           ]}>
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2c3e50" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Available Vehicles</Text>
//       <FlatList
//         data={vehicles}
//         renderItem={renderVehicleCard}
//         keyExtractor={(item) => item._id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 16,
//   },
//   list: {
//     padding: 8,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   cardContent: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   year: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 16,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Home;