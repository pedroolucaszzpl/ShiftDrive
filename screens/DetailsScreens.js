import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import { useNavigation } from '@react-navigation/native'; // Importação do hook de navegação

const Home = () => {
  const navigation = useNavigation(); // Hook de navegação

  const handleProfileRedirect = () => {
    navigation.navigate('Profile'); // Redireciona para a página de perfil
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.addButtonContainer}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileRedirect}> {/* Redireciona ao clicar */}
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png' }} // Substitua pela URL da sua imagem
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.welcomeText}>Olá, Cris seja bem-vindo (a)!</Text>

      <View style={styles.sessionButtons}>
        <TouchableOpacity style={styles.sessionButton}>
          <Text style={styles.sessionText}>Todas (12)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sessionButton}>
          <Text style={styles.sessionText}>Hoje (5)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sessionButton}>
          <Text style={styles.sessionText}>Esta Semana (7)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.time}>04:00PM</Text>
        <Text style={styles.taskTitle}>Fazer uma corrida</Text>
        <View style={styles.swipeContainer}>
          <Text style={styles.swipeText}>Arraste para marcar como concluído</Text>
          <Ionicons name="add-circle" size={24} color="black" style={styles.swipeIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonContainer: {
    borderWidth: 2,
    borderColor: '#FF6F00',
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 49,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sessionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sessionButton: {
    backgroundColor: '#fffafa',
    padding: 10,
    borderRadius: 20,
  },
  sessionText: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    backgroundColor: '#FF6F00',
    borderRadius: 35,
    padding: 100,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
    marginVertical: '10%',
    position: 'relative',
  },
  time: {
    fontSize: 18,
    color: '#FFF',
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#f9bb78',
    padding: 10,
    borderRadius: 40,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
    textAlign: 'center',
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: 'space-between',
  },
  swipeText: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#f9bb78',
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    flex: 1,
  },
  swipeIcon: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 3,
    marginLeft: 10,
  },
});

export default Home;
