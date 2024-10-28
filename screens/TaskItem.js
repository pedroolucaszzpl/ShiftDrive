import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const TaskItem = ({ taskId, isSelected, isCompleted, onSelect, onLongPress }) => {
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.lineContainer}>
        <View style={styles.circle} />
        <View style={styles.verticalLine} />
      </View>
      <TouchableOpacity
        style={[
          styles.taskItem,
          isSelected ? styles.selectedTask : null,
          isCompleted ? styles.completedTask : null
        ]}
        onPress={onSelect}
        onLongPress={onLongPress}
      >
        <Text style={styles.taskTitle}>Task {taskId}</Text>
        <Text style={styles.taskTime}>12:00 PM</Text>
        <Text style={styles.taskDescription}>Task description for task {taskId}.</Text>
        <TouchableOpacity onPress={onLongPress}>
          <Icon 
            name={isCompleted ? 'check-circle' : 'circle'}
            type="font-awesome"
            color={isCompleted ? '#999' : '#FF6C00'}
            size={24}
            style={styles.checkIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  lineContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6C00',
    zIndex: 1,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#FF6C00',
    marginTop: -6,
  },
  taskItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    borderColor: '#FF6C00',
    borderWidth: 2,
  },
  selectedTask: {
    backgroundColor: '#FF6C00',
    borderColor: '#FF6C00',
  },
  completedTask: {
    backgroundColor: '#F0F0F0',
    borderColor: '#F0F0F0',
  },
  taskTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskTime: {
    color: '#000',
    fontSize: 16,
  },
  taskDescription: {
    color: '#000',
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default TaskItem;
