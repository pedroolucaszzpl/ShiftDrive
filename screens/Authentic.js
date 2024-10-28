import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import logo from '../img/logo.png';

const Authentic = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Login bem-sucedido');
        navigation.navigate('Main');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          username: username,
          phone: phone || null,
        });

        Alert.alert('Cadastro bem-sucedido');
        navigation.navigate('Authentic', { refresh: Date.now() });
      }
    } catch (error) {
      console.error("Erro ao cadastrar ou fazer login:", error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
        <Image source={logo} style={styles.logo} />

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone (opcional)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              maxLength={15}
            />
          </>
        )}

        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'Ainda não possui uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  logo: {
    width: 190,
    height: 120,
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF7700',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF7700',
    paddingVertical: 8,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#FF7700',
    textAlign: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginTop: 10,
    color: '#FF7700',
    textAlign: 'center',
  },
});

export default Authentic;
