import React, { useState, useEffect } from 'react';
import {fetchAllTasks, createTask, updateTask, deleteTask} from '../api/Todo/Todo';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components'; // Assuming correct path
import { TodoComponent } from '../../components/TodoComponent';
import { Todo } from '../api/Todo/ITodo';

export const TodoPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [fetchedTasks, setFetchedTasks] = useState<Todo[]>([]);

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

  return (
    <div>
      <TodoComponent 
      tasks={tasks}
      fetchAllTasks={fetchAllTasks}
      createTask={createTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
      /> 
    </div>
  );
};

export default TodoPage;
