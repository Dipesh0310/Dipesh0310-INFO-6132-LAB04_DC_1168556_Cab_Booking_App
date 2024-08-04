// MyCabScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from './firebase';
import { collection, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyCabScreen = () => {
  const [bookedCabs, setBookedCabs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'mybookedCabs'), where('userId', '==', 'currentUserId')); 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cabsData = [];
      snapshot.forEach((doc) => cabsData.push({ ...doc.data(), id: doc.id }));
      setBookedCabs(cabsData);
    });

    return unsubscribe;
  }, []);

  const cancelBooking = async (cabId) => {
    await deleteDoc(doc(db, 'mybookedCabs', cabId));
    Alert.alert('Success', 'Booking canceled successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Booked Cabs</Text>
      <FlatList
        data={bookedCabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon name="local-taxi" size={30} color="#333" />
              <View style={styles.textContainer}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.carModel}>{item.carModel}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => cancelBooking(item.id)}>
              <Text style={styles.buttonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No booked cabs found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carModel: {
    fontSize: 16,
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyCabScreen;
