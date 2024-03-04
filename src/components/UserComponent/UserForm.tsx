import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';

import './styles/UserForm.css';

export const UserForm = ({ hideDialog, createUser, updateUser, fetchAllUsers, deleteUser, user, setFetchedUsers, setUsers }) => {


    const formik = useFormik({
        initialValues: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Campo Obligatorio'),
            lastName: Yup.string().required('Campo Obligatorio'),
            email: Yup.string().email('Dirección de correo electrónico inválida').required('Campo obligatorio'),
            password: Yup.string().required('La contraseña es un campo obligatrio').required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            handleSubmitUser(values);
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                id: user.id || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                password: '',
            });
        }
    }, []);

    const handleSubmitUser = async (values) => {
        try {
            if (values.id) {
                const isUpdated = await updateUser(values.id, values);
                hideDialog(true);
                fetchAllUsers();
                alert(`Usuario actualizado exitosamente`);
                console.log('Usuario actualizado:', isUpdated);
            } else {
                const isCreated = await createUser(values);
                hideDialog(true);
                fetchAllUsers();
                alert(`Usuario creado exitosamente`);
                console.log('Usuario creado:', isCreated);
            }
        } catch (error) {
            console.error('Error al operar con el usuario:', error.message);
        }
    };

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">Nombre</label>
            <input
                id="id"
                type="text"
                hidden
                {...formik.getFieldProps('id')}

            />
            <input
                id="firstName"
                type="text"
                {...formik.getFieldProps('firstName')}
                className={formik.touched.firstName && formik.errors.firstName ? 'input-error' : ''}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-message">{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Apellido</label>
            <input
                id="lastName"
                type="text"
                {...formik.getFieldProps('lastName')}
                className={formik.touched.lastName && formik.errors.lastName ? 'input-error' : ''}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-message">{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="email">Correo electrónico</label>
            <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Contraseña</label>
            <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
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

export default UserForm;
