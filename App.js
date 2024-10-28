// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements'; // Para os ícones
import Authentic from './screens/Authentic'; // Ajuste o caminho conforme necessário
import DetailsScreen from './screens/DetailsScreens'; // Ajuste o caminho
import Profile from './screens/Profile'; // Ajuste o caminho
import CalendarScreen from './screens/CalendarScreen'; // Ajuste o caminho
import HomeScreen from './screens/HomeScreen'; // Ajuste o caminho
import AddTasks from './screens/AddTasks'; // Ajuste o caminho

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Configuração do Tab Navigator (para navegação em abas)
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Calendar':
            iconName = 'calendar';
            break;
          default:
            iconName = 'home';
            break;
        }

        return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
      },
      tabBarActiveTintColor: '#FF6C00',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Calendar" component={CalendarScreen} />
  </Tab.Navigator>
);

// Configuração do Stack Navigator (para telas fora das abas)
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentic">
        {/* Tela de Autenticação */}
        <Stack.Screen 
          name="Authentic" 
          component={Authentic} 
          options={{ headerShown: false }} // Remove o header
        />
        
        {/* Principal - Navegação por Abas */}
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        
        {/* Outras telas no Stack */}
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ headerShown: false }} // Remove o header
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerShown: false }} // Remove o header
        />
        <Stack.Screen 
          name="AddTasks" 
          component={AddTasks} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
