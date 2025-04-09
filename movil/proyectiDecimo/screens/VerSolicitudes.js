import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VerSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const solicitudesPerPage = 6;
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    axios.get('http://172.18.2.162:8000/api/Solicitud/')
      .then(response => {
        setSolicitudes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes:', error);
      });
  }, []);

  const indexOfLastSolicitud = currentPage * solicitudesPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPerPage;
  const currentSolicitudes = solicitudes.slice(indexOfFirstSolicitud, indexOfLastSolicitud);

  const goToNextPage = () => {
    if (currentPage * solicitudesPerPage < solicitudes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pendiente':
        return styles.statusPending;
      case 'Aceptada':
        return styles.statusAccepted;
      case 'Terminada':
        return styles.statusFinished;
      case 'Rechazada':
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };

  const handleRowPress = (solicitudId) => {
    navigation.navigate('DetalleSolicitud', { 
      solicitudId: solicitudId 
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="clipboard-list" size={28} color="white" style={styles.icon} />
        <Text style={styles.title}>Requests</Text>
      </View>

      {/* Requests Table */}
      <View style={styles.section}>
        {/* Horizontal Scroll for Wide Table */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View style={[styles.table, { width: screenWidth > 600 ? screenWidth * 0.9 : 700 }]}>
            <View style={styles.rowHeader}>
              <Text style={[styles.cellHeader, { width: 50 }]}>ID</Text>
              <Text style={[styles.cellHeader, { width: 180 }]}>User</Text>
              <Text style={[styles.cellHeader, { width: 120 }]}>Register Date</Text>
              <Text style={[styles.cellHeader, { width: 160 }]}>Status</Text>
              <Text style={[styles.cellHeader, { width: 160 }]}>Actions</Text>
            </View>

            {currentSolicitudes.map((solicitud, index) => (
              <TouchableOpacity
                key={solicitud.id_solicitud}
                onPress={() => handleRowPress(solicitud.id_solicitud)}
                style={[
                  styles.row, 
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd
                ]}
              >
                <Text style={[styles.cell, { width: 50 }]}>{solicitud.id_solicitud}</Text>
                <Text style={[styles.cell, { width: 180 }]} numberOfLines={1} ellipsizeMode="tail">
                  {solicitud.detalle_id_usuario?.correo || 'N/A'}
                </Text>
                <Text style={[styles.cell, { width: 120 }]}>
                  {new Date(solicitud.fecha_registro).toLocaleDateString()}
                </Text>
                <View style={[styles.cell, { width: 160 }]}>
                  <Text style={[styles.statusBadge, getStatusStyle(solicitud.estado_solicitud)]}>
                    {solicitud.estado_solicitud}
                  </Text>
                </View>
                <View style={[styles.cell, { width: 160 }]}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleRowPress(solicitud.id_solicitud)}
                  >
                    <MaterialCommunityIcons name="eye" size={18} color="white" />
                    <Text style={styles.viewText}> View</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
            style={[
              styles.paginationButton, 
              currentPage === 1 && styles.disabledButton
            ]}
          >
            <MaterialCommunityIcons name="chevron-left" size={20} color="white" />
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          
          <Text style={styles.pageNumber}>
            Page {currentPage} of {Math.ceil(solicitudes.length / solicitudesPerPage)}
          </Text>
          
          <TouchableOpacity
            onPress={goToNextPage}
            disabled={(currentPage * solicitudesPerPage) >= solicitudes.length}
            style={[
              styles.paginationButton, 
              (currentPage * solicitudesPerPage) >= solicitudes.length && styles.disabledButton
            ]}
          >
            <Text style={styles.paginationText}>Next</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
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
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
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
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: 'white',
  },
  cellHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 5,
  },
  cell: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusPending: {
    backgroundColor: '#FFA726', // Orange
  },
  statusAccepted: {
    backgroundColor: '#42A5F5', // Blue
  },
  statusFinished: {
    backgroundColor: '#66BB6A', // Green
  },
  statusRejected: {
    backgroundColor: '#EF5350', // Red
  },
  statusDefault: {
    backgroundColor: '#9E9E9E', // Gray
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A94442',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  paginationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 5,
  },
  pageNumber: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
});

export default VerSolicitudes;