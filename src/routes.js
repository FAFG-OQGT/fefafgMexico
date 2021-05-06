import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Home = React.lazy(() => import('./Views/home/index.js'));
const Personas = React.lazy(() => import('./Views/personas/personas.js'));
const Usuarios = React.lazy(() => import('./Views/usuarios/usuarios.js'));
const usuarioContra = React.lazy(() => import('./Views/usuarios/usuarioContra.js'));
const Roles = React.lazy(() => import('./Views/roles/roles.js'));
//const Login = React.lazy(() => import('./Views/login/login.js'));
const Coincidencias = React.lazy(() => import('./Views/identificados/coincidencias/coincidencias'));
const CoincidenciasCaso = React.lazy(() => import('./Views/identificados/coincidenciaCaso/coincidenciaCaso'));
const Osamenta = React.lazy(() => import('./Views/identificados/catalogos/osamenta/osamenta.js'));
const Victima = React.lazy(() => import('./Views/identificados/catalogos/Victima/Victima'));
const IdentificadosSmih = React.lazy(() => import('./Views/identificados/identificados/smih/identificados'));
const IdentificadosSmIhEdit = React.lazy(() => import('./Views/identificados/identificados/smih/IdentificadosEdit.js'));

const identificadosOsteologico = React.lazy(() => import('./Views/identificados/identificados/osteologico/identificados'));
const identificadosOsteologicoEdit = React.lazy(() => import('./Views/identificados/identificados/osteologico/IdentificadosEdit.js'));



const ReporteCoincidencia = React.lazy(() => import('./Views/reportes/reporteCoincidencia.js'));
const ReporteISmih = React.lazy(() => import('./Views/reportes/reporteISmih.js'));
const ReporteIOst = React.lazy(() => import('./Views/reportes/reporteIOst.js'));

const routes = [
    
    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/personas', exact: true, name: 'Personas', component: Personas }, 
    { path: '/usuarios', exact: true, name: 'Usuarios', component: Usuarios } , 
    { path: '/usuariosPass', exact: true, name: 'Usuarios - Cambio Contraseña', component: usuarioContra } , 
    { path: '/roles', exact: true, name: 'Roles', component: Roles } , 
    { path: '/reporteCoincidencia', exact: true, name: 'Reporte Coincidencia', component: ReporteCoincidencia } , 
    { path: '/reporteISmih', exact: true, name: 'Reportes Identificado SmIh', component: ReporteISmih } , 
    { path: '/reporteIOst', exact: true, name: 'Reportes Identificado Osteologico', component: ReporteIOst } , 
    { path: '/coincidencias', exact: true, name: 'Coincidencias', component: Coincidencias },
    { path: '/coincidenciasCaso', exact: true, name: 'Coincidencias Caso', component: CoincidenciasCaso } ,
    { path: '/osamentas', exact: true, name: 'Osamenta', component: Osamenta } ,
    { path: '/victimas', exact: true, name: 'Victima', component: Victima } ,
    { path: '/identificadosSmIh', exact: true, name: 'Identificados SmIh', component: IdentificadosSmih },
    { path: '/identificadosSmIhEdit', exact: true, name: 'Editar identificado', component: IdentificadosSmIhEdit } ,
    { path: '/identificadosOsteologico', exact: true, name: 'Identificados Osteologico', component: identificadosOsteologico },
    { path: '/identificadosOsteologicoEdit', exact: true, name: 'Editar identificado', component: identificadosOsteologicoEdit } 


];

export default routes;