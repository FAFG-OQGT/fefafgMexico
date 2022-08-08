import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable';
import Loader from '../App/layout/Loader'
import config from '../config';
import NoEncontradoPage from '../App/pages/NoEncontradoPage';
import ActualizarContraseniaPage from '../App/pages/ActualizarContraseniaPage';
import ResetPasswordPage from '../App/pages/ResetPasswordPage';
import UpdatePasswordPage from '../App/pages/UpdatePasswordPage';
import login from '../Views/login/login';

const AdminLayout = Loadable({
    loader: () => import('../App/layout/AdminLayout'),
    loading: Loader
});
const Rutas = () => {
    return (
        <BrowserRouter basename={config.basename}>
            <Switch>
                <Route exact path="/" component={login}/>
                <Route exact path="/auth/login" component={login}/>
                <Route exact path="/auth/reset-password" component={ResetPasswordPage}/>
                <Route exact path="/admin/change-password" component={ActualizarContraseniaPage}/>
                <Route exact path="/auth/update-password/:id" component={UpdatePasswordPage}/>
                <Route path={config.baseApp} component={AdminLayout} />
                <Route component={NoEncontradoPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Rutas;
