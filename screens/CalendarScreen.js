import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import TaskItem from './TaskItem'; // Supondo que o componente de tarefa foi extraído para um arquivo separado

const CalendarScreen = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', ' Qui', 'Sex', 'Sab'];

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        const timerId = setInterval(updateClock, 1000);
        return () => clearInterval(timerId);
    }, []);

    const toggleTaskCompletion = (taskId) => {
        if (completedTasks.includes(taskId)) {
            setCompletedTasks(completedTasks.filter(id => id !== taskId));
        } else {
            setCompletedTasks([...completedTasks, taskId]);
        }
    };

    const getDateByDay = (dayIndex) => {
        const now = new Date();
        now.setDate(now.getDate() - now.getDay() + dayIndex + weekOffset * 7);
        return now.getDate();
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho com a data e o ícone */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.dateText}>2024, Agosto</Text>
                    <Text style={styles.timeText}>{currentTime}</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="notifications-outline" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={styles.notificationDot} />
                </View>
            </View>

            {/* Navegação entre semanas e dias */}
            <View style={styles.dayNavigationContainer}>
                <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
                    <Icon name="chevron-left" type="font-awesome" color="#FF6C00" size={24} />
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayContainer}>
                    {daysOfWeek.map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.day, selectedDay === index ? styles.selectedDay : null]}
                            onPress={() => setSelectedDay(index)}
                        >
                            <Text>{day}</Text>
                            <Text style={selectedDay === index ? styles.activeDay : null}>
                                {getDateByDay(index)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
                    <Icon name="chevron-right" type="font-awesome" color="#FF6C00" size={24} />
                </TouchableOpacity>
            </View>

            {/* Lista de tarefas do dia selecionado */}
            <ScrollView>
                {selectedDay !== null ? (
                    [1, 2, 3].map(taskId => (
                        <TaskItem
                            key={taskId}
                            taskId={taskId}
                            isSelected={selectedTask === taskId}
                            isCompleted={completedTasks.includes(taskId)}
                            onSelect={() => setSelectedTask(taskId)}
                            onLongPress={() => toggleTaskCompletion(taskId)}
                        />
                    ))
                ) : (
                    <Text>Selecione o dia em que você quer ver suas tarefas.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7F9',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 18,
        color: '#999',
        marginTop: 5,
    },
    notificationContainer: {
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    notificationDot: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff0072',
    },
    dayNavigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    day: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
    },
    selectedDay: {
        backgroundColor: '#FF6C00',
        borderRadius: 10,
    },
    activeDay: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default CalendarScreen;
