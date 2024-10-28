import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddTaskScreen() {
  return (
    <View style={styles.container}>
      <Text>Adicionar Nova Tarefa</Text>
      {/* Aqui você pode criar um formulário ou outro componente para adicionar tarefas */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
