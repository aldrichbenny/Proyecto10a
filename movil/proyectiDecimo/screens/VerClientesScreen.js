import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VerClientesScreen = () => {
  const [clientes, setClientes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://172.18.2.162:8000/api/Usuario/');
        const data = response.data.filter(user => user.id_rol === 1);
        setClientes(data);
      } catch (error) {
        console.error('Error al obtener los clientes', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-group" size={28} color="white" style={styles.icon} />
        <Text style={styles.title}>Clients</Text>
      </View>

      {/* Clients Table */}
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>ID</Text>
            <Text style={styles.cellHeader}>Email</Text>
            <Text style={styles.cellHeader}>Category</Text>
          </View>

          {clientes.map((cliente, index) => (
            <View 
              key={cliente.id_usuario} 
              style={[
                styles.row, 
                index % 2 === 0 ? styles.rowEven : styles.rowOdd
              ]}
            >
              <Text style={styles.cell}>{cliente.id_usuario}</Text>
              <Text style={[styles.cell, styles.emailCell]}>{cliente.correo}</Text>
              <Text style={styles.cell}>
                {cliente.detalle_id_rol?.nombre_rol || 'Client'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Clients: <Text style={styles.summaryNumber}>{clientes.length}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#A94442',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: 'white',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  cell: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  emailCell: {
    fontSize: 13, // Slightly smaller for long emails
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
  },
  summaryNumber: {
    fontWeight: 'bold',
    color: '#A94442',
    fontSize: 18,
  },
});

export default VerClientesScreen;