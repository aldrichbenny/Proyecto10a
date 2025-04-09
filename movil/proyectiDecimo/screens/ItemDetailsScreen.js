import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AppButton from 'components/AppButton';
import ItemImageSlider from 'components/ItemImageSlider';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { radius, spacingX, spacingY } from 'config/spacing';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { normalizeX, normalizeY } from 'utils/normalize';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import useAuth from 'auth/useAuth';
import { backgroundColor } from '@shopify/restyle';

const { height } = Dimensions.get('screen');

function ItemDetailsScreen({ navigation }) {
  const route = useRoute();
  const { product } = route.params;
  const { id_producto, detalle_id_producto } = product;
  const iconSize = 18;
  const [selectedColor, setSelectedColor] = useState(colors.dot1);
  const [activeSection, setActiveSection] = useState('Description');
  const [images, setImages] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const { user } = useAuth();
  const id_usuario = user?.id_usuario;
  const [loading, setLoading] = useState(true);
  const [nombreTalla, setNombreTalla] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [priceInUSD, setPriceInUSD] = useState(null);
  const [tallas, setTallas] = useState([]); // Estado para almacenar las tallas
  const [selectedTalla, setSelectedTalla] = useState(null); // Estado para la talla seleccionada

  if (!id_usuario) {
    Alert.alert('Error', 'Usuario no autenticado. Por favor, inicia sesión.');
    return null;
  }

  const handleSelect = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if (!product || !product.detalle_id_producto) return;
  }, [product]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://172.18.2.162:8000/api/Imagen/');
        const productImages = response.data.filter(item => item.id_producto === id_producto);
        setImages(productImages);
      } catch (error) {
      }
    };

    fetchImages();
  }, [id_producto]);

  useEffect(() => {
    const fetchTallaData = async () => {
      try {
        const response = await axios.get('http://172.18.2.162:8000/api/Talla/');
        const talla = response.data[0];
        setNombreTalla(talla.nombre_talla);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTallaData();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=82a8f04928ba40d299041d2fe753baa1'
        );
        const rate = parseFloat(response.data.rates.MXN); // Obtener el tipo de cambio MXN a USD
        setExchangeRate(rate);

        const priceInUSD = (detalle_id_producto.precio_producto / rate).toFixed(2);
        setPriceInUSD(priceInUSD);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener el tipo de cambio.');
      }
    };

    fetchExchangeRate();
  }, [detalle_id_producto.precio_producto]);

  useEffect(() => {
    const fetchTallaData = async () => {
      try {
        const response = await axios.get('http://172.18.2.162:8000/api/Talla/');
        const productTallas = response.data.filter((talla) => talla.id_producto === id_producto); // Filtrar por id_producto
        setTallas(productTallas);

        if (productTallas.length > 0) {
          setSelectedTalla(productTallas[0].id_talla); // Seleccionar la primera talla por defecto
        }
      } catch (error) {
        console.error('Error al obtener las tallas:', error);
      }
    };

    fetchTallaData();
  }, [id_producto]);

  const fetchColors = async () => {
    try {
      const response = await axios.get('http://172.18.2.162:8000/api/Colores/');
      setColorsList(response.data);
    } catch (error) {
    }
  };
  const addToWishlist = useCallback(async () => {
    if (!id_usuario) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      setLoading(true);

      // Crear o verificar la Wishlist del usuario
      const wishlistResponse = await axios.post('http://172.18.2.162:8000/api/Wishlist/', {
        id_usuario: id_usuario,
      });

      if (wishlistResponse.status === 201) {
        const id_wishlist = wishlistResponse.data.id_wishlist;

        // Agregar el producto a la Wishlist_producto
        const wishlistProductResponse = await axios.post('http://172.18.2.162:8000/api/Wishlist_producto/', {
          id_wishlist: id_wishlist,
          id_producto: id_producto,
          id_talla: 1, // Cambia esto según la talla seleccionada
          cantidad: 1, // Cantidad predeterminada
        });

        if (wishlistProductResponse.status === 201) {
          Alert.alert('Éxito', 'Producto agregado a la Wishlist');
          navigation.navigate('FavouritesScreen'); // Redirigir a la pantalla de favoritos
        }
        console.log('Producto agregado a la Wishlist:', wishlistProductResponse.data);
      }
    } catch (error) {
      console.error('Error al agregar a la Wishlist:', error);
      Alert.alert('Error', 'No se pudo agregar el producto a la Wishlist');
    } finally {
      setLoading(false);
    }
  }, [id_usuario, id_producto, navigation]);

  const handleSolicitar = async () => {
    if (!id_usuario) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }
  
    if (!selectedTalla) {
      Alert.alert('Error', 'Por favor, selecciona una talla.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Crear la solicitud en la API `Solicitud`
      const solicitudResponse = await axios.post('http://172.18.2.162:8000/api/Solicitud/', {
        id_usuario: id_usuario,
        estado_solicitud: 'IN REVIEW', // Estado inicial de la solicitud
      });
  
      if (solicitudResponse.status === 201) {
        const id_solicitud = solicitudResponse.data.id_solicitud;
  
        // Crear el registro en la API `Solicitud_producto`
        const solicitudProductoResponse = await axios.post('http://172.18.2.162:8000/api/Solicitud_producto/', {
          id_solicitud: id_solicitud,
          id_talla: selectedTalla, // Talla seleccionada
          cantidad_total: 1, // Cantidad predeterminada
        });
  
        if (solicitudProductoResponse.status === 201) {
          Alert.alert('Éxito', 'Solicitud registrada correctamente');
          navigation.navigate('Cart'); // Redirigir a la pantalla de pedidos
        }
      }
    } catch (error) {
      console.error('Error al registrar la solicitud:', error);
      Alert.alert('Error', 'No se pudo registrar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  fetchColors();

  return (
    <View style={styles.container}>
      <ItemImageSlider images={images} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBg} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={iconSize} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        {/* <View style={styles.iconBg}>
          <AntDesign name="sharealt" size={iconSize} color="black" />
        </View> */}
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.iconBg} onPress={addToWishlist}>
          <AntDesign name="hearto" size={iconSize} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '30%' }}>
          <Typo size={24} style={{ fontWeight: '600' }}>
            {product.detalle_id_producto.nombre_producto}
          </Typo>
          <Typo size={20} style={{ fontWeight: '400' }}>
            ${product.detalle_id_producto.precio_producto} MXN
          </Typo>
          {priceInUSD && (
            <Typo size={20} style={{ fontWeight: '400' }}>
              Precio en USD: ${priceInUSD}
            </Typo>
          )}
          <Typo size={18} style={styles.colorTxt}>
            Color
          </Typo>
          <View style={styles.colorsContainer}>
            {colorsList.map((color) => (
              <TouchableOpacity
                key={color.id_color}
                style={[styles.colorOption, selectedColor === color.id_color && styles.selectedColor]}
                onPress={() => setSelectedColor(color.id_color)}
              >
                <View style={[styles.colorCircle, { backgroundColor: color.nombre_color.toLowerCase() }]} />
              </TouchableOpacity>
            ))}
          </View>
          {/* Pestañas para Description, Specifications, Reviews */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'Description' && styles.activeTab]}
              onPress={() => handleSelect('Description')}
            >
              <Typo size={14} style={[styles.tabText, activeSection === 'Description' && styles.activeTabText]}>
                Descripción
              </Typo>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'Talla' && styles.activeTab]}
              onPress={() => handleSelect('Talla')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeSection === 'Reviews' && styles.activeTab]}
              onPress={() => handleSelect('Reviews')}
            >
              <Typo size={14} style={[styles.tabText, activeSection === 'Reviews' && styles.activeTabText]}>
                Talla
              </Typo>
            </TouchableOpacity>
          </View>

          {/* Mostrar contenido según la sección seleccionada */}
          {activeSection === 'Description' && (
            <Typo style={{ color: colors.gray }}>
              {product.detalle_id_producto.descripcion_producto}
            </Typo>
          )}

          {activeSection === 'Talla' && (
            <Typo style={{ color: colors.gray }}>
              {/* Información sobre especificaciones */}
              
            </Typo>
          )}

          {activeSection === 'Reviews' && (
            <Typo style={{ color: colors.gray }}>
              {/* Información sobre reseñas */}
              <View style={styles.tallasList}>
              {tallas.map((talla) => (
                <TouchableOpacity
                  key={talla.id_talla}
                  style={[
                    styles.tallaOption,
                    selectedTalla === talla.id_talla && styles.selectedTalla,
                  ]}
                  onPress={() => setSelectedTalla(talla.id_talla)}
                >
                  <Typo style={styles.tallaText}>{talla.nombre_talla}</Typo>
                </TouchableOpacity>
              ))}
            </View>
            </Typo>
          )}
          {/* <View style={styles.tallasContainer}>
            <Typo size={18} style={styles.colorTxt}>
              Tallas disponibles:
            </Typo>
            <View style={styles.tallasList}>
              {tallas.map((talla) => (
                <TouchableOpacity
                  key={talla.id_talla}
                  style={[
                    styles.tallaOption,
                    selectedTalla === talla.id_talla && styles.selectedTalla,
                  ]}
                  onPress={() => setSelectedTalla(talla.id_talla)}
                >
                  <Typo style={styles.tallaText}>{talla.nombre_talla}</Typo>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}
        </ScrollView>

        {/* Botón de "Add to Cart" */}
         <View style={styles.buttonContainer}>
          {/* <View style={styles.countView}>
            <Typo size={20} style={styles.count}>
              -
            </Typo>
            <Typo size={20} style={styles.count}>
              15
            </Typo>
            <Typo size={20} style={styles.count}>
              +
            </Typo>""
          </View> */}
          <AppButton
            style={{ marginTop: 5 , backgroundColor: colors.blue}}
            onPress={handleSolicitar}
            label={'Solicitar'}
          />
        </View> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  colorTxt: {
    fontWeight: '600',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2
  },
  colorOption: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircle: {
    width: normalizeX(40), // Ajusta el tamaño del círculo
    height: normalizeX(40), // Ajusta el tamaño del círculo
    borderRadius: 20, // Hace que sea un círculo perfecto
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: colors.black,
    borderRadius: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: spacingX._20,
    gap: spacingX._10,
  },
  iconBg: {
    backgroundColor: colors.white,
    padding: spacingY._10,
    borderRadius: radius._20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -spacingY._20,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
    padding: spacingY._15,
    paddingBottom: 0,
  },
  price: {
    fontWeight: '600',
    marginTop: spacingY._5,
  },
  seller: {
    fontWeight: '600',
    textAlign: 'right',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: spacingY._20,
  },
  tab: {
    flex: 1,
    paddingVertical: spacingY._10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.primary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacingY._5,
    right: 20,
    justifyContent: 'space-between',
    borderRadius: normalizeY(20)

  },
  countView: {
    width: '30%',
    borderWidth: 1,
    borderColor: colors.white,
    flexDirection: 'row',
    height: normalizeY(50),
    borderRadius: radius._20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginStart: spacingX._15,
  },
  count: {
    color: colors.white,
    fontWeight: '600',
  },
  tallasList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacingX._30,
    alignItems: 'center',
  },
  tallaOption: {
    borderWidth: 1,
    borderRadius: radius._20,
    width: normalizeX(40), // Ajusta el tamaño del círculo
    height: normalizeX(40), // Ajusta el tamaño del círculo
    borderRadius: 20, // Hace que sea un círculo perfecto
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTalla: {
    borderColor: colors.primary,
  },
  tallaText: {
    fontWeight: '600',
  },
});

export default ItemDetailsScreen;
