import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import userContext from "../../../context/userContext";
import config from "../../../config";
import axios from "axios";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
import validator from "validator";
import {apiCatalogo} from "../../../utils/fetchCatalogos";

function UsuariosEdit({
  usuario,
  onEditarDone,
  onCerrarModalEdita,
  mensajeAlerta,
}) {
  //CONTEXT LOAD
  const userI = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${userI.token}`},
  };
  //DEFINICION DE ESTADOS
  const [usuarioId] = useState(usuario.usuarioId);
  const [personaId, setpersonaId] = useState(usuario.personaId);
  const [estadoId, setestadoId] = useState(usuario.estadoId);
  const [user, setuser] = useState(usuario.usuario);
  const [email, setemail] = useState(usuario.email);
  const [listaPersona, setlistaPrsona] = useState();
  const [puestoId, setpuestoId] = useState(usuario.puestoId);

  const [comboPuesto, setcomboPuesto] = useState();

  //EVENT HANDLERS
  const handleCloseEditUsuario = (e) => {
    e.preventDefault();
    onCerrarModalEdita(false);
  };
  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo == "puesto") setcomboPuesto(result.data);
  };
  const fetchPersonas = async (token) => {
    try {
      const res = await axios.get(
        `${config.urlApi}/persona/combo/${usuarioId}`,
        configReq
      );

      var roots = res.data.data.map(function (row) {
        return {
          value: row.personaId,
          label: "[" + row.personaId + "] " + row.nombre,
        };
      });
      return roots;
    } catch (error) {
      return {value: "", label: "[0] - -"};
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPersonas(userI.token);
      setlistaPrsona({result});
    };
    fetchData();
    fetchCatalogo("puesto");
  }, []);

  const updateUser = async () => {
    try {
      var data = {
        usuario: user,
        usuarioId: usuarioId,
        email: email,
        estadoId: estadoId,
        personaId: personaId,
        puestoId: puestoId == "" || puestoId == 0 ? null : puestoId,
      };
      const res = await axios.put(
        `${config.urlApi}/usuario/${data.usuarioId}`,
        data,
        configReq
      );

      if (res.status === 201) {
        mensajeAlerta(
          "Actualizacion usuario",
          `Actualizacion usuario","Se ha actualizado el usuario : ${user} [${data.usuarioId}]`,
          "success"
        );
        onEditarDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          mensajeAlerta(
            "Actualizacion usuario",
            `Se ha actualizado el usuario : ${user} [${data.usuarioId}]`,

            "error"
          );
        } else {
          mensajeAlerta(
            "Actualizacion usuario",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Actualizacion usuario",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  useEffect(() => {}, [listaPersona]);
  const handleEditUsuario = (e) => {
    e.preventDefault();

    updateUser();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleEditUsuario}
                setFocusOnError
                defaultErrorMessage={{
                  required: "El campo es requerido.",
                  minLength: "Ingresar por lo menos {minLength} caracteres",
                }}
              >
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Usuario</Form.Label>
                      <TextInput
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Ingresar el usuario"
                        required
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Correo Electronico</Form.Label>
                      <TextInput
                        type="text"
                        id="email"
                        name="email"
                        required
                        validator={validator.isEmail}
                        errorMessage={{
                          required: "El campo es requerido",
                          validator: "Correo electronico invalido.",
                        }}
                        placeholder="Ingresar correo electronico"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Persona</Form.Label>

                      <SelectGroup
                        name="personaList"
                        id="personaList"
                        required
                        value={!(personaId === undefined) ? personaId : ""}
                        onChange={(e) => {
                          setpersonaId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(listaPersona === undefined)
                          ? listaPersona.result.map((fbb) => (
                              <option key={fbb.value} value={fbb.value}>
                                {fbb.label}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
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
                  {" "}
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Puesto</Form.Label>
                      <SelectGroup
                        name="puestoId"
                        id="puestoId"
                        value={!(puestoId === undefined) ? puestoId : ""}
                        onChange={(e) => {
                          setpuestoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboPuesto === undefined)
                          ? comboPuesto.map((fbb) => (
                              <option key={fbb.puestoId} value={fbb.puestoId}>
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className=" d-flex justify-content-center">
                    <Button
                      key="btnSaveEditPerson"
                      type="submit"
                      variant="outline-primary"
                      size="md"
                    >
                      <i className="feather icon-save" />
                      Guardar
                    </Button>

                    <Button
                      key="btnCancelEditPerson"
                      onClick={handleCloseEditUsuario}
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

export default UsuariosEdit;
