import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import Datetime from "react-datetime";
import {ValidationForm, TextInput} from "react-bootstrap4-form-validation";
function PersonasEdit({
  persona,
  onEditarDone,
  onCerrarModalEdita,
  mensajeAlerta,
  actualizar
}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };
  //DEFINICION DE ESTADOS
  const [personaId] = useState(persona.personaId);
  const [estadoId, setestadoId] = useState(persona.estadoId);
  const [primerNombre, setprimerNombre] = useState(persona.nombre1);
  const [segundoNombre, setsegundoNombre] = useState(persona.nombre2);
  const [primerApellido, setprimerApellido] = useState(persona.apellido1);
  const [segundoApellido, setsegundoApellido] = useState(persona.apellido2);
  const [fechaNacimiento, setfechaNacimiento] = useState(
    moment(persona.fechaNacimiento).utc()
  );
  const [genero, setgenero] = useState(
    persona.generoId != null ? persona.generoId.toString() : "0"
  );
  const [telefono, setTelefono] = useState(
    persona.telefono == null ? "" : persona.telefono.toString()
  );

  //EVENT HANDLERS
  const handleChangeFechaNacimiento = (e) => {
    setfechaNacimiento(moment(e).utc());
  };
  const handleCloseEditPerson = (e) => {
    e.preventDefault();
    onCerrarModalEdita();
  };
  const updatePersona = async () => {
    try {
      var data = {
        nombre1: primerNombre,
        nombre2: segundoNombre,
        apellido1: primerApellido,
        apellido2: segundoApellido,
        fechaNacimiento: moment(fechaNacimiento).format("YYYY-MM-DD"),
        generoId: genero,
        personaId: personaId,
        estadoId: estadoId,
        telefono: telefono
      };
      const res = await axios.put(
        `${config.urlApi}/persona/${data.personaId}`,
        data,
        configReq
      );

      if (res.status === 201) {
        mensajeAlerta(
          "Actualizacion de Personas",
          "Se ha actualizado la persona con id [" + data.personaId + "]",
          "success"
        );
        onEditarDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Actualizacion persona",
            dataError,

            "error"
          );
        } else {
          mensajeAlerta(
            "Actualizacion persona",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Actualizacion persona",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const handleEditPerson = (e) => {
    e.preventDefault();

    updatePersona();
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
                onSubmit={handleEditPerson}
                setFocusOnError={true}
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
                        placeholder="Ingresar primer nombre"
                        required
                        value={primerNombre}
                        onChange={(e) => setprimerNombre(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Segundo Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        id="SegundoNombre"
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
                        id="FechaNacimiento"
                        dateFormat="DD-MM-YYYY"
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
                        required
                        placeholder="Ingresar telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        as="select"
                        value={estadoId}
                        onChange={(e) => setestadoId(e.target.value)}
                      >
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className=" d-flex justify-content-center">
                    {actualizar === true && (
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
                      onClick={handleCloseEditPerson}
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

export default PersonasEdit;
