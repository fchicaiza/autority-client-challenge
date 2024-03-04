import React, { useState, useEffect } from 'react';
import {fetchAllTasks, createTask, updateTask, deleteTask} from '../api/Todo/Todo';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components'; // Assuming correct path
import { TodoComponent } from '../../components/TodoComponent';
import { Todo } from '../api/Todo/ITodo';
import { fetchAllUsers } from '../api/user';

export const TodoPage = () => {
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
  }, []);

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
      <TodoComponent 
      tasks={tasks}
      fetchAllTasks={fetchAllTasks}
      createTask={createTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
      users={users}

      /> 
    </div>
  );
};

export default TodoPage;
