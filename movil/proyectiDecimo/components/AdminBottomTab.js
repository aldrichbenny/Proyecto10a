import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { normalizeX, normalizeY } from '../utils/normalize';
import colors from 'config/colors';
import { spacingY } from 'config/spacing';

const { width } = Dimensions.get('screen');

const AdminBottomTab = ({ state, navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const [endRange, setEndRange] = useState(0);
  const [startRange, setStartRange] = useState(0);
  const animatedValue = new Animated.Value(0);

  const tabs = [
    { name: 'Dashboard', iconSet: Ionicons, iconName: 'speedometer' },
    { name: 'Clients', iconSet: FontAwesome5, iconName: 'user-friends' },
    { name: 'Orders', iconSet: MaterialIcons, iconName: 'assignment' },
    { name: 'Requests', iconSet: Ionicons, iconName: 'document-text-outline' },
    { name: 'Products', iconSet: Entypo, iconName: 'shop' },
  ];

  const handleSelect = (routeName) => {
    const index = state.routes.findIndex((r) => r.name === routeName);
    const range = width * 0.22 * index;

    setStartRange(endRange);
    setEndRange(range);
    setSelected(routeName);

    navigation.navigate(routeName);
  };

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 6,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startRange, endRange],
  });

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.animatedContainer}>
        <Animated.View
          style={[
            styles.animationBar,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
      {tabs.map((tab, index) => {
        const routeName = state.routes[index].name;
        const isFocused = selected === routeName;
        const Icon = tab.iconSet;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabContent}
            onPress={() => handleSelect(routeName)}>
            <Icon
              name={tab.iconName}
              size={24}
              color={isFocused ? colors.primary : colors.black}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AdminBottomTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    height: 75,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'space-evenly',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
    paddingBottom: spacingY._15
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeY(35),
    paddingHorizontal: normalizeX(8),
  },
  animatedContainer: {
    position: 'absolute',
    bottom: normalizeY(20),
    right: 0,
    left: 0,
    marginHorizontal: '13%'
  },
  animationBar: {
    backgroundColor: colors.primary,
    width: normalizeX(6),
    height: normalizeY(6),
    borderRadius: normalizeY(8),
  },
});