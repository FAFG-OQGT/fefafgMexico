import React from "react";
import $ from "jquery";
import config from "../src/config";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Home = React.lazy(() => import("./Views/home/index.js"));
const Personas = React.lazy(() => import("./Views/personas/personas.js"));
const Usuarios = React.lazy(() => import("./Views/usuarios/usuarios.js"));
const usuarioContra = React.lazy(() =>
  import("./Views/usuarios/usuarioContra.js")
);
const Roles = React.lazy(() => import("./Views/roles/roles.js"));
//const Login = React.lazy(() => import('./Views/login/login.js'));
const Coincidencias = React.lazy(() =>
  import("./Views/identificados/coincidencias/coincidencias")
);
const CoincidenciasCaso = React.lazy(() =>
  import("./Views/identificados/coincidenciaCaso/coincidenciaCaso")
);
const Osamenta = React.lazy(() =>
  import("./Views/identificados/catalogos/osamenta/osamenta.js")
);
const Victima = React.lazy(() =>
  import("./Views/identificados/catalogos/Victima/Victima")
);
const IdentificadosSmih = React.lazy(() =>
  import("./Views/identificados/identificados/smih/identificados")
);
const IdentificadosSmIhEdit = React.lazy(() =>
  import("./Views/identificados/identificados/smih/IdentificadosEdit.js")
);

const ReporteCoincidencia = React.lazy(() =>
  import("./Views/reportes/reporteCoincidencia.js")
);
const ReporteISmih = React.lazy(() =>
  import("./Views/reportes/reporteISmih.js")
); 
const noEncontrado = React.lazy(() => import("./App/pages/NoEncontradoPage"));
const routes = [
  {path: config.baseApp + "/home", exact: true, name: "Home", component: Home},
  {
    path: config.baseApp + "/personas",
    exact: true,
    name: "Personas",
    component: Personas
  },
  {
    path: config.baseApp + "/usuarios",
    exact: true,
    name: "Usuarios",
    component: Usuarios
  },
  {
    path: config.baseApp + "/usuariosPass",
    exact: true,
    name: "Usuarios - Cambio Contraseña",
    component: usuarioContra
  },
  {
    path: config.baseApp + "/roles",
    exact: true,
    name: "Roles",
    component: Roles
  },
  {
    path: config.baseApp + "/reporteCoincidencia",
    exact: true,
    name: "Reporte Coincidencia",
    component: ReporteCoincidencia
  },
  {
    path: config.baseApp + "/reporteISmih",
    exact: true,
    name: "Reportes Identificado SmIh",
    component: ReporteISmih
  }, 
  {
    path: config.baseApp + "/coincidencias",
    exact: true,
    name: "Coincidencias",
    component: Coincidencias
  },
  {
    path: config.baseApp + "/coincidenciasCaso",
    exact: true,
    name: "Coincidencias Caso",
    component: CoincidenciasCaso
  },
  {
    path: config.baseApp + "/osamentas",
    exact: true,
    name: "Osamenta",
    component: Osamenta
  },
  {
    path: config.baseApp + "/victimas",
    exact: true,
    name: "Victima",
    component: Victima
  },
  {
    path: config.baseApp + "/identificadosSmIh",
    exact: true,
    name: "Identificados SmIh",
    component: IdentificadosSmih
  },
  {
    path: config.baseApp + "/identificadosSmIhEdit",
    exact: true,
    name: "Editar identificado",
    component: IdentificadosSmIhEdit
  }, 
  {name: "noEncontrado", component: noEncontrado}
];

export default routes;
