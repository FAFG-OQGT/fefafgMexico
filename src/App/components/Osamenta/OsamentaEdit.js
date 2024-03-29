import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button, InputGroup} from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import Datetime from "react-datetime";
import {apiCatalogo} from "../../../utils/fetchCatalogos";
import "./OsamentaEdit.css";
import {renderInputFecha, validDate} from "../Utils/fechas";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
function OsamentaEdit({
  osamenta,
  onEditDone,
  oncerrarModal,
  mensajeAlerta,
  osamentaIdUpdate,
  actualizar = false,
}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  }; //DEFINICION DE ESTADOS
  const [comboDepto, setcomboDepto] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();
  //DEFINICION DE ESTADOS
  const [osamentaId, setosamentaId] = useState();
  const [sexoadnid, setsexoadnid] = useState();
  const [casoId, setcasoId] = useState();
  const [fosaDet, setfosaDet] = useState();
  const [osamentaDet, setosamentaDet] = useState();
  const [locisAlelosUtiles, setlocisAlelosUtiles] = useState();

  const [fechaIngresoLab, setfechaIngresoLab] = useState();
  const [fechaIngresoMFiSys, setfechaIngresoMFiSys] = useState();

  const [estadoId, setestadoId] = useState();
  const [comboSexoId, setcomboSexoId] = useState();

  //DATOS DE EXHUMACION
  const [coordenadasExhumacion, setcoordenadasExhumacion] = useState();
  const [exhumacionAldea, setexhumacionAldea] = useState();
  const [exhumacionDeptoId, setexhumacionDeptoId] = useState();
  const [exhumacionMuniId, setexhumacionMuniId] = useState();

  const [fechaExhumacion, setfechaExhumacion] = useState();

  const fetch = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/osamenta/${osamentaIdUpdate}`,
        configReq
      );
      let dataT = res.data.data;

      setosamentaId(dataT.osamentaId);
      setsexoadnid(dataT.sexoAdnId === null ? "" : dataT.sexoAdnId);
      setcasoId(dataT.casoId);
      setfosaDet(dataT.fosaDet);
      setosamentaDet(dataT.osamentaDet);
      setlocisAlelosUtiles(dataT.locisAlelosUtiles);

      setfechaIngresoLab(
        dataT.fechaIngresoLab === null
          ? ""
          : moment(dataT.fechaIngresoLab).utc()
      );
      setfechaIngresoMFiSys(
        dataT.fechaIngresoMFiSys === null
          ? ""
          : moment(dataT.fechaIngresoMFiSys).utc()
      );

      setestadoId(dataT.estadoId);
      //DATOS DE EXHUMACION
      setcoordenadasExhumacion(
        dataT.coordenadasExhumacion === null ? "" : dataT.coordenadasExhumacion
      );
      setexhumacionAldea(
        dataT.exhumacionAldea === null ? "" : dataT.exhumacionAldea
      );
      setexhumacionDeptoId(
        dataT.exhumacionDeptoId === null ? "" : dataT.exhumacionDeptoId
      );
      setexhumacionMuniId(
        dataT.exhumacionMuniId === null ? "" : dataT.exhumacionMuniId
      );

      setfechaExhumacion(
        dataT.fechaExhumacion === null
          ? ""
          : moment(dataT.fechaExhumacion).utc()
      );
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          console.log(`${dataError.codigo} - ${dataError.data}`);
        } else {
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } else {
        console.log(`${error.response.status} - ${error.response.statusText}`);
      }
    }
  };

  const handleCloseEdit = (e) => {
    e.preventDefault();
    oncerrarModal(false);
  };
  const update = async () => {
    try {
      var data = {
        osamentaId: osamentaId,
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
        estadoId: estadoId,
      };
      const res = await axios.put(
        `${config.urlApi}/osamenta/${data.osamentaId}`,
        data,
        configReq
      );

      if (res.status === 201) {
        mensajeAlerta(
          "Actualizacion Osamenta",
          "Se ha actualizado la osamenta con id [" + data.osamentaId + "]",
          "success"
        );
        onEditDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          mensajeAlerta(
            "Actualizacion Osamenta",
            `Se ha actualizado la osamenta :[${data.personaId}]`,

            "error"
          );
        } else {
          mensajeAlerta(
            "Actualizacion osamenta",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Actualizacion osamenta",
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
    fetch();
    fetchCatalogo("sexoAdn");
    fetchCatalogo("departamento");
    fetchCatalogo("municipio");
    return () => {};
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    update();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleEdit}
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
                      <Form.Label>Caso CRIH</Form.Label>
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
                        id="TosamentaDet"
                        name="TosamentaDet"
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
                        name="sexoadnid"
                        id="sexoadnid"
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
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
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
                      <TextInput
                        type="text"
                        id="coordenadasExhumacion"
                        name="coordenadasExhumacion"
                        placeholder="Coordenadas"
                        value={coordenadasExhumacion}
                        onChange={(e) => {
                          setcoordenadasExhumacion(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Lugar</Form.Label>
                      <TextInput
                        type="text"
                        id="exhumacionAldea"
                        name="exhumacionAldea"
                        placeholder="Lugar de exhumacion"
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
                    {actualizar === true && (
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
                    )}

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

export default OsamentaEdit;
