import React, { useState, useEffect } from 'react';
import { fetchAllTasks, createTask, updateTask, deleteTask } from '../api/Todo/Todo';
import { User } from '../api/User/IUser';
import { TodoComponent } from '../../components/TodoComponent';
import { Todo } from '../api/Todo/ITodo';
import { fetchAllUsers } from '../api/user';

import { useRouter } from 'next/router';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const TodoPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [fetchedTasks, setFetchedTasks] = useState<Todo[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);



  
  // Función para cargar tareas inicialmente
  const loadTasks = async () => {
    try {
      const tasks = await fetchAllTasks();
      setFetchedTasks(tasks);
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Función para cargar usuarios inicialmente
  const loadUsers = async () => {
    try {
      const users = await fetchAllUsers();
      setFetchedUsers(users);
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Efecto que se ejecuta solo una vez al montar el componente
  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <TodoComponent
        tasks={tasks}
        fetchAllTasks={loadTasks} // Pasa la función de carga como prop
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        users={users}
        fetchedTasks={fetchedTasks}
        setFetchedTasks={setFetchedTasks}
        setTasks={setTasks}
      />
    </div>
  );
};

export default TodoPage;
