import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import useAuth from 'auth/useAuth';
import ScreenComponent from 'components/ScreenComponent';
import Typo from 'components/Typo';
import Header from 'components/Header';
import { spacingX, spacingY, radius } from 'config/spacing';
import { normalizeY } from 'utils/normalize';
import colors from 'config/colors';
import { MaterialIcons } from '@expo/vector-icons'; 


const FavouritesScreen = ({ navigation }) => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Obtener datos del usuario autenticado
  const id_usuario = user?.id_usuario;
  const scrollY = useRef(new Animated.Value(0)).current;
  const SPACING = spacingY._20;
  const CARD_HEIGHT = normalizeY(55);
  const ITEM_SIZE = CARD_HEIGHT + SPACING * 3;

  useEffect(() => {
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado. Por favor, inicia sesión.');
      return;
    }

    if (id_usuario) {
      fetchWishlistProducts(id_usuario);
    }
  }, [user]);

  const fetchWishlistProducts = async (id_usuario) => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.188.86:8000/api/Wishlist_producto/');

      // Filtrar productos que pertenecen al usuario autenticado
      const userWishlist = response.data.filter(
        (wishlistProduct) => wishlistProduct.detalle_id_wishlist.id_usuario === id_usuario
      );

      setWishlistProducts(userWishlist); // Actualizar los productos de la Wishlist
    } catch (error) {
      console.error('Error al obtener productos del Wishlist:', error);
      Alert.alert('Error', 'No se pudo obtener los productos del Wishlist');
    } finally {
      setLoading(false);
    }
  };

  const renderWishlistItem = ({ item, index }) => {
    const productName = item?.detalle_id_talla?.detalle_id_producto?.nombre_producto || 'Producto no disponible';
    const productDescription = item?.detalle_id_talla?.detalle_id_producto?.descripcion_producto || 'Descripción no disponible';
    const productPrice = item?.detalle_id_talla?.detalle_id_producto?.precio_producto || 'Precio no disponible';
    const productSize = item?.detalle_id_talla?.nombre_talla || 'Talla no disponible';

    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.itemView,
          {
            marginBottom: SPACING,
            padding: SPACING,
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <View style={{ height: CARD_HEIGHT }} />
        <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: -spacingY._10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacingX._10 }}>
          <MaterialIcons name="star" size={normalizeY(20)} color={colors.blue} />
            <View style={[styles.dot]} />
            <Typo size={15} style={{ fontWeight: '600' }}>
              {productName}
            </Typo>
          </View>
          <Typo numberOfLines={2} style={{ color: colors.gray }}>
            {productDescription}
          </Typo>
          <Typo style={{ color: colors.gray, fontWeight: 'bold' }}>
            Precio: ${productPrice}
          </Typo>
          <Typo style={{ color: colors.gray, fontWeight: '500' }}>
            Talla: {productSize}
          </Typo>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <ScreenComponent>
        <ActivityIndicator size="large" color="#0000ff" />
      </ScreenComponent>
    );
  }

  return (
    <ScreenComponent style={styles.container}>
      <Header label={'Favoritos'} />
      {wishlistProducts.length === 0 ? (
        <Typo>No tienes productos en tu wishlist.</Typo>
      ) : (
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          showsVerticalScrollIndicator={false}
          data={wishlistProducts}
          contentContainerStyle={{
            padding: SPACING,
          }}
          keyExtractor={(item) => item.id_wishlist_producto.toString()} // Usar `id_wishlist_producto` como key
          renderItem={renderWishlistItem}
        />
      )}
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  itemView: {
    flexDirection: 'row',
    borderRadius: radius._15,
    borderColor: colors.lightGray,
    borderWidth: 0.5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  dot: {
    height: normalizeY(10),
    width: normalizeY(10),
    borderRadius: radius._10,
  },
});

export default FavouritesScreen;
