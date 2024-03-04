import type { NextApiHandler } from 'next';
import { User } from './IUser';


const apiUrl = `${process.env.apiUrl}/user`


export const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const url = `${apiUrl}`;
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) {
            const errorText = await response.text();
            const error = JSON.parse(errorText);
            throw new Error(error.message);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return []; 
    }
};

export const fetchUserById = async (id) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
    }
};


export const createUser = async (newUser) => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
    }
    return await response.json();
};

export const updateUser = async (id, updatedUser) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
    }
    return await response.json();
};

export const deleteUser = async (id) => {
    const url = `${apiUrl}/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
    }
};


