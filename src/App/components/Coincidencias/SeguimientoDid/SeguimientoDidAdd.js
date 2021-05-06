import React, { useState, useContext} from "react";
import {Row, Col, Form, Card} from "react-bootstrap";
import userContext from "../../../../context/userContext";
import config from "../../../../config";
import axios from "axios";
import "./SeguimientoDid.css";
import {
  ValidationForm,
} from "react-bootstrap4-form-validation";
function SeguimientoDidAdd({CoincidenciaId,onEditDone, mensajeAlerta}) {
  const userf = useContext(userContext);
  const [comentario, setcomentario] = useState();
  const configReq = {
    headers: {Authorization: `Bearer ${userf.token}`},
  };
  const createSeguimiento = async () => {
    try {
      var data = {
        coincidenciaId: CoincidenciaId,
        descripcion: comentario,
        estadoId: 1,
        usuarioIngresoId: userf.usuarioId,
      };
      const res = await axios.post(
        `${config.urlApi}/coincidencia/solSeguimiento`,
        data,
        configReq
      );
      if (res.status === 202) {
        mensajeAlerta(
          "Creacion seguimiento",
          `Se ha creado el  Seguimiento correctamente`,
          "success"
        );
        onEditDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Creacion de Seguimiento",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion de Seguimiento",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Creacion de Seguimiento",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    createSeguimiento();
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <ValidationForm onSubmit={handleAdd}>
            <Row>
              <Col>
                <div className="form-group m-t-15">
                  <Form.Control
                    as="textarea" 
                    rows="3"
                    id="comentario"
                    name="comentario"
                    value={comentario}
                    required
                    onChange={(e) => setcomentario(e.target.value)}
                  />
                  <div className="form-icon">
                    <button className="btn btn-primary btn-icon">
                    <i className="feather icon-save" />
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </ValidationForm>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeguimientoDidAdd;
