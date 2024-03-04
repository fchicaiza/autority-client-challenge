import React, { useState, useEffect } from 'react';
import {fetchAllUsers, createUser, updateUser, deleteUser} from '../api/User/User';
import { User } from '../api/User/IUser';
import { UserComponent } from '../../components'; 

import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import "primereact/resources/themes/lara-light-cyan/theme.css";

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
  }, [users]);

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <UserComponent 
      users={users}
      fetchAllUsers={fetchAllUsers}
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
