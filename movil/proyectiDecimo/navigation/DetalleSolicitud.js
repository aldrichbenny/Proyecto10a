import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetalleSolicitud = () => {
  const [solicitud, setSolicitud] = useState(null);
  const [cliente, setCliente] = useState(null);
  const { params } = useRoute();
  const { solicitudId } = params;
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://172.18.2.162:8000/api/Solicitud/${solicitudId}`)
      .then(response => {
        setSolicitud(response.data);
        const clienteId = response.data.id_usuario;
        axios.get(`http://172.18.2.162:8000/api/Perfil/?id_usuario=${clienteId}`)
          .then(clienteResponse => {
            setCliente(clienteResponse.data[0]);
          })
          .catch(clienteError => {
            console.error('Error al obtener los detalles del cliente:', clienteError);
          });
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la solicitud:', error);
      });
  }, [solicitudId]);

  const aceptarSolicitud = () => {
    if (solicitud) {
      const solicitudActualizada = { 
        id_solicitud: solicitud.id_solicitud,
        fecha_registro: solicitud.fecha_registro,
        hora_registro: solicitud.hora_registro,
        fecha_entrega_estimada: solicitud.fecha_entrega_estimada,
        estado_solicitud: 'CUT-OFF-PENDING',
        id_usuario: solicitud.id_usuario,
      };

      axios.put(`http://172.18.2.162:8000/api/Solicitud/${solicitudId}/`, solicitudActualizada)
        .then(response => {
          setSolicitud(prevState => ({
            ...prevState,
            estado_solicitud: 'CUT-OFF-PENDING',
          }));
          alert('Solicitud aceptada y estado actualizado.');
        })
        .catch(error => {
          console.error('Error al actualizar el estado de la solicitud:', error);
        });
    }
  };

  if (!solicitud || !cliente) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.circleBackButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
      </View>

      {/* Request Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request Information</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="identifier" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>ID: {solicitud.id_solicitud}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="email" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>User: {solicitud.detalle_id_usuario.correo}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>Register Date: {solicitud.fecha_registro}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="progress-check" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={[styles.detailText, styles.statusText]}>
              Status: {solicitud.estado_solicitud}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="text-box" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>Description: {solicitud.descripcion}</Text>
          </View>
        </View>
      </View>

      {/* Client Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Information</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>
              Name: {cliente.nombre} {cliente.apellido_pat} {cliente.apellido_mat}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="email" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>Email: {cliente.detalle_id_usuario.correo}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="phone" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>Phone: {cliente.telefono}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="home" size={20} color="#A94442" style={styles.detailIcon} />
            <Text style={styles.detailText}>Address: {cliente.direccion}</Text>
          </View>
        </View>
      </View>

      {/* Accept Button */}
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={aceptarSolicitud}
      >
        <MaterialCommunityIcons name="check" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.acceptButtonText}>Accept Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    flex: 1,
  },
  circleBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  detailContainer: {
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    flex: 1,
    flexWrap: 'wrap',
  },
  statusText: {
    fontWeight: 'bold',
    color: '#A94442',
  },
  acceptButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    elevation: 2,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default DetalleSolicitud;