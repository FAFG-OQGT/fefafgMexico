import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import moment from "moment";
import axios from "axios";

import userContext from "../../../context/userContext";
import config from "../../../config";
import Datetime from "react-datetime";
import {ValidationForm, TextInput} from "react-bootstrap4-form-validation";
function PersonasNueva({
  onNuevoDone,
  onCerrarModalNuevo,
  mensajeAlerta,
  agregar
}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };
  //DEFINICION DE ESTADOS

  const [primerNombre, setprimerNombre] = useState("");
  const [segundoNombre, setsegundoNombre] = useState("");
  const [primerApellido, setprimerApellido] = useState("");
  const [segundoApellido, setsegundoApellido] = useState("");
  const [fechaNacimiento, setfechaNacimiento] = useState();
  const [genero, setgenero] = useState("1");
  const [telefono, setTelefono] = useState("");

  //EVENT HANDLERS

  const handleChangeFechaNacimiento = (e) => {
    setfechaNacimiento(moment(e).utc());
  };

  const handleCloseNuevaPersona = (e) => {
    e.preventDefault();
    onCerrarModalNuevo();
  };
  const createPersona = async () => {
    try {
      var data = {
        nombre1: primerNombre,
        nombre2: segundoNombre,
        apellido1: primerApellido,
        apellido2: segundoApellido,
        fechaNacimiento: moment(fechaNacimiento).format("YYYY-MM-DD"),
        generoId: genero,
        estadoId: 1,
        telefono: telefono,
        paisId: "1"
      };
      const res = await axios.post(`${config.urlApi}/persona`, data, configReq);
      if (res.status === 202) {
        mensajeAlerta(
          "Creacion persona",
          `Se ha creado la persona correctamente`,
          "success"
        );
        onNuevoDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Creacion persona",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion persona",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Creacion persona",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const handleNuevaPersona = (e) => {
    e.preventDefault();
    createPersona();
  };

  useEffect(() => {
    let boolDate = moment(fechaNacimiento).isValid();
    if (!boolDate) setfechaNacimiento(moment());

    return () => {};
  }, [fechaNacimiento]);
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleNuevaPersona}
                setFocusOnError
                defaultErrorMessage={{
                  required: "El campo es requerido.",
                  minLength: "Ingresar por lo menos {minLength} caracteres"
                }}
              >
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Primer Nombre</Form.Label>
                      <TextInput
                        type="text"
                        id="PrimerNombre"
                        name="PrimerNombre"
                        required
                        placeholder="Ingresar primer nombre"
                        value={primerNombre}
                        onChange={(e) => setprimerNombre(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Segundo Nombre</Form.Label>
                      <TextInput
                        type="text"
                        id="SegundoNombre"
                        name="SegundoNombre"
                        placeholder="Ingresar segundo nombre"
                        value={segundoNombre}
                        onChange={(e) => setsegundoNombre(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Primer Apellido</Form.Label>
                      <TextInput
                        type="text"
                        id="PrimerApellido"
                        name="PrimerApellido"
                        required
                        placeholder="Ingresar primer apellido"
                        value={primerApellido}
                        onChange={(e) => setprimerApellido(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Segundo Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        id="SegundoApellido"
                        placeholder="Ingresar segundo apellido"
                        value={segundoApellido}
                        onChange={(e) => setsegundoApellido(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Fecha Nacimiento</Form.Label>
                      <Datetime
                        locale="es-gt"
                        id="FechaNacimiento"
                        dateFormat="DD-MM-YYYY"
                        name="FechaNacimiento"
                        required
                        inputProps={{placeholder: "Fecha Nacimiento"}}
                        value={moment(fechaNacimiento).format("DD-MM-YYYY")}
                        onChange={handleChangeFechaNacimiento}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Genero</Form.Label>

                      <Form.Group className="d-flex justify-content-center">
                        <Row>
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label="Masculino"
                            name="radio1"
                            id="radio1"
                            value="1"
                            checked={genero === "1" ? true : false}
                            onChange={(e) => setgenero(e.target.value)}
                          />
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label="Femenino"
                            name="radio2"
                            id="radio2"
                            value="2"
                            checked={genero === "2" ? true : false}
                            onChange={(e) => setgenero(e.target.value)}
                          />
                        </Row>
                      </Form.Group>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Telefono</Form.Label>
                      <TextInput
                        type="text"
                        id="Telefono"
                        name="Telefono"
                        placeholder="Ingresar telefono"
                        value={telefono}
                        required
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6"></Col>
                </Row>

                <Row>
                  <Col className=" d-flex justify-content-center">
                    {agregar === true && (
                      <Button
                        key="btnSaveEditPerson"
                        type="submit"
                        variant="outline-primary"
                        size="md"
                      >
                        <i className="feather icon-save" />
                        Guardar
                      </Button>
                    )}
                    <Button
                      key="btnCancelEditPerson"
                      onClick={handleCloseNuevaPersona}
                      variant="outline-danger"
                      size="md"
                    >
                      <i className="feather icon-close" />
                      Cancelar
                    </Button>
                  </Col>
                </Row>
              </ValidationForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PersonasNueva;
