import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>{price}</Text>
  </View>
);

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://64b1f684062767bc4826b711.mockapi.io/menuItems');//api
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong while fetching the menu items');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const renderItem = ({ item, index }) => (
    <>
      {index === 0 && (
        <Text style={menuStyles.sectionHeaderText}>Appetizers</Text>
      )}
      <Item name={item.name} price={item.price} />
      {index === 5 && (
        <Text style={menuStyles.sectionHeaderText}>Main Dishes</Text>
      )}
      {index === 10 && (
        <Text style={menuStyles.sectionHeaderText}>Sides</Text>
      )}
      {index === 16 && (
        <Text style={menuStyles.sectionHeaderText}>Desserts</Text>
      )}
    </>
  );

  if (loading) {
    return (
      <View style={[menuStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F4CE14" />
      </View>
    );
  }

  return (
    <View style={menuStyles.container}>
      <Text style={menuStyles.header}>Little Lemon</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Text style={menuStyles.footer}>All rights reserved by Little Lemon, 2022</Text>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background color
  },
  header: {
    backgroundColor: '#FFA500', // Orange background color
    color: '#000', // Black text color
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#F4CE14',
    fontSize: 20,
  },
  sectionHeaderText: {
    color: '#F4CE14',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#00ffff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  footer: {
    backgroundColor: '#FFA500', // Orange background color
    color: '#000', // Black text color
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default MenuItems;
