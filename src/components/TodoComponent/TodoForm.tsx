import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';

import './styles/TodoForm.css';

export const TodoForm = ({ hideDialog, createTask, fetchAllTasks, updateTask, deleteTask, task, users }) => {
    const [selectedUserId, setSelectedUserId] = useState('');

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            description: '',
            isComplete: '',
            userId: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Campo Obligatorio '),
            description: Yup.string().required('Campo Obligatorio'),
            isComplete: Yup.string().required('Campo obligatorio'),
            userId: Yup.string().required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            handleSubmitTask(values);
            fetchAllTasks();
        },
    });

    useEffect(() => {
        if (task) {
            formik.setValues({
                id: task.id || '',
                name: task.name || '',
                description: task.description || '',
                userId: task.userId || '',
                isComplete: task.isComplete.toString() || ''
            });
            setSelectedUserId(task.userId || '');
        }
    }, [task]);

    const handleSubmitTask = async (values) => {
        console.log(values)
        let authorData = users.data.find(u => u.id === Number(values.userId))
        let taskData = {
            id: values.id,
            name: values.name,
            description: values.description,
            author: `${authorData.firstName} ${authorData.lastName}`,
            userId: authorData.id,
            isComplete: values.isComplete
        }
        try {
            if (values.id) {
                const isUpdated = await updateTask(values.id, taskData);
                hideDialog(true);
                alert(`Tarea actualizada exitosamente`);
            } else {
                const isCreated = await createTask(taskData);
                hideDialog(true);
                alert(`Tarea creada exitosamente`);
                console.log('Tarea creada:', isCreated);
            }
        } catch (error) {
            console.error('Error al operar con la tarea:', error.message);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input
                id="id"
                type="text"
                hidden
                {...formik.getFieldProps('id')}
            />
            <input
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
                className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
            />
            {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
            ) : null}


            <label htmlFor="description">Descripción</label>
            <input
                id="description"
                type="text"
                {...formik.getFieldProps('description')}
                className={formik.touched.description && formik.errors.description ? 'input-error' : ''}
            />
            {formik.touched.description && formik.errors.description ? (
                <div className="error-message">{formik.errors.description}</div>
            ) : null}


            <label htmlFor="userId">Autor</label>
            <select
                id="userId"
                {...formik.getFieldProps('userId')}
                className={formik.touched.userId && formik.errors.userId ? 'input-error' : ''}
            >
                <option value="" label="Seleccionar autor" />
                {users.data.map(user => (
                    <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                ))}
            </select>


            {formik.touched.userId && formik.errors.userId ? (
                <div className="error-message">{formik.errors.userId}</div>
            ) : null}


            <label htmlFor="isComplete">Resuelto</label>
            <select
                id="isComplete"
                {...formik.getFieldProps('isComplete')}
                className={formik.touched.isComplete && formik.errors.isComplete ? 'input-error' : ''}
            >
                <option value="" label="Seleccionar opción" />
                <option value="true">Sí</option>
                <option value="false">No</option>
            </select>
            {formik.touched.isComplete && formik.errors.isComplete ? (
                <div className="error-message">{formik.errors.isComplete}</div>
            ) : null}

            <br /> <br /><br /> <br />
            <React.Fragment>
                <div className='custom-button-container'>
                    <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
                    <Button label="Guardar" icon="pi pi-check" type='submit' />
                </div>
            </React.Fragment>
        </form>
    );
};

export default TodoForm;
