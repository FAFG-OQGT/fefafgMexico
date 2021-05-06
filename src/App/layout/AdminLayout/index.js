import React, { Suspense} from "react";
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
    localStorage.removeItem("userLogged");
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
