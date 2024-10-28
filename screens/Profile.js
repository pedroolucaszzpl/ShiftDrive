import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa os ícones
import { auth } from '../firebaseConfig'; // Configuração do Firebase
import { signOut } from 'firebase/auth'; // Função de logout
import { db } from '../firebaseConfig'; // Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore para obter/atualizar dados
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // Importa a biblioteca de seleção de imagem

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Estado para armazenar a imagem do perfil
  const navigation = useNavigation();

  useEffect(() => {
    // Pegar informações do usuário logado
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
          setProfileImage(userData.profileImage || null); // Atualiza o estado da imagem
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logout', 'Você foi desconectado com sucesso');
      navigation.navigate('Authentic'); // Navega de volta para a tela de autenticação
    } catch (error) {
      console.error('Erro ao sair:', error);
      Alert.alert('Erro', 'Falha ao sair da conta.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          username: username,
          phone: phone,
          profileImage: profileImage, // Salva a imagem do perfil no Firestore
        });
        Alert.alert('Sucesso', 'Informações atualizadas com sucesso.');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      Alert.alert('Erro', 'Falha ao atualizar informações.');
    }
  };

  const handleBackPress = () => {
    navigation.goBack(); // Navega de volta para a tela anterior
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.error) {
        console.log('Erro ao selecionar imagem: ', response.error);
      } else {
        setProfileImage(response.assets[0].uri); // Armazena a URI da imagem selecionada
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Botão para voltar */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Perfil</Text>

      {/* Se a imagem de perfil existir, exibi-la */}
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}

      {/* Botão para selecionar imagem */}
      <TouchableOpacity onPress={handleSelectImage} style={styles.selectImageButton}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {/* Exibir ou editar nome de usuário */}
      <Text style={styles.label}>Nome de Usuário</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      ) : (
        <Text style={styles.info}>{username}</Text>
      )}

      {/* Exibir email (não editável) */}
      <Text style={styles.label}>Email</Text>
      <Text style={styles.info}>{email}</Text>

      {/* Exibir ou editar telefone */}
      <Text style={styles.label}>Telefone</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.info}>{phone || 'Nenhum telefone cadastrado'}</Text>
      )}

      {/* Botões para editar ou salvar alterações */}
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Editar Informações</Text>
        </TouchableOpacity>
      )}

      {/* Botão de logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7700',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  selectImageButton: {
    backgroundColor: '#FF7700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  editButton: {
    backgroundColor: '#FF7700',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
