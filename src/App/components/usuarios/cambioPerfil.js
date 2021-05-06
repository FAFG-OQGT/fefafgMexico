import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import config from "../../../config";
import axios from "axios";

import {ValidationForm, SelectGroup} from "react-bootstrap4-form-validation";
import userContext from "../../../context/userContext";

function CambioPerfil({
  usuario,
  onCambioRolDone,
  onCerrarModalRol,
  mensajeAlerta,
}) {
  const user = useContext(userContext);

  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };
  const [usuarioId] = useState(usuario.Usuario.usuarioId);
  const [newRol, setnewRol] = useState();

  const [listRol, setlistRola] = useState();

  const updatePass = async () => {
    try {
      const json = {
        rolId: newRol,
      };

      const res = await axios.put(
        `${config.urlApi}/usuario/cambioRol/${usuarioId}`,
        json,
        configReq
      );
      if (res.status === 201) {
        mensajeAlerta(
          "Cambio Rol",
          "Se ha creado el rol con exito. ",
          "success"
        );
        onCambioRolDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Cambio rol",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Cambio rol",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Cambio rol",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  //EVENT HANDLERS
  const handleCloseCambioRol = (e) => {
    e.preventDefault();
    onCerrarModalRol(false);
  };
  const handleCambioRol = (e, formData, inputs) => {
    e.preventDefault();

    updatePass();
  };

  const handleErrorSubmit = (e, formData, errorInputs) => {
    e.preventDefault();
  };
  const fetchRol = async () => {
    try {
      const res = await axios.get(`${config.urlApi}/catalogo/rol`, configReq);

      var roots = res.data.data.map(function (row) {
        return {
          value: row.rolId,
          label: "[" + row.rolId + "] " + row.descripcion,
        };
      });
      return roots;
    } catch (error) {
      return {value: "", label: "[0] - -"};
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchRol(user.token);
      setlistRola({result});
    };
    fetchData();

      setnewRol(usuario.rolId);
    return () => {};
  }, []);

  return (
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <Card.Body>
            <ValidationForm
              onSubmit={handleCambioRol}
              onErrorSubmit={handleErrorSubmit}
              setFocusOnError
              defaultErrorMessage={{
                required: "El campo es requerido.",
                minLength: "Ingresar por lo menos {minLength} caracteres",
              }}
            >
              <Row>
                <Col xs="12">
                  <Form.Group>
                    <Form.Label>Rol asociado</Form.Label>

                    <SelectGroup
                      name="gear"
                      id="gear"
                      required
                      value={newRol}
                      onChange={(e) => {
                        setnewRol(e.target.value);
                      }}
                    >
                      <option key="" value="">
                        ---Seleccione una opcion---
                      </option>

                      {!(listRol === undefined)
                        ? listRol.result.map((fbb) => (
                            <option key={fbb.value} value={fbb.value}>
                              {fbb.label}
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
                    id="btnCambiarCon"
                    name="btnCambiarCon"
                    key="btnCambiarCon"
                    variant="outline-primary"
                    type="submit"
                    size="md"
                  >
                    <i className="feather icon-save" />
                    Guardar
                  </Button>

                  <Button
                    id="btnCloseCon"
                    name="btnCloseCon"
                    key="btnCloseCon"
                    variant="outline-danger"
                    onClick={handleCloseCambioRol}
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
  );
}

export default CambioPerfil;
