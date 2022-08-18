import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Collapse} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import {apiFetchVictimas} from "../../../utils/fetchCatalogos";

import "./VictimaDetalle.css";

function VictimaDetalle(props) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };

  const [comboVictima, setcomboVictima] = useState({});
  const [victimaIndex, setvictimaIndex] = useState(-1);

  //collapse
  const [collapseVD1, setcollapseVD1] = useState(false);
  const [collapseVD2, setcollapseVD2] = useState(false);

  //GENERALES
  const [victimaId, setvictimaId] = useState(props.victimaId);
  const [nombreVictima, setnombreVictima] = useState("");
  const [noDocumento, setnoDocumento] = useState("");
  const [tipoDocumento, settipoDocumento] = useState("");
  const [estado, setestado] = useState("");

  const [residenciaAldea, setresidenciaAldea] = useState("");
  const [residenciaDepto, setresidenciaDepto] = useState("");
  const [residenciaMuni, setresidenciaMuni] = useState("");

  //DATOS DEL HECHO
  const [diaHecho, setdiaHecho] = useState(0);
  const [mesHecho, setmesHecho] = useState(0);
  const [anioHecho, setanioHecho] = useState(0);
  const [lugarHechoAldea, setlugarHechoAldea] = useState("");
  const [lugarHechoDepto, setlugarHechoDepto] = useState("");
  const [lugarHechoMuni, setlugarHechoMuni] = useState("");

  const fetch = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/victima/${victimaId}`,
        configReq
      );
      let dataT = res.data.data;
      setnombreVictima(dataT.nombreVictima);
      setresidenciaAldea(dataT.residenciaAldea);
      setresidenciaMuni(
        dataT.MuniResidencia === null ? "" : dataT.MuniResidencia.descripcion
      );

      setresidenciaDepto(
        dataT.DeptoResidencia === null ? "" : dataT.DeptoResidencia.descripcion
      );
      setdiaHecho(dataT.diaHecho);
      setmesHecho(dataT.mesHecho);
      setanioHecho(dataT.anioHecho);
      setlugarHechoAldea(dataT.lugarHechoAldea);
      setlugarHechoMuni(
        dataT.lugarHechoMuniId === null ? "" : dataT.MuniLugarHecho.descripcion
      );
      setlugarHechoDepto(
        dataT.lugarHechoDeptoId === null ? "" : dataT.DeptoLugarHecho.descripcion
      );

      setnoDocumento(dataT.noDocumento === null ? "" : dataT.noDocumento);
      settipoDocumento(
        dataT.TipoDocumento === null ? "" : dataT.TipoDocumento.descripcion
      );
      setestado(dataT.Estado.descripcion);
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

  const fetchVictima = async () => {
    const res = await apiFetchVictimas(user.token);
    setcomboVictima(res);
  };
  useEffect(() => {
    fetch();
    fetchVictima();

    return () => {};
  }, []);

  useEffect(() => {
    if (!(comboVictima.length === undefined)) {
      if (comboVictima.length > 0) {
        var index = comboVictima.findIndex((c) => c.value === victimaId);
        setvictimaIndex(index);
      }
    }

    return () => {};
  }, [comboVictima]);
  const onChangeVictima = (selected) => {
    props.changeVictimaId(selected.value);
    setvictimaId(selected.value);
    if (!(comboVictima.length === undefined)) {
      if (comboVictima.length > 0) {
        var index = comboVictima.findIndex((c) => c.value === selected.value);
        setvictimaIndex(index);
        setnombreVictima(selected.data.nombreVictima);
        setresidenciaAldea(selected.data.residenciaAldea);
        setresidenciaMuni(selected.data.MuniResidencia.descripcion);
        setresidenciaDepto(selected.data.DeptoResidencia.descripcion);
        setdiaHecho(selected.data.diaHecho);
        setmesHecho(selected.data.mesHecho);
        setanioHecho(selected.data.anioHecho);
        setlugarHechoAldea(selected.data.lugarHechoAldea);
        setlugarHechoMuni(selected.data.MuniLugarHecho.descripcion);
        setlugarHechoDepto(selected.data.DeptoLugarHecho.descripcion);

        setnoDocumento(selected.data.noDocumento);
        settipoDocumento(selected.data.TipoDocumento.descripcion);
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
                <Col>
                  <Form.Group>
                    <Form.Label>Codigo</Form.Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      value={comboVictima[victimaIndex]}
                      name="VDvictimaId2"
                      required
                      placeholder="Seleccionar Victima"
                      options={comboVictima}
                      onChange={onChangeVictima}
                      isDisabled={props.isDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      id="VDnombreVictima"
                      name="VDnombreVictima"
                      value={nombreVictima}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col>
                  <Form.Group>
                    <Form.Label>Tipo documento</Form.Label>
                    <Form.Control
                      name="VDtipoDocumentoId"
                      id="VDtipoDocumentoId"
                      readOnly
                      value={tipoDocumento}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Documento</Form.Label>
                    <Form.Control
                      type="text"
                      id="VDnoDocumento"
                      name="VDnoDocumento"
                      value={noDocumento}
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
                      name="VDestado"
                      value={estado}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group>
                    <Form.Label>Lugar</Form.Label>
                    <Form.Control
                      type="text"
                      id="VDresidenciaAldea"
                      name="VDresidenciaAldea"
                      value={residenciaAldea}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      name="VDresidenciaDepto"
                      id="VDresidenciaDepto"
                      readOnly
                      value={residenciaDepto}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group>
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                      name="VDresidenciaMuniId"
                      id="VDresidenciaMuniId"
                      readOnly
                      value={residenciaMuni}
                    />
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
          <h6>Datos del hecho</h6>
        </Col>
      </Row>
      <Row>
        <Collapse in={collapseVD2}>
          <div id="basic-collapse" className="col-12">
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Dia</Form.Label>
                    <Form.Control
                      type="number"
                      id="VDdiaHecho"
                      name="VDdiaHecho"
                      className="form-control text-center"
                      value={diaHecho}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Mes</Form.Label>
                    <Form.Control
                      type="number"
                      id="VDmesHecho"
                      name="VDmesHecho"
                      className="form-control text-center"
                      value={mesHecho}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Control
                      type="number"
                      id="VDanioHecho"
                      name="VDanioHecho"
                      value={anioHecho}
                      className="form-control text-center"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Lugar</Form.Label>
                    <Form.Control
                      type="text"
                      id="VDlugarHechoAldea"
                      name="VDlugarHechoAldea"
                      readOnly
                      value={lugarHechoAldea}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      name="VDlugarHechoDeptoId"
                      id="VDlugarHechoDeptoId"
                      readOnly
                      value={lugarHechoDepto}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                      name="VDlugarHechoMuniId"
                      id="VDlugarHechoMuniId"
                      readOnly
                      value={lugarHechoMuni}
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

export default VictimaDetalle;
