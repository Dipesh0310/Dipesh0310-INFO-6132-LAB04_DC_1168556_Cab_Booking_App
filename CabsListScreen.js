import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CabsListScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cabs'), (snapshot) => {
      const cabsData = [];
      snapshot.forEach((doc) => cabsData.push({ ...doc.data(), id: doc.id }));
      setCabs(cabsData);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Cabs</Text>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}
          >
            <View style={styles.iconContainer}>
              <Icon name="local-taxi" size={30} color="#333" />
              <View style={styles.textContainer}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.carModel}>{item.carModel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15, 
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carModel: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default CabsListScreen;
