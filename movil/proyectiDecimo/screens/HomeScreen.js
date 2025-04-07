import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import ScreenComponent from 'components/ScreenComponent';
import SearchBar from 'components/SearchBar';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { radius, spacingX, spacingY } from 'config/spacing';
import ImageSlideShow from 'components/ImageSlideShow';
import CategoryItem from 'components/CategoryItem';
import ItemDetailsScreen from './ItemDetailsScreen';
import { products, categories } from 'utils/data';
import FilterModal from 'model/FilterModal';

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selected, setSelected] = useState('All');
  const [data, setData] = useState(products);
  const [key, setKey] = useState(0);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.188.86:8000/api/Imagen/');
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtrar productos para que solo queden productos con id_producto único
    const uniqueProductIds = new Set();
    const filteredProducts = products.filter(item => {
      if (!uniqueProductIds.has(item.detalle_id_producto.id_producto)) {
        uniqueProductIds.add(item.detalle_id_producto.id_producto);
        return true;
      }
      return false;
    });
    setUniqueProducts(filteredProducts);
  }, [products]);

  const handleFilter = (category) => {
    setSelected(category);
    setData([]);
    setTimeout(() => {
      if (category === 'All') {
        setData(products);
      } else {
        const filteredData = products.filter((item) => item.category === category);
        setData(filteredData);
      }
    }, 50);
  };

  const filterProducts = (text) => {
    setSearchText(text); // Actualiza el texto de búsqueda
    if (text === '') {
      setFilteredProducts(products); // Si no hay texto, mostramos todos los productos
    } else {
      // Filtra los productos por nombre de producto (case-insensitive)
      const filtered = products.filter((product) =>
        product.detalle_id_producto.nombre_producto.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered); // Actualiza los productos filtrados
    }
  };
  return (
    <ScreenComponent style={styles.container}>
      <View style={styles.header}>
        {/* <View style={styles.iconBg}>
          <Entypo name="grid" size={24} color="black" />
        </View> */}
        {/* <TouchableOpacity
          style={styles.iconBg}
          onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.container}>
        {/* Barra de búsqueda */}
        <SearchBar
          onChangeText={filterProducts}
          value={searchText}
          onPress={() => setFilterModalVisible(true)} // Aquí puedes manejar el modal si lo necesitas
        />

        {/* Mostrar los productos filtrados */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id_producto.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Typo size={16} style={styles.productName}>
                {item.detalle_id_producto.nombre_producto}
              </Typo>
              <Typo size={14} style={styles.productDescription}>
                {item.detalle_id_producto.descripcion_producto}
              </Typo>
              <Typo size={14} style={styles.productPrice}>
                ${item.detalle_id_producto.precio_producto}
              </Typo>
            </View>
          )}
        />
      </View>

      <ImageSlideShow />
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catContainer}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.headingContainer}>
              <Typo size={18} style={{ fontWeight: '600' }}>
              </Typo>
            </View>
          </>
        }
        renderItem={({ item, index }) => {
          const isSelected = selected === item.name;
          // return (
          //   <CategoryItem
          //     item={item}
          //     onPress={handleFilter}
          //     isSelected={isSelected}
          //     index={index}
          //     keyValue={key}
          //   />
          // );
        }}
      />

      <View style={styles.headingContainer}>
        <Typo size={18} style={{ fontWeight: '600' }}>
          Productos Disponibles
        </Typo>
      </View>
      <View style={{ }}>
        {/* Mostrar los productos con imagen, nombre y precio */}
        <FlatList
          data={uniqueProducts}
          keyExtractor={(item) => item.id_imagen.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ItemDetailsScreen', {
                  product: item,
                })
              }>
              {/* Mostrar solo la imagen */}
              <Image source={{ uri: item.nombre_imagen }} style={styles.productImage} />
              <Text style={styles.productName}>{item.detalle_id_producto.nombre_producto}</Text>
              <Text style={styles.productPrice}>${item.detalle_id_producto.precio_producto}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacingY._10,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: spacingX._20,
    padding: spacingY._5,
    justifyContent: 'space-between',
  },
  iconBg: {
    backgroundColor: colors.lighterGray,
    padding: spacingY._7,
    borderRadius: radius._20,
  },
  headingContainer: {
    marginHorizontal: spacingX._15,
  },
  productList: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,    
  },
  productCard: {
    backgroundColor: colors.lighterGray,
    borderRadius: radius._15,
    padding: spacingY._10,
    marginBottom: spacingY._15,
    alignItems: 'center',
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: radius._10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: spacingY._10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: spacingY._5,
  },
  catContainer: {
    paddingVertical: spacingY._15,
    marginBottom: spacingY._20,
  },
});

export default HomeScreen;
