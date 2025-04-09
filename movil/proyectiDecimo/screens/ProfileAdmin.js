import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from 'auth/useAuth';

const ProfileAdmin = () => {
  const [key, setKey] = useState(0);
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();
  const userId = user?.id_usuario;
  const navigation = useNavigation();

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://172.18.2.162:8000/api/Perfil/`);
        const userProfile = response.data.find(profile => profile.id_usuario === userId);
        setProfile(userProfile); 
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );

  const handlePress = () => {
    navigation.navigate('Signin');
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={28} color="white" style={styles.icon} />
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa87QyF6MvEgAXYVy894fUoVGRNMpVpr_NFQ&s',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {profile.nombre} {profile.apellido_pat} {profile.apellido_mat}
        </Text>
        <Text style={styles.profileRole}>
          {profile.detalle_id_usuario?.detalle_id_rol?.nombre_rol || 'Administrator'}
        </Text>
      </View>

      {/* Profile Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="email" size={20} color="#A94442" style={styles.detailIcon} />
          <Text style={styles.detailText}>Email: {profile.detalle_id_usuario?.correo || 'N/A'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="phone" size={20} color="#A94442" style={styles.detailIcon} />
          <Text style={styles.detailText}>Phone: {profile.telefono || 'N/A'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="home" size={20} color="#A94442" style={styles.detailIcon} />
          <Text style={styles.detailText}>Address: {profile.direccion || 'N/A'}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handlePress}
      >
        <MaterialCommunityIcons name="logout" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
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
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#A94442',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    flexWrap: 'wrap',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A94442',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    elevation: 2,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default ProfileAdmin;