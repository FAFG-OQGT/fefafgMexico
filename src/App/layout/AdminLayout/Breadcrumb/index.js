import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import config from '../../../../config';
import DEMO from "../../../../store/constant";
import Aux from "../../../../hoc/_Aux";


class Breadcrumb extends Component {
    state = {
        main: [],
        item: []
    };

    componentDidMount() {
        (this.props.menu).map((item, index) => {
            if (item.type && item.type === 'group') {
                this.getCollapse(item, index);
            }
            return false;
        });
    };

    UNSAFE_componentWillReceiveProps = () => {
        (this.props.menu).map((item, index) => {
            if (item.type && item.type === 'group') {
                this.getCollapse(item);
            }
            return false;
        });
    };

    getCollapse = (item) => {
        if (item.children) {
            (item.children).filter( collapse => {
                if (collapse.type && collapse.type === 'collapse') {
                    this.getCollapse(collapse,);
                } else if (collapse.type && collapse.type === 'item') {
                    if (document.location.pathname === config.basename+collapse.url) {
                        this.setState({item: collapse, main: item});
                    }
                }
                return false;
            });
        }
    };

    render() {
        let main, item;
        let breadcrumb = '';
        let title = 'Bienvenido';
        if (this.state.main && this.state.main.type === 'collapse') {
            main = (
                <li className="breadcrumb-item">
                    <a href={DEMO.BLANK_LINK}>{this.state.main.title}</a>
                </li>
            );
        }

        if (this.state.item && this.state.item.type === 'item') {
            title = this.state.item.title;
            item = (
                <li className="breadcrumb-item">
                    <a href={DEMO.BLANK_LINK}>{title}</a>
                </li>
            );

            if(this.state.item.breadcrumbs !== false) {
                breadcrumb = (
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">{title}</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/"><i className="feather icon-home"/></Link>
                                        </li>
                                        {main}
                                        {item}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

        }

        document.title = title + ' | DID';

        return (
            <Aux>
                {breadcrumb}
            </Aux>
        );
    }
}

export default Breadcrumb;
/*
import React, {Component} from "react";
import {Link} from "react-router-dom";

import config from "../../../../config";
import DEMO from "../../../../store/constant";
import Aux from "../../../../hoc/_Aux";
import userContext from "../../../../context/userContext";


class Breadcrumb extends Component {
  static contextType = userContext;

  state = {
    main: [],
    item: [],
    user: {},
  };

  componentDidMount() {
    const user = this.context;

    if (!(user === null)) {
      const menuItems = [];
      let menuUser = user.menu;

      let menuLast = {
        id: "disabled-menu",
        title: "",
        type: "item",
        url: "#",
        classes: "nav-item disabled",
        icon: "",
      };
      menuUser.push(menuLast);
      menuLast = {
        id: "userPass",
        title: "Usuario Contraseña",
        type: "item",
        url: "/usuariosPass",
        classes: "nav-item",
        visible: false,
        icon: "",
      };

      menuUser.push(menuLast);
      let menuA = {
        id: "support",
        title: "Navigation",
        type: "group",
        icon: "icon-support",
        children: menuUser,
      };

      menuItems.push(menuA);

      if (menuItems !== undefined)
        menuItems.map((item, index) => {
          if (item.type && item.type === "group") {
            this.getCollapse(item, index);
          }
          return false;
        });
    }
  }

  UNSAFE_componentWillReceiveProps = () => {
    const user = this.context;

    if (!(user === null)) {
      const menuItems = [];

      let menuA = {
        id: "support",
        title: "Navigation",
        type: "group",
        icon: "icon-support",
        children: user.menu,
      };
      menuItems.push(menuA);

      menuItems.map((item, index) => {
        if (item.type && item.type === "group") {
          this.getCollapse(item);
        }
        return false;
      });
    }
  };
  getCollapse = (item) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          this.getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            this.setState({item: collapse, main: item});
          }
        }
        return false;
      });
    }
  };

  render() {
    let main, item;
    let breadcrumb = "";
    let title = "Bienvenido";
    if (this.state.main && this.state.main.type === "collapse") {
      main = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>{this.state.main.title}</a>
        </li>
      );
    }

    if (this.state.item && this.state.item.type === "item") {
      title = this.state.item.title;
      item = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>{title}</a>
        </li>
      );

      if (this.state.item.breadcrumbs !== false) {
        breadcrumb = (
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">{title}</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home" />
                      </Link>
                    </li>
                    {main}
                    {item}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    document.title = title + " |  CRIH";

    return <Aux>{breadcrumb}</Aux>;
  }
}

export default Breadcrumb;

*/