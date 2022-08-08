import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';
import userContext from "../../../context/userContext";
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Configuration from './Configuration';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import { loginBackend, logout } from '../../../actions/auth';
//import '../../../app.scss';

class AdminLayout extends Component {

  state = {
    logged: false,
    cargado: false
  };
  fullScreenExitHandler = () => {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      this.props.onFullScreenExit();
    }
  };
  componentDidMount() {
    this.props.validarLogin();
  }
  UNSAFE_componentWillMount() {
    if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
      this.props.onUNSAFE_componentWillMount();
    }
  }
  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onUNSAFE_componentWillMount();
    }
  }

  render() {
    document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
    document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
    document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
    document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

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

    let mainClass = ['pcoded-wrapper'];
    if (this.props.layout === 'horizontal' && this.props.subLayout === 'horizontal-2') {
      mainClass = [...mainClass, 'container'];
    }
    return (
      <Aux>
        {
          this.props.logged === true &&
          <userContext.Provider value={this.props.userInfo || {}}>
            <Fullscreen enabled={this.props.isFullScreen}>
              <Navigation />
              <NavBar />
              <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                <div className={mainClass.join(' ')}>
                  <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                      <Breadcrumb menu={this.props.menu || []} />
                      <div className="main-body">
                        <div className="page-wrapper">
                          <Suspense fallback={<Loader />}>
                            {
                              (this.props.logged === true && !this.props.forzar_cambio_password) ?
                                <Switch>
                                  {menu}
                                </Switch>
                                : (this.props.logged === true && this.props.forzar_cambio_password === true) &&
                                <Redirect from="/" to="/admin/change-password" />

                            }
                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Configuration />
            </Fullscreen>
          </userContext.Provider>
        }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    layout: state.layout,
    subLayout: state.subLayout,
    logged: state.logged,
    forzar_cambio_password: state.forzar_cambio_password,
    menu: state.menu,
    userInfo: state.userInfo
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onUNSAFE_componentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    validarLogin: () => dispatch(loginBackend()),
    salir: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(AdminLayout));

/*import React, { Suspense} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Fullscreen from "react-full-screen";


import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Configuration from "./Configuration";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";


//import '../../../app.scss';

function AdminLayout(props) {
 
  const signOutHandler = (e) => {
    sessionStorage.removeItem("userLogged");
    props.history.push("/auth/login");
  };

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  const mobileOutClickHandler = () => {
    alert("¡");
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onUNSAFE_componentWillMount();
    }
  };

  let mainClass = ["pcoded-wrapper"];
  if (props.layout === "horizontal" && props.subLayout === "horizontal-2") {
    mainClass = [...mainClass, "container"];
  }
  return (
      <Aux>
        <Fullscreen enabled={props.isFullScreen}>
          <Navigation />
          <NavBar onLogout={signOutHandler} />
          <div
            className="pcoded-main-container"
            onClick={() => mobileOutClickHandler}
          >
            <div className={mainClass.join(" ")}>
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <Breadcrumb  />
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          {menu}
                          <Redirect from="/" to={props.defaultPath} />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Configuration />
        </Fullscreen>
      </Aux>
  );
}

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    layout: state.layout,
    subLayout: state.subLayout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
    onUNSAFE_componentWillMount: () =>
      dispatch({type: actionTypes.COLLAPSE_MENU}),
  };
};

//export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
*/