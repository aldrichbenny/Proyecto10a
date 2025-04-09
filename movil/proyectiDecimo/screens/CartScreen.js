import AppButton from 'components/AppButton';
import CartCard from 'components/CartCard';
import Header from 'components/Header';
import ScreenComponent from 'components/ScreenComponent';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { height, radius, spacingX, spacingY } from 'config/spacing';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { products } from 'utils/data';
import { normalizeX, normalizeY } from 'utils/normalize';
import axios from 'axios';
import useAuth from 'auth/useAuth';
import { MaterialIcons } from '@expo/vector-icons';

function CartScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const { user } = useAuth();
  const id_usuario = user?.id_usuario;
  const [imagenes, setImagenes] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const pedidosRes = await axios.get('http://172.18.2.162:8000/api/Solicitud_producto/');
        const imagenesRes = await axios.get('http://172.18.2.162:8000/api/Imagen/');
  
        const userPedidos = pedidosRes.data.filter(
          (pedido) => pedido.detalle_id_solicitud.id_usuario === id_usuario
        );
  
        setPedidos(userPedidos);
        setImagenes(imagenesRes.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos.');
      }
    };
  
    if (id_usuario) {
      fetchData();
    }
  }, [id_usuario]);
  

  const renderPedidoItem = ({ item }) => {
    const producto = item?.detalle_id_talla?.detalle_id_producto;
    const productId = producto?.id_producto;
  
    const productImageObj = imagenes.find(img => img.id_producto === productId);
    const productImage = productImageObj?.nombre_imagen || null;
  
    const productName = producto?.nombre_producto || 'Producto no disponible';
    const productCategory = producto?.detalle_id_categoria?.nombre_categoria || 'Categoría no disponible';
    const productPrice = producto?.precio_producto || 'Precio no disponible';
  
    const imgSize = normalizeY(80);
  
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.imgContainer}>
          {productImage ? (
            <Image
              source={{ uri: productImage }}
              resizeMode="contain"
              style={{ width: imgSize, height: imgSize }}
            />
          ) : (
            <Typo style={styles.noImageText}>Sin imagen</Typo>
          )}
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={styles.row}>
            <Typo size={17} style={{ fontWeight: 'bold' }}>
              {productName}
            </Typo>
            <MaterialIcons name="delete-outline" size={normalizeY(24)} color={colors.primary} />
          </View>
          <Typo style={styles.catText}>{productCategory}</Typo>
          <Typo style={{ fontWeight: 'bold' }}>Precio: ${productPrice}</Typo>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <ScreenComponent>
      <Header label={'Mis pedidos'} />
      {pedidos.length === 0 ? (
        <Text>No tienes pedidos registrados.</Text>
      ) : (
        <FlatList
          data={pedidos}
          renderItem={renderPedidoItem}
          keyExtractor={(item) => item.id_solicitud_producto.toString()} // Usar `id_solicitud_producto` como key
        />
      )}
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: normalizeY(15),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: normalizeY(15),
    borderRadius: normalizeY(12),
    gap: normalizeX(10),
  },
  imgContainer: {
    padding: spacingY._10,
    backgroundColor: colors.lighterGray,
    borderRadius: normalizeY(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catText: {
    color: colors.lightGray,
    fontWeight: 'bold',
    marginBottom: normalizeY(3),
  },
  noImageText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
});

export default CartScreen;
