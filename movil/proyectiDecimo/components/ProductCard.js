import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from 'config/colors';
import { spacingX, spacingY, radius } from 'config/spacing';
import { normalizeX, normalizeY } from '../utils/normalize';
import Typo from './Typo';


function ProductCard() {
  const route = useRoute();
  const { product } = route.params;

  // Variable para manejar la sección activa (Description, Specifications, Reviews)
  const [activeSection, setActiveSection] = useState('Description'); // Inicia con 'Description' como la sección activa

  // Función para cambiar la sección activa
  const handleSelect = (section) => {
    setActiveSection(section); // Actualiza la sección activa
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.nombre_imagen }} style={styles.productImage} />
      <Text style={styles.productName}>{product.detalle_id_producto.nombre_producto}</Text>
      <Text style={styles.productPrice}>${product.detalle_id_producto.precio_producto}</Text>

      {/* Opciones para cambiar entre Descripción, Especificaciones y Reseñas */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'Description' && styles.activeTab]}
          onPress={() => handleSelect('Description')}
        >
          <Typo size={14} style={[styles.tabText, activeSection === 'Description' && styles.activeTabText]}>
            Description
          </Typo>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'Specifications' && styles.activeTab]}
          onPress={() => handleSelect('Specifications')}
        >
          <Typo size={14} style={[styles.tabText, activeSection === 'Specifications' && styles.activeTabText]}>
            Specifications
          </Typo>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'Reviews' && styles.activeTab]}
          onPress={() => handleSelect('Reviews')}
        >
          <Typo size={14} style={[styles.tabText, activeSection === 'Reviews' && styles.activeTabText]}>
            Reviews
          </Typo>
        </TouchableOpacity>
      </View>

      {/* Mostrar contenido según la sección seleccionada */}
      {activeSection === 'Description' && (
        <View style={styles.contentContainer}>
          <Text style={styles.productDescription}>{product.detalle_id_producto.descripcion_producto}</Text>
        </View>
      )}

      {activeSection === 'Specifications' && (
        <View style={styles.contentContainer}>
          <Text style={styles.productDescription}>{product.detalle_id_producto.especificaciones_producto}</Text>
        </View>
      )}

      {activeSection === 'Reviews' && (
        <View style={styles.contentContainer}>
          <Text style={styles.productDescription}>{product.detalle_id_producto.reseñas_producto}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacingY._20,
    backgroundColor: colors.white,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: radius._15,
    resizeMode: 'cover',
    marginBottom: spacingY._20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacingY._10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacingY._10,
  },
  productDescription: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: spacingY._10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: spacingY._20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginEnd: spacingX._10,
    borderRadius: radius._20,
    backgroundColor: colors.lightGray,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.black,
  },
  activeTabText: {
    color: colors.white,
  },
  contentContainer: {
    paddingTop: spacingY._10,
  },
});

export default ProductCard;
