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
import { Todo } from '../../pages/api/Todo/ITodo';
import TodoForm from './TodoForm';

import 'primeicons/primeicons.css';


export const TodoComponent = ({ tasks, createTask, updateTask, fetchAllTasks, deleteTask, users }) => {

  let emptyTask: Todo = {
    id: '',
    name: '',
    description: '',
    author: '',
    isComplete: false,
    userId:''
  }

  const [selectedTask, setSelectedTask] = useState(null);
  const [task, setTask] = useState<Todo>(emptyTask);
  const [taskCreateDialog, setTaskCreateDialog] = useState<boolean>(false);
  const [taskUpdateDialog, setTaskUpdateDialog] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const toast = useRef(null);

  const onRowSelect = (event) => {
    console.log({ severity: 'info', summary: 'Use Selected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };

  const onRowUnselect = (event) => {
    console.log({ severity: 'warn', summary: 'USer Unselected', detail: `Name: ${event.data.firstName}`, life: 3000 });
  };


  const openNew = () => {
    setTask(emptyTask);
    setSubmitted(false);
    setTaskCreateDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setTaskCreateDialog(false);
    setTaskUpdateDialog(false);
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
    setTask({ ...rowData });
    setTaskUpdateDialog(true);
  };

  const confirmDeleteUser = async (rowData) => {
    try {
      const resultado = confirm("¿Estás seguro de eliminar este registro?");
      if (resultado) {
        await deleteTask(rowData.id);
        alert("Usuario eliminado exitosamente");
        await fetchAllTasks();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
    }
  };


  const actionBodyTemplate = (rowData: Todo) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined style={{ color: 'slateblue', border: 0 }} onClick={() => updateUserFunc(rowData)} />
        <Button icon="pi pi-trash" rounded outlined style={{ color: 'green', border: 0 }} onClick={() => confirmDeleteUser(rowData)} />
      </React.Fragment>
    );
  };

  


  return (
    <>
      <div className="container col-12">
        <Toast ref={toast} />
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable value={tasks} selectionMode="single" selection={selectedTask} onSelectionChange={(e) => setSelectedTask(e.value)} dataKey="id"
          onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" header="Nombre"></Column>
          <Column field="description" header="Descripcion"></Column>
          <Column field="author" header="Autor"></Column>
          <Column field="isComplete" header="Resuelto"></Column>
          <Column field="userId" hidden header="Id Usuario"></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={taskCreateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Nueva Tarea" modal className="p-fluid" onHide={hideDialog}>
        <TodoForm
          hideDialog={hideDialog}
          createTask={createTask}
          updateTask={updateTask}
          fetchAllTasks={fetchAllTasks}
          deleteTask={deleteTask}
          task={task}
          users={users}
        ></TodoForm>
      </Dialog>

      <Dialog visible={taskUpdateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Tarea" modal className="p-fluid" onHide={hideDialog}>
        <TodoForm
           hideDialog={hideDialog}
           createTask={createTask}
           updateTask={updateTask}
           fetchAllTasks={fetchAllTasks}
           deleteTask={deleteTask}
           task={task}
           users={users}
        ></TodoForm>
      </Dialog>
    </>

  )
}

export default TodoComponent   