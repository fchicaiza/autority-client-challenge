import React, { useState, useEffect } from 'react';
import { fetchAllTasks, createTask, updateTask, deleteTask } from '../api/Todo/Todo';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components'; // Assuming correct path
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

  useEffect(() => {
    fetchAllTasks()
      .then((tasks) => {
        setFetchedTasks(tasks);
        setTasks(tasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [tasks]);

  useEffect(() => {
    fetchAllUsers()
      .then((users) => {
        setFetchedUsers(users);
        setUsers(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <TodoComponent
        tasks={tasks}
        fetchAllTasks={fetchAllTasks}
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        users={users}
        fetchedTasks={fetchedTasks}
        setFetchedTasks={setFetchedTasks}

      />
    </div>
  );
};

export default TodoPage;
