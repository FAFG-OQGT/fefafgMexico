import React from 'react';

const Login = React.lazy(() => import('./Views/login/login'));
const Actualizarcontrasenia=React.lazy(() => import('./App/components/ActualizacionContrasenia/ActualizacionContrasenia'));
const route = [
    { path: '/auth/login', exact: true, name: 'Login', component: Login },
    { path: '/admin/change-password', exact: true, name: 'Actualizar Contraseña', component: Actualizarcontrasenia }
];

export default route;