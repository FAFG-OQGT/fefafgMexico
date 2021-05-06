import React, {  Suspense } from 'react';
import { Switch, Route, Redirect,withRouter  } from 'react-router-dom';

import Loadable from 'react-loadable';
import { useIdleTimer } from 'react-idle-timer'


import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

import userContext from "./../context/userContext";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

function App(props){

    const user = JSON.parse(localStorage.getItem("userLogged"));
     
    const handleOnIdle = event => {
        if (user!=null){
            localStorage.removeItem("userLogged");
            props.history.push("/auth/login");
        }
      }
     

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: props.timeOut,//milisegundos
        onIdle: handleOnIdle,
        debounce: 500
      })

    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
      });
      return (
    <userContext.Provider value={user}>
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        {menu}
                        { !(user==null)?
                        (<Route path="/" component={AdminLayout} />)
                        :
                        ( <Redirect to="/auth/login"/>)
                        }
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Aux>
    </userContext.Provider>

    );
}



export default withRouter(App);
