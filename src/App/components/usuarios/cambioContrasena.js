import React, {useState, useContext} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import config from "../../../config";
import axios from "axios";

import {ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import userContext from "../../../context/userContext";

function CambioContrasena({
  usuario,
  onCambioConDone,
  onCerrarModalCambio,
  mensajeAlerta,
  actualizar = false
}) {
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };

  const [usuarioId] = useState(usuario.usuarioId);
  const [currentPass, setcurrentPass] = useState("");

  const [newPass, setnewPass] = useState("");

  const [confNewPass, setconfNewPass] = useState("");

  const updatePass = async () => {
    try {
      const json = {
        usuarioId: usuarioId,
        passNew: newPass,
        confirm: confNewPass,
        password: currentPass
      };
      const res = await axios.put(
        `${config.urlApi}/auth/changePass`,
        json,
        configReq
      );
      if (res.status === 201) {
        mensajeAlerta("Cambio contrasena", res.data.data, "success");
        onCambioConDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Cambio contrasena",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Cambio contrasena",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Cambio contrasena",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  //EVENT HANDLERS
  const handleCloseCambioConUsuario = (e) => {
    e.preventDefault();
    onCerrarModalCambio(false);
  };
  const handleCambioCon = (e, formData, inputs) => {
    e.preventDefault();

    updatePass();
  };

  const handleErrorSubmit = (e, formData, errorInputs) => {
    e.preventDefault();
  };

  const matchPassword = (value) => {
    return value && value === newPass;
  };
  return (
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <Card.Body>
            <ValidationForm
              onSubmit={handleCambioCon}
              onErrorSubmit={handleErrorSubmit}
              setFocusOnError
              defaultErrorMessage={{
                required: "El campo es requerido.",
                minLength: "Ingresar por lo menos {minLength} caracteres"
              }}
            >
              <Row>
                <Col xs="12">
                  <Form.Group>
                    <Form.Label>Contraseña Actual</Form.Label>

                    <TextInput
                      name="currentPass"
                      id="currentPass"
                      placeholder="Contrasena Actual"
                      required
                      minLength={3}
                      type="password"
                      value={currentPass}
                      onChange={(e) => setcurrentPass(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contraseña Nueva</Form.Label>
                    <TextInput
                      type="password"
                      id="newPass"
                      required
                      name="newPass"
                      placeholder="Contraseña nueva"
                      value={newPass}
                      onChange={(e) => setnewPass(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirmaciòn contraseña nueva</Form.Label>
                    <TextInput
                      type="password"
                      id="confPass"
                      name="confPass"
                      placeholder="Confirmaciòn contraseña nueva"
                      value={confNewPass}
                      required
                      onChange={(e) => setconfNewPass(e.target.value)}
                      validator={matchPassword}
                      errorMessage={{
                        required: "Es necesario que confirme la contrasena",
                        validator: "Contrasenas no coinciden"
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className=" d-flex justify-content-center">
                  {actualizar === true && (
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
                  )}
                  <Button
                    id="btnCloseCon"
                    name="btnCloseCon"
                    key="btnCloseCon"
                    variant="outline-danger"
                    onClick={handleCloseCambioConUsuario}
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

export default CambioContrasena;
