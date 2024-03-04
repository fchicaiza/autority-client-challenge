import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';

import './styles/TodoForm.css';

export const TodoForm = ({ hideDialog, createTask, updateTask, fetchAllTasks, deleteTask, tasks }) => {


    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            description: '',
            author: '',
            isComplete: '',
            userId: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Campo Obligatorio'),
            description: Yup.string().required('Campo Obligatorio'),
            author: Yup.string().required('Campo Obligatorio'),
            isComplete: Yup.string().email('Debe indicar si su solicitud fue resuelta o no').required('Campo obligatorio'),
            userId: Yup.string().required('La contraseña es un campo obligatrio').required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            handleSubmitUser(values);
        },
    });

    useEffect(() => {
        if (tasks) {
            formik.setValues({
                id: tasks.id || '',
                name: tasks.name || '',
                description: tasks.description || '',
                author: tasks.author || '',
                isComplete:tasks.isComplete || '',
                userId : tasks.userId || '',
            });
        }
    }, []);

    const handleSubmitUser = async (values) => {
        try {
            if (values.id) {
                const isUpdated = await updateTask(values.id, values);
                fetchAllTasks();
                alert(`Tarea actualizada exitosamente`);
                console.log('Tarea actualizada:', isUpdated);
            } else {
                const isCreated = await createTask(values);
                hideDialog(true);
                fetchAllTasks();
                alert(`Tarea creada exitosamente`);
                console.log('Tarea creada:', isCreated);
            }
        } catch (error) {
            console.error('Error al transaccionar con las tareas:', error.message);
        }
    };


    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="id">Id</label>
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

            <label htmlFor="author">Autor</label>
            <input
                id="author"
                type="author"
                {...formik.getFieldProps('author')}
                className={formik.touched.author && formik.errors.author ? 'input-error' : ''}
            />
            {formik.touched.author && formik.errors.author ? (
                <div className="error-message">{formik.errors.author}</div>
            ) : null}

            <label htmlFor="userId">Contraseña</label>
            <input
                id="userId"
                type="userId"
                hidden
                {...formik.getFieldProps('userId')}
                className={formik.touched.userId && formik.errors.userId ? 'input-error' : ''}
            />
            {formik.touched.userId && formik.errors.userId ? (
                <div className="error-message">{formik.errors.userId}</div>
            ) : null}

            <br /> <br />
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
