import React, { useState, useEffect } from 'react';
import { fetchAllUsers, createUser, updateUser, deleteUser } from '../api/User/User';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components';

import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchAllUsers();
      setFetchedUsers(fetchedUsers);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); 

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <UserComponent
        users={users}
        fetchAllUsers={loadUsers}
        createUser={createUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
        setFetchedUsers={setFetchedUsers}
        setUsers={setUsers}
      />
    </div>
  );
};

export default UserPage;
