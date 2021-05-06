import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button, InputGroup} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import Datetime from "react-datetime";
import {renderInputFecha, validDate} from "../Utils/fechas";

import {apiCatalogo} from "../../../utils/fetchCatalogos";
import "./OsamentaAdd.css";
import CoordinateInput, {dmsToDecimal} from "react-coordinate-input";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
function OsamentaAdd({onAddDone, oncerrarModal, mensajeAlerta}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };
  //DEFINICION DE ESTADOS
  const [comboDepto, setcomboDepto] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();

  //DEFINICION DE ESTADOS
  const [sexoadnid, setsexoadnid] = useState("");
  const [osamentaDet, setosamentaDet] = useState("");
  const [casoId, setcasoId] = useState("");
  const [fosaDet, setfosaDet] = useState("");
  const [locisAlelosUtiles, setlocisAlelosUtiles] = useState("");
  const [fechaIngresoLab, setfechaIngresoLab] = useState("");
  const [fechaIngresoMFiSys, setfechaIngresoMFiSys] = useState("");
  const [comboSexoId, setcomboSexoId] = useState();
  //DATOS DE EXHUMACION
  const [coordenadasExhumacion, setcoordenadasExhumacion] = useState();
  const [exhumacionAldea, setexhumacionAldea] = useState();
  const [exhumacionDeptoId, setexhumacionDeptoId] = useState("");
  const [exhumacionMuniId, setexhumacionMuniId] = useState("");
  const [fechaExhumacion, setfechaExhumacion] = useState("");
  const handleCloseEdit = (e) => {
    e.preventDefault();
    oncerrarModal(false);
  };

  const createOsamenta = async () => {
    try {
      var data = {
        casoId: casoId,
        fosaDet: fosaDet,
        osamentaDet: osamentaDet,
        sexoAdnId: sexoadnid === "" ? null : sexoadnid,
        locisAlelosUtiles: locisAlelosUtiles,
        fechaIngresoLab: !(fechaIngresoLab === "")
          ? moment(fechaIngresoLab).format("YYYY-MM-DD")
          : null,
        fechaIngresoMFiSys: !(fechaIngresoMFiSys === "")
          ? moment(fechaIngresoMFiSys).format("YYYY-MM-DD")
          : null,

        exhumacionAldea: exhumacionAldea,
        exhumacionMuniId: exhumacionMuniId === "" ? null : exhumacionMuniId,
        exhumacionDeptoId: exhumacionDeptoId === "" ? null : exhumacionDeptoId,
        fechaExhumacion: !(fechaExhumacion === "")
          ? moment(fechaExhumacion).format("YYYY-MM-DD")
          : null,
        coordenadasExhumacion: coordenadasExhumacion,
        estadoId: 1,
        usuarioIngresoId: user.usuarioId,
      };
      const res = await axios.post(
        `${config.urlApi}/osamenta`,
        data,
        configReq
      );
      if (res.status === 202) {
        mensajeAlerta(
          "Creacion Osamenta",
          `Se ha creado la osamenta correctamente`,
          "success"
        );
        onAddDone(true);
      }
    } catch (error) {
      if (error.response.status === 500) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Creacion osamenta",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion osamenta",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Creacion osamenta",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);

    if (catalogo == "sexoAdn") setcomboSexoId(result.data);

    if (catalogo === "departamento") {
      setcomboDepto(result.data);
    }
    if (catalogo === "municipio") {
      setcomboMunicipio(result.data);
    }
  };

  useEffect(() => {
    fetchCatalogo("departamento");
    fetchCatalogo("municipio");
    fetchCatalogo("sexoAdn");
    return () => {};
  }, []);



  const handleAdd = (e) => {
    e.preventDefault();
    createOsamenta();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleAdd}
                setFocusOnError={true}
                defaultErrorMessage={{
                  required: "El campo es requerido.",
                  minLength: "Ingresar por lo menos {minLength} caracteres",
                }}
              >
                <Row>
                  <Col className="borderRadSolid">
                    <h5>Datos</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Caso FAFG</Form.Label>
                      <TextInput
                        type="number"
                        id="casoId"
                        name="casoId"
                        placeholder="Ingresar caso"
                        required
                        validator={(value) =>
                          value && value > 0 ? true : false
                        }
                        errorMessage={{
                          required: "Ingrese valor numerico.",
                          validator: "Ingrese un numero mayor a 0.",
                        }}
                        value={casoId}
                        onChange={(e) => setcasoId(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Fosa</Form.Label>
                      <TextInput
                        type="text"
                        id="fosaDet"
                        name="fosaDet"
                        placeholder="Fosa"
                        required
                        value={fosaDet}
                        onChange={(e) => setfosaDet(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Osamenta</Form.Label>
                      <TextInput
                        type="text"
                        id="eosamentaDet"
                        name="eosamentaDet"
                        placeholder="Ingresar Osamenta"
                        required
                        value={osamentaDet}
                        onChange={(e) => setosamentaDet(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Locis Alelo Utiles</Form.Label>
                      <TextInput
                        type="text"
                        id="TlocisAlelosUtiles"
                        name="TlocisAlelosUtiles"
                        placeholder="Locis con Alelos utiles"
                        value={locisAlelosUtiles}
                        onChange={(e) => setlocisAlelosUtiles(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Fecha ingreso a laboratorio ADN</Form.Label>
                      <Datetime
                        id="fechaIngresoLab"
                        name="fechaIngresoLab"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Ingreso a laboratorio",
                        }}
                        value={fechaIngresoLab}
                        onChange={(e) => {
                          setfechaIngresoLab(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Fecha Ingreso M-FISys</Form.Label>

                      <Datetime
                        id="TfechaIngresoMFiSys"
                        name="TfechaIngresoMFiSys"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Ingreso M-FISys",
                        }}
                        value={fechaIngresoMFiSys}
                        onChange={(e) => {
                          setfechaIngresoMFiSys(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Sexo ADN</Form.Label>
                      <SelectGroup
                        name="gear"
                        id="gear"
                        value={!(sexoadnid === undefined) ? sexoadnid : ""}
                        onChange={(e) => {
                          setsexoadnid(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboSexoId === undefined)
                          ? comboSexoId.map((fbb) => (
                              <option key={fbb.sexoAdnId} value={fbb.sexoAdnId}>
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col xs="6"></Col>
                </Row>
                <Row>
                  <Col className="borderRadSolid">
                    <h5>Datos de exhumación</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Fecha</Form.Label>{" "}
                      <Datetime
                        id="fechaExhumacion"
                        name="fechaExhumacion"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha de exhumacion",
                        }}
                        value={fechaExhumacion}
                        onChange={(e) => {
                          setfechaExhumacion(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Coordenada</Form.Label>
                      <CoordinateInput
                        value={coordenadasExhumacion}
                        id="coordenadasExhumacion"
                        placeholder="Coordenadas de exhumacion"
                        onChange={(value, {unmaskedValue, dd, dms}) => {
          
                          setcoordenadasExhumacion(unmaskedValue);
                        }}
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Aldea</Form.Label>
                      <TextInput
                        type="text"
                        id="exhumacionAldea"
                        name="exhumacionAldea"
                        placeholder="Aldea del exhumacion"
                        value={exhumacionAldea}
                        onChange={(e) => {
                          setexhumacionAldea(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <SelectGroup
                        name="exhumacionDeptoId"
                        id="exhumacionDeptoId"
                        value={
                          !(exhumacionDeptoId === undefined)
                            ? exhumacionDeptoId
                            : ""
                        }
                        onChange={(e) => {
                          setexhumacionDeptoId(e.target.value);
                          setexhumacionMuniId("");
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboDepto === undefined)
                          ? comboDepto.map((fbb) => (
                              <option
                                key={fbb.departamentoId}
                                value={fbb.departamentoId}
                              >
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Municipio</Form.Label>
                      <SelectGroup
                        name="exhumacionMuniId"
                        id="exhumacionMuniId"
                        value={
                          !(exhumacionMuniId === undefined)
                            ? exhumacionMuniId
                            : ""
                        }
                        onChange={(e) => {
                          setexhumacionMuniId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboMunicipio === undefined)
                          ? comboMunicipio
                              .filter(
                                (filt) =>
                                  filt.departamentoId == exhumacionDeptoId
                              )
                              .map((fbb) => (
                                <option
                                  key={fbb.municipioId}
                                  value={fbb.municipioId}
                                >
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
                      name="btnSaveEditPerson"
                      type="submit"
                      variant="outline-primary"
                      size="md"
                    >
                      <i className="feather icon-save" />
                      Guardar
                    </Button>

                    <Button
                      key="btnCancelEditPerson"
                      name="btnCancelEditPerson"
                      onClick={handleCloseEdit}
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

export default OsamentaAdd;
