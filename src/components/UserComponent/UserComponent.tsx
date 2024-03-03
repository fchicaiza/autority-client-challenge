import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { User } from '../../pages/api/User/IUser';

import 'primeicons/primeicons.css';
        



export const UserComponent = ({ users }) => {

  let emptyUser : User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }


  const [selectedUsers, setSelectedUser] = useState(null);
  const [user, setUser] = useState<User>(emptyUser);
  const [userDialog, setUserDialog] = useState<boolean>(false);

  const toast = useRef(null);
  const onRowSelect = (event) => {
    console.log({ severity: 'info', summary: 'Use Selected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };

  const onRowUnselect = (event) => {
    console.log({ severity: 'warn', summary: 'USer Unselected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };


  const editUser = (user: User) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user: User) => {
    setUser(user);
    setUserDialog(true);
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil"  rounded outlined style={{ color: 'slateblue',border:0 }}onClick={() => editUser(rowData)} />
        <Button icon="pi pi-trash" rounded outlined style={{ color: 'green', border:0 }} onClick={() => confirmDeleteUser(rowData)} />
      </React.Fragment>
    );
  };

  return (
    <div className="container col-12">
      <Toast ref={toast} />
      <DataTable value={users} selectionMode="single" selection={selectedUsers} onSelectionChange={(e) => setSelectedUser(e.value)} dataKey="id"
        onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
        <Column field="firstName" header="Nombre"></Column>
        <Column field="lastName" header="Apellido"></Column>
        <Column field="email" header="Email"></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
    </div>
  )
}

export default UserComponent   