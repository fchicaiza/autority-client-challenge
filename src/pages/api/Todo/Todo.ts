import type { NextApiHandler } from 'next';
import { Todo } from './ITodo';


const apiUrl = `${process.env.apiUrl}/task`

export const fetchAllTasks = async (): Promise<Todo[]> => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            const error = JSON.parse(errorText);
            throw new Error(error.message);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return []; 
    }
};

export const fetchTaskById = async (id) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Error while trying get a task: ${response.statusText}`);
    }
};


export const createTask = async (newTask) => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });
    if (!response.ok) {
        throw new Error(`Error creating a new task: ${response.statusText}`);
    }
    return await response.json();
};

export const updateTask = async (id, updatedTask) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
        throw new Error(`Error updating a task: ${response.statusText}`);
    }
    return await response.json();
};

export const deleteTask = async (id) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`Error deleting a task : ${response.statusText}`);
    }
};


