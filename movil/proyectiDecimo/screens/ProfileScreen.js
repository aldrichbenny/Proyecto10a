import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import useAuth from 'auth/useAuth';
import ScreenComponent from 'components/ScreenComponent';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { radius, spacingX, spacingY } from 'config/spacing';
import { BlurView } from 'expo-blur';
import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Importa axios
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { normalizeY } from 'utils/normalize';

function ProfileScreen(props) {
  const [key, setKey] = useState(0);
  const [profile, setProfile] = useState(null); 
  const { user, logout } = useAuth()
  const userId = user?.id_usuario; 

  console.log('User:', userId);
  useEffect(() => {
    if (!userId) return; 

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://172.18.3.176:8000/api/Perfil/`);
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

  const Row = ({ icon, title, iconColor, index, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={styles.row}
          entering={FadeInDown.delay(index * 80)
            .duration(800)
            .damping(12)
            .springify()}
          key={`${key}-${index}`}>
          <View
            style={{ backgroundColor: iconColor, padding: spacingY._10, borderRadius: radius._12 }}>
            {icon}
          </View>
          <Typo size={16} style={{ fontWeight: '500', flex: 1 }}>
            {title}
          </Typo>
          <Octicons name="chevron-right" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  console.log('Profile:', profile);
  if (!profile) {
    return <View><Typo size={18}>Loading...</Typo></View>; // Mostrar un mensaje mientras cargan los datos
  }

  return (
    <ScreenComponent style={styles.container}>
      <BlurView intensity={100} tint="extraLight" style={styles.blurContainer} />
      <View style={styles.topRow}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa87QyF6MvEgAXYVy894fUoVGRNMpVpr_NFQ&s',
          }}
          style={styles.img}
        />
        <View style={{ gap: spacingY._7, marginTop: spacingY._5, alignItems: 'center' }}>
          <Typo size={22} style={styles.name}>
            {profile.nombre} {profile.apellido_pat} {profile.apellido_mat} {/* Mostrar nombre completo */}
          </Typo>
          <Typo size={16} style={{ color: colors.gray, fontWeight: '500' }}>
            {profile.detalle_id_usuario.detalle_id_rol.nombre_rol} {/* Mostrar el rol del usuario */}
          </Typo>
        </View>
      </View>
      <View style={{ flex: 1, gap: 15 }}>
        <View style={styles.bottomContainer}>
          <View style={styles.fieldContainer}>
            <Typo size={18} style={styles.text}>
              Correo: {profile.detalle_id_usuario.correo} 
            </Typo>
          </View>          
        </View>


        <View style={styles.bottomContainer}>
          <View style={styles.fieldContainer}>
            <Typo size={18} style={styles.text}>
            Telefono:{profile.telefono}
            </Typo>
          </View>
        </View>


        <View style={styles.bottomContainer}>
          <View style={styles.fieldContainer}>
            <Typo size={18} style={styles.text}>
              Direccion: {profile.direccion}
            </Typo>
          </View>
        </View>


        <View style={[styles.bottomContainer, { marginBottom: '30%' }]}>
          <Row
            title={'Log out'}
            iconColor={'#d1d1d1'}
            icon={<MaterialCommunityIcons name="logout" size={24} color={colors.black} />}
            index={5}
           onPress={logout} 
          />
        </View>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacingX._20,
    // backgroundColor: colors.lightPrimary,
  },
    fieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.text,
    fontWeight: '500',           
    textAlign: 'center',          
    fontSize: 18,                 
  },

  blurContainer: {
    ...StyleSheet.absoluteFill,
    paddingTop: 0,
    padding: spacingY._20,
    paddingBottom: '10%',
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: radius._20,
  },
  topRow: {
    marginBottom: normalizeY(25),
    alignItems: 'center',
    gap: spacingX._10,
    marginTop: '2%',
  },
  img: {
    height: normalizeY(110),
    width: normalizeY(110),
    borderRadius: normalizeY(60),
    borderWidth: normalizeY(3),
    borderColor: colors.primary,
  },
  name: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
    paddingVertical: spacingY._10,
    paddingRight: spacingX._5,
  },
  line: {
    height: 0.8,
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
    // marginVertical: spacingY._10,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    borderRadius: spacingY._20,
    shadowColor: colors.black,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    padding: spacingY._15,
  },
});

export default ProfileScreen;
