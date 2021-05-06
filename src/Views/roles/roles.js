import React, {useContext, useState, useEffect} from "react";
import {
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import MainCard from "../../App/components/MainCard";
import config from "../../config";
import axios from "axios";

import ObjetoAccesoSelect from '../../App/components/Roles/ObjetoAccesoSelect'

import userContext from "../../context/userContext";

//css
import "./roles.css";
 
function Roles(props) {
  const [DataRoles, setDataRoles] = useState([]);
  const userC = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${userC.token}`},
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${config.urlApi}/catalogo/rol`, configReq);
      let registros =res.data.data.map(item => (
        {
            rolId : item.rolId,
            descripcion : item.descripcion,
            selected : false
        }
      ))
      setDataRoles(registros);
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          props.mensajeAlerta(
            "Error",
            `${dataError.codigo} - ${dataError.data}`,
            "error"
          );
          console.log(`${dataError.codigo} - ${dataError.data}`);
        } else {
          props.mensajeAlerta("Error", error.response.statusText, "error");
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } else {
        props.mensajeAlerta("Error", error.response.statusText, "error");
        console.log(`${error.response.status} - ${error.response.statusText}`);
      }
    }
  };
  const selectRol = (rolId) => {
    let DataRolesTemp =  DataRoles.map((item) => (
        {
            rolId : item.rolId,
            descripcion : item.descripcion,
            selected : (rolId===item.rolId)? true : false
        }
      ))
    setDataRoles(DataRolesTemp)
  }



  useEffect(() => {
    fetchRoles();
    return () => {};
  }, []);
  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Seguridad - Roles" isOption>
              <Row>
                <Col xl={4} sm={4} lg={4}>
                  {DataRoles.map((item) => (
                    <Card key={item.rolId} className="
                    cardRoles"  border={item.selected === true ? "primary" :"" }  >
                      <Card.Body>
                        <Row>
                          <Col className="float-left text-left">
                             <p className="card-text"> [{item.rolId}] - {item.descripcion}</p>
                          </Col>
                          <Col >
                          <div className="float-right ">
                            <Button  variant="primary" size="sm" onClick={()=> selectRol(item.rolId)}>
                              <i className="feather icon-settings" />
                            </Button>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
                <Col xl={8} sm={8} lg={8}>
                  <Card text="white" className="cardRoles h-100">
                    <Card.Body>
                      <ObjetoAccesoSelect></ObjetoAccesoSelect>
                    </Card.Body>
                  </Card>
                </Col>
               
              </Row>
            </MainCard>
          </Col>
        </Row>
      </Aux>
    </div>
  );
}

export default Roles;
