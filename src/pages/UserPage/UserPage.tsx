import React, { useState, useEffect } from 'react';
import {
  fetchAllUsers,
  createUser,
  deleteUser,
  fetchUserById,
} from '../api/User/User';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components'; // Assuming correct path

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

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
      <UserComponent users={users} /> 
    </div>
  );
};

export default UserPage;
