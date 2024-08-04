// CabDetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { db } from './firebase';
import { doc, onSnapshot, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CabDetailScreen = ({ route }) => {
  const { cabId } = route.params;
  const [cab, setCab] = useState(null);
  const [bookedCabs, setBookedCabs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'cabs', cabId), (doc) => {
      setCab(doc.data());
    });

    const fetchBookedCabs = async () => {
      const q = query(collection(db, 'mybookedCabs'), where('userId', '==', 'currentUserId')); // Replace 'currentUserId' with the actual user ID
      const querySnapshot = await getDocs(q);
      const cabsData = [];
      querySnapshot.forEach((doc) => cabsData.push(doc.data()));
      setBookedCabs(cabsData);
    };

    fetchBookedCabs();

    return () => {
      unsubscribe();
    };
  }, [cabId]);

  const bookCab = async () => {
    if (bookedCabs.length >= 2) {
      Alert.alert('Error', 'You cannot book more than 2 cabs at a time');
      return;
    }

    await addDoc(collection(db, 'mybookedCabs'), {
      ...cab,
      userId: 'currentUserId',
    });
    Alert.alert('Success', 'Cab booked successfully');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cab && (
        <>
          <View style={styles.headerContainer}>
            <Icon name="local-taxi" size={40} color="#333" style={styles.icon} />
            <Text style={styles.header}>{cab.companyName}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Car Model:</Text>
            <Text style={styles.value}>{cab.carModel}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Passengers Allowed:</Text>
            <Text style={styles.value}>{cab.passengerAllowed}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.value}>{cab.rating}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Cost per Hour:</Text>
            <Text style={styles.value}>${cab.costPerHour}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={bookCab}>
            <Text style={styles.buttonText}>Book Cab</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center align the icon and text horizontally
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10, // Add space between the icon and the text
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CabDetailScreen;
