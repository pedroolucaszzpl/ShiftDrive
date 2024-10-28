import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: pressed ? '#ff5722' : '#ff6f00' } // Muda a cor ao pressionar
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButton;