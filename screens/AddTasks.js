import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

export default function AddTasks() {  // Renomeado de HomeScreen para AddTasks
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setTime(selectedDate);
    hideDatePicker();
  };

  const addTask = () => {
    const newTask = {
      id: Math.random().toString(),
      title,
      client,
      description,
      time: time.toISOString(),
    };

    // Passar a nova tarefa para a tela de lista de tarefas
    navigation.navigate('Alerta', { newTask });

    clearInputs();
  };

  const clearInputs = () => {
    setTitle('');
    setClient('');
    setDescription('');
    setTime(new Date());
  };

  return (
    <View style={styles.container}>
      

      <Text>Nova tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Criar nova tarefa"
        value={title}
        onChangeText={setTitle}
      />
      <Text>Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Texto"
        value={client}
        onChangeText={setClient}
      />
      <Text>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Texto"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.timeContainer}>
        <View style={styles.iconWrapper}>
          <Icon name="calendar-outline" size={24} color="#fff" />
        </View>
        <Pressable style={styles.timeDisplay} onPress={showDatePicker}>
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text style={styles.dateText}>
            {time.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
          </Text>
        </Pressable>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
      />

      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Criar Tarefa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 25,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  timeContainer: {
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 350,
    height: 120,
  },
  iconWrapper: {
    backgroundColor: '#FF6C00',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  timeDisplay: {
    flex: 1,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#ff6f00',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
