import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { User } from '../../pages/api/User/IUser';
import { UserForm } from './UserForm';

import 'primeicons/primeicons.css';


export const UserComponent = ({ users, createUser, updateUser, fetchAllUsers, deleteUser }) => {

  let emptyUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  const [selectedUsers, setSelectedUser] = useState(null);
  const [user, setUser] = useState<User>(emptyUser);
  const [userCreateDialog, setUserCreateDialog] = useState<boolean>(false);
  const [userUpdateDialog, setUserUpdateDialog] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const toast = useRef(null);
  const onRowSelect = (event) => {
    console.log({ severity: 'info', summary: 'Use Selected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };

  const onRowUnselect = (event) => {
    console.log({ severity: 'warn', summary: 'USer Unselected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };


  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserCreateDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserCreateDialog(false);
    setUserUpdateDialog(false);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} />
      </div>
    );
  };


  const updateUserFunc = (rowData) => {
    console.log("INFO A ACTUALIZAR", rowData)
    // return
    setUser({ ...rowData });
    setUserUpdateDialog(true);
  };

  const confirmDeleteUser = async (rowData) => {
    try {
      const resultado = confirm("¿Estás seguro de eliminar este registro?");
      if (resultado) {
        await deleteUser(rowData.id);
        alert("Usuario eliminado exitosamente");
        await fetchAllUsers();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
    }
  };


  const actionBodyTemplate = (rowData: User) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined style={{ color: 'slateblue', border: 0 }} onClick={() => updateUserFunc(rowData)} />
        <Button icon="pi pi-trash" rounded outlined style={{ color: 'green', border: 0 }} onClick={() => confirmDeleteUser(rowData)} />
      </React.Fragment>
    );
  };


  useEffect(() => {
    fetchAllUsers()
  }, [])
  return (
    <>
      <div className="container col-12">
        <Toast ref={toast} />
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable value={users} selectionMode="single" selection={selectedUsers} onSelectionChange={(e) => setSelectedUser(e.value)} dataKey="id"
          onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
          <Column field="firstName" header="Nombre"></Column>
          <Column field="lastName" header="Apellido"></Column>
          <Column field="email" header="Email"></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={userCreateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Nuevo Usuario" modal className="p-fluid" onHide={hideDialog}>
        <UserForm
          hideDialog={hideDialog}
          createUser={createUser}
          updateUser={updateUser}
          fetchAllUsers={fetchAllUsers}
          deleteUser={deleteUser}
          user={user}
        ></UserForm>
      </Dialog>

      <Dialog visible={userUpdateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Usuario" modal className="p-fluid" onHide={hideDialog}>
        <UserForm
          hideDialog={hideDialog}
          createUser={createUser}
          updateUser={updateUser}
          fetchAllUsers={fetchAllUsers}
          deleteUser={deleteUser}
          user={user}
        ></UserForm>
      </Dialog>
    </>

  )
}

export default UserComponent   