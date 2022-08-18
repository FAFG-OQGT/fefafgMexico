import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Collapse} from "react-bootstrap";
import moment from "moment";
import Select from "react-select";

import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import {apiFetchOsamentas} from "../../../utils/fetchCatalogos";
import "./OsamentaDetalle.css";

function OsamentaDetalle(props) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };

  const [comboOsamenta, setcomboOsamenta] = useState({});
  const [osamentaIndex, setosamentaIndex] = useState(-1);
  //DEFINICION DE ESTADOS
  const [osamentaId, setosamentaId] = useState(props.osamentaId);
  const [locisAlelosUtiles, setlocisAlelosUtiles] = useState("");
  const [fechaIngresoLab, setfechaIngresoLab] = useState("");
  const [fechaIngresoMFiSys, setfechaIngresoMFiSys] = useState("");
  const [estado, setestado] = useState("");
  const [sexoAdnDesc, setsexoAdnDesc] = useState("");
  //DATOS DE EXHUMACION
  const [coordenadasExhumacion, setcoordenadasExhumacion] = useState();
  const [exhumacionAldea, setexhumacionAldea] = useState();
  const [exhumacionDepto, setexhumacionDepto] = useState();
  const [exhumacionMuni, setexhumacionMuni] = useState();
  const [fechaExhumacion, setfechaExhumacion] = useState("");
  //collapse
  const [collapseVD1, setcollapseVD1] = useState(false);
  const [collapseVD2, setcollapseVD2] = useState(false);

  const fetch = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/osamenta/${osamentaId}`,
        configReq
      );
      let dataT = res.data.data;
      setlocisAlelosUtiles(dataT.locisAlelosUtiles);
      setfechaIngresoLab(
        dataT.fechaIngresoLab === null
          ? ""
          : moment(dataT.fechaIngresoLab).utc().format("DD/MM/YYYY")
      );

      setfechaIngresoMFiSys(dataT.fechaIngresoMFiSys === null ? "" : moment(dataT.fechaIngresoMFiSys).utc().format("DD/MM/YYYY"));
      setsexoAdnDesc(dataT.SexoAdn === null ? "" : dataT.SexoAdn.descripcion);

      setestado(dataT.Estado.descripcion);
      setcoordenadasExhumacion(
        dataT.coordenadasExhumacion === null ? "" : dataT.coordenadasExhumacion
      );
      setexhumacionAldea(
        dataT.exhumacionAldea === null ? "" : dataT.exhumacionAldea
      );
      setexhumacionMuni(
        dataT.exhumacionMuniId === null ? "" : dataT.MuniExhumacion.descripcion
      );
      setexhumacionDepto(
        dataT.exhumacionDeptoId === null ? "" : dataT.DeptoExhumacion.descripcion
      );

      setfechaExhumacion(
        dataT.fechaExhumacion === null
          ? ""
          : moment(dataT.fechaExhumacion).utc().format("DD/MM/YYYY")
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
  const fetchOsamenta = async () => {
    const res = await apiFetchOsamentas(user.token);
    setcomboOsamenta(res);
  };
  useEffect(() => {
    fetch();
    fetchOsamenta();
    return () => {};
  }, []);
  useEffect(() => {
    if (!(comboOsamenta.length === undefined)) {
      if (comboOsamenta.length > 0) {
        var index = comboOsamenta.findIndex((c) => c.value === osamentaId);
        setosamentaIndex(index);
      }
    }

    return () => {};
  }, [comboOsamenta]);

  const onChangeOsamenta = (selected) => {
    props.changeOsamentaId(selected.value);
    setosamentaId(selected.value);
    if (!(comboOsamenta.length === undefined)) {
      if (comboOsamenta.length > 0) {
        var index = comboOsamenta.findIndex((c) => c.value === selected.value);
        setosamentaIndex(index);
        setlocisAlelosUtiles(selected.data.locisAlelosUtiles);
        setfechaIngresoLab(moment(selected.data.fechaIngresoLab).utc());
        setfechaIngresoMFiSys(moment(selected.data.fechaIngresoMFiSys).utc());
        setsexoAdnDesc(selected.data.SexoAdn.descripcion);
        setestado(selected.data.Estado.descripcion);
      }
    }
  };
  return (
    <Col xs="12" sm="12">
      <Row>
        <Col
          className="bordeSeccion btn btnSeccion"
          onClick={(e) => {
            setcollapseVD1(!collapseVD1);
          }}
          aria-controls="basic-collapse"
          aria-expanded={collapseVD1}
        >
          <h6>Datos Generales</h6>
        </Col>
      </Row>
      <Row>
        <Collapse in={collapseVD1}>
          <div id="basic-collapse" className="col-12">
            <Card.Body>
              <Row>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Caso</Form.Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      value={comboOsamenta[osamentaIndex]}
                      name="osamentaId2"
                      required
                      placeholder="Seleccionar Victima"
                      options={comboOsamenta}
                      onChange={onChangeOsamenta}
                      isDisabled={props.isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Locis Alelo Utiles</Form.Label>
                    <Form.Control
                      type="text"
                      id="ODTlocisAlelosUtiles"
                      name="ODTlocisAlelosUtiles"
                      readOnly
                      value={locisAlelosUtiles}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Fecha laboratorio</Form.Label>
                    <Form.Control
                      id="ODTfechaIngresoLab"
                      name="ODTfechaIngresoLab"
                      readOnly
                      value={
                        fechaIngresoLab
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Fecha M-FISys</Form.Label>
                    <Form.Control
                      id="ODTfechaIngresoMFiSys"
                      name="ODTfechaIngresoMFiSys"
                      value={fechaIngresoMFiSys}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Sexo ADN</Form.Label>
                    <Form.Control
                      name="ODsexoadnid"
                      id="ODsexoadnid"
                      value={sexoAdnDesc}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col sm>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control name="ODestado" value={estado} readOnly />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </div>
        </Collapse>
      </Row>

      <Row>
        <Col
          className="bordeSeccion btn btnSeccion"
          onClick={(e) => {
            setcollapseVD2(!collapseVD2);
          }}
          aria-controls="basic-collapse"
          aria-expanded={collapseVD2}
        >
          <h6>Datos de exhumación</h6>
        </Col>
      </Row>
      <Row>
        <Collapse in={collapseVD2}>
          <div id="basic-collapse" className="col-12">
            <Card.Body>
              {" "}
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      id="ODfechaExhumacion"
                      name="ODfechaExhumacion"
                      readOnly
                      value={fechaExhumacion}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Coordenada</Form.Label>
                    <Form.Control
                      type="text"
                      id="ODcoordenadasExhumacion"
                      name="ODcoordenadasExhumacion"
                      placeholder="Coordenadas de exhumacion"
                      readOnly
                      value={coordenadasExhumacion}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Lugar</Form.Label>
                    <Form.Control
                      type="text"
                      id="ODexhumacionAldea"
                      name="ODexhumacionAldea"
                      placeholder="Lugar de exhumacion"
                      required
                      value={exhumacionAldea}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="text"
                      id="ODexhumacionDepto"
                      name="ODexhumacionDepto"
                      value={exhumacionDepto}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                      type="text"
                      id="ODexhumacionMuni"
                      name="ODexhumacionMuni"
                      placeholder=""
                      readOnly
                      value={exhumacionMuni}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </div>
        </Collapse>
      </Row>
    </Col>
  );
}

export default OsamentaDetalle;
