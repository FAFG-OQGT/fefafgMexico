import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from "react-bootstrap4-form-validation";
import validator from "validator";
import {apiCatalogo} from "../../../utils/fetchCatalogos";

function UsuariosNuevo({
  onNuevoDone,
  onCerrarModalNuevo,
  mensajeAlerta,
  agregar = false
}) {
  //CONTEXT LOAD
  const userI = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${userI.token}`}
  };
  //DEFINICION DE ESTADOS
  const [personaId, setpersonaId] = useState("");
  const [estadoId] = useState("1");
  const [user, setuser] = useState("");
  const [email, setemail] = useState("");
  const [rolId, setrolId] = useState("");
  const [listaPersona, setlistaPrsona] = useState();

  const [puestoId, setpuestoId] = useState("");

  const [comboPuesto, setcomboPuesto] = useState();

  const [comboRol, setComboRol] = useState();

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo == "puesto") setcomboPuesto(result.data);
    if (catalogo == "rol") setComboRol(result.data);
  };

  const fetchPersonas = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/persona/combo/0`,
        configReq
      );

      var roots = res.data.data.map(function (row) {
        return {
          value: row.personaId,
          label: "[" + row.personaId + "] " + row.nombre
        };
      });
      return roots;
    } catch (error) {
      return {value: "", label: "[0] - -"};
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPersonas();
      setlistaPrsona({result});
    };
    fetchData();
    fetchCatalogo("puesto");
    fetchCatalogo("rol");
  }, []);

  //EVENT HANDLERS
  const handleCloseNuevoUsuario = (e) => {
    e.preventDefault();
    onCerrarModalNuevo(false);
  };

  const createUser = async () => {
    try {
      var data = {
        usuario: user,
        email: email,
        password: "Temporal123.",
        estadoId: estadoId,
        personaId: personaId,
        puestoId: puestoId == "" || puestoId == 0 ? null : puestoId,
        rolId: rolId == "" || rolId == 0 ? null : rolId
      };

      const res = await axios.post(`${config.urlApi}/usuario`, data, configReq);
      if (res.status === 202) {
        mensajeAlerta(
          "Creacion usuario",
          `Se ha creado el usuario : ${user}`,
          "success"
        );
        onNuevoDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Creacion usuario",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion usuario",
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

  const handleNuevoUsuario = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleNuevoUsuario}
                setFocusOnError
                defaultErrorMessage={{
                  required: "El campo es requerido.",
                  minLength: "Ingresar por lo menos {minLength} caracteres"
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
                          validator: "Correo electronico invalido."
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
                        name="gear"
                        id="gear"
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
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Perfil</Form.Label>
                      <SelectGroup
                        name="rolId"
                        id="rolId"
                        value={!(rolId === undefined) ? rolId : ""}
                        onChange={(e) => {
                          setrolId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboRol === undefined)
                          ? comboRol.map((fbb) => (
                              <option key={fbb.rolId} value={fbb.rolId}>
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
                      onClick={handleCloseNuevoUsuario}
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

export default UsuariosNuevo;
