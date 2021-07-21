import React, { useState, useEffect, useContext } from "react";

//Controles bootstrap
import {
  Row,
  Col,
  Button,
  Form,
  Collapse,
  Card,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import config from "../../../../config";

import OsamentaSelect from "../../Osamenta/OsamentaSelect";
import VictimaSelect from "../../Victima/VictimaSelect";
import ArchivosAdd from "../../Identificados/osteologico/Archivos/ArchivosAdd";
import ArchivosList from "../../Identificados/osteologico/Archivos/ArchivosList";
import VictimaDetalle from "../../Victima/VictimaDetalle"
import OsamentaDetalle from "../../Osamenta/OsamentaDetalle"


import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
import Datetime from "react-datetime";
//context
import userContext from "../../../../context/userContext";
//plugins
import moment from "moment";
import { renderInputFecha, validDate } from "../../Utils/fechas";

import "./IdentificadosEditOsteologico.css";

import { apiCatalogo } from "../../../../utils/fetchCatalogos";
import MensajeAlerta from "../../MensajeAlerta/MensajeAlerta";

function IdentificadosEditOsteologico(props) {
  const [data] = useState(props.data ? props.data : null);

  useEffect(() => {
    return () => { };
  }, [data]);

  const userI = useContext(userContext);
  const configReq = {
    headers: { Authorization: `Bearer ${userI.token}` },
  };

  //collapse
  const [collapseCC1, setcollapseCC1] = useState(true);
  const [collapseCC2, setcollapseCC2] = useState(false);
  const [collapseCC3, setcollapseCC3] = useState(false);
  const [collapseCC5, setcollapseCC5] = useState(false);
  const [collapseCC6, setcollapseCC6] = useState(false);
  const [collapseCC10, setcollapseCC10] = useState(false);

  const [collapseCC1Alert, setcollapseCC1Alert] = useState(false);
  const [collapseCC2Alert, setcollapseCC2Alert] = useState(false);
  const [collapseCC3Alert, setcollapseCC3Alert] = useState(false);
  const [collapseCC5Alert, setcollapseCC5Alert] = useState(false);
  const [collapseCC6Alert, setcollapseCC6Alert] = useState(false);

  const [editOsamenta, seteditOsamenta] = useState(false);
  const [editVictima, seteditVictima] = useState(false);

  //CLINCIDENCIAS STATES
  const [resetListFiles, setresetListFiles] = useState(false);
  const setResetListFiles = (value) => {
    setresetListFiles(value);
  };

  //DATOS GENERALES
  const [identificadoOstId] = useState(data.identificadoOstId);

  const [sesionIdentificacion, setsesionIdentificacion] = useState(
    data.sesionIdentificacion
  );
  const [tipoCasoDidId, settipoCasoDidId] = useState(data.tipoCasoDidId);
  const [combotipoCasoDid, setcombotipoCasoDid] = useState();
  const [sexoId, setsexoId] = useState(data.sexoId);
  const [combosexo, setcombosexo] = useState();
  const [grupoEtarioId, setgrupoEtarioId] = useState(data.grupoEtarioId);
  const [combogrupoEtario, setcombogrupoEtario] = useState();
  const [grupoEtnolinguisticoId, setgrupoEtnolinguisticoId] = useState(
    data.grupoEtnolinguisticoId
  );
  const [combogrupoEtnolinguistico, setcombogrupoEtnolinguistico] = useState();
  //OSAMENTA
  const [osamentaId, setosamentaId] = useState(data.osamentaId);
  const [osamentaDescripcion, setosamentaDescripcion] = useState(
    `CRIH-${data.Osamenta.casoId}-${data.Osamenta.fosaDet}-${data.Osamenta.osamentaDet}`
  );
  //VICTIMA
  const [victimaId, setvictimaId] = useState(data.victimaId);
  const [victimaDescripcion, setvictimaDescripcion] = useState(
    `${data.Victima.codigoVictima}-${data.Victima.nombreVictima}`
  );

  //FECHAS

  const [fechaInfoFamilia, setfechaInfoFamilia] = useState(
    data.fechaInfoFamilia === null ? "" : moment(data.fechaInfoFamilia).utc()
  );
  const [fechaInhumacion, setfechaInhumacion] = useState(
    data.fechaInhumacion === null ? "" : moment(data.fechaInhumacion).utc()
  );

  const [fechaConfirmacion, setfechaConfirmacion] = useState(
    data.fechaConfirmacion === null ? "" : moment(data.fechaConfirmacion).utc()
  );
  const [fechaDictamen, setfechaDictamen] = useState(
    data.fechaDictamen === null ? "" : moment(data.fechaDictamen).utc()
  );

  //datos 1
  const [desaparicionDeptoId, setdesaparicionDeptoId] = useState(
    data.desaparicionDeptoId
  );
  const [desaparicionMuniId, setdesaparicionMuniId] = useState(
    data.desaparicionMuniId
  );
  const [desaparicionAldea, setdesaparicionAldea] = useState(
    data.desaparicionAldea
  );
  const [desaparicionDia, setdesaparicionDia] = useState(data.desaparicionDia);
  const [desaparicionMes, setdesaparicionMes] = useState(data.desaparicionMes);
  const [desaparicionAnio, setdesaparicionAnio] = useState(
    data.desaparicionAnio
  );
  const [resumenHecho, setresumenHecho] = useState(data.resumenHecho);

  const [comboDepartamento, setcomboDepartamento] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();

  const handleCambioCaso = (e, formData, inputs) => {
    e.preventDefault();
    let banderaOsaVic = 0;
    if (osamentaId === 0) {
      setcollapseCC2Alert(true);
      setcollapseCC2(true);
      banderaOsaVic = banderaOsaVic + 1;
    } else {
      setcollapseCC2Alert(false);
      setcollapseCC2(false);
    }

    if (victimaId === 0) {
      banderaOsaVic = banderaOsaVic + 1;
      setcollapseCC3Alert(true);
      setcollapseCC3(true);
    } else {
      setcollapseCC3Alert(false);
      setcollapseCC3(false);
    }

    if (banderaOsaVic === 0) {
      setcollapseCC1Alert(false);
      setcollapseCC2Alert(false);
      setcollapseCC3Alert(false);
      setcollapseCC5Alert(false);
      setcollapseCC6Alert(false);
      update();
    }
  };
  const update = async () => {
    try {
      var data = {
        identificadoOstId: identificadoOstId,
        osamentaId: osamentaId,
        victimaId: victimaId,
        sexoId: sexoId,
        grupoEtarioId: grupoEtarioId,
        grupoEtnolinguisticoId: grupoEtnolinguisticoId,
        sesionIdentificacion: sesionIdentificacion,
        tipoCasoDidId: tipoCasoDidId,
        fechaInfoFamilia: !(fechaInfoFamilia === "")
          ? moment(fechaInfoFamilia).format("YYYY-MM-DD")
          : null,

        fechaInhumacion: !(fechaInhumacion === "")
          ? moment(fechaInhumacion).format("YYYY-MM-DD")
          : null,
        fechaConfirmacion: !(fechaConfirmacion === "")
          ? moment(fechaConfirmacion).format("YYYY-MM-DD")
          : null,

        fechaDictamen: !(fechaDictamen === "")
          ? moment(fechaDictamen).format("YYYY-MM-DD")
          : null,

        desaparicionAldea: desaparicionAldea,
        desaparicionMuniId: desaparicionMuniId,
        desaparicionDeptoId: desaparicionDeptoId,
        desaparicionDia: desaparicionDia,
        desaparicionMes: desaparicionMes,
        desaparicionAnio: desaparicionAnio,
        resumenHecho: resumenHecho,
        estadoId: 1,
        usuarioIngresoId: userI.usuarioId,
      };

      const res = await axios.put(
        `${config.urlApi}/IdentificadoOst/${identificadoOstId}`,
        data,
        configReq
      );
      if (res.status === 201) {
        MensajeAlerta(
          "Actualizacion de identificado",
          "Se ha actualizado el identificado [" + data.identificadoOstId + "]",
          "success"
        );
        props.onEditDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          MensajeAlerta(
            "Edicion de identificado",
            dataError,

            "error"
          );
        } else {
          MensajeAlerta(
            "Edicion de identificado",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        MensajeAlerta(
          "Edicion de identificado",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const handleErrorSubmit = (e, formData, errorInputs) => {
    var listControls1 = ["fechaCoincidencia"];
    var errorControls1 = Object.keys(errorInputs).filter((key) =>
      listControls1.includes(key)
    );
    if (errorControls1.length > 0) {
      setcollapseCC1Alert(true);
      setcollapseCC1(true);
    } else {
      setcollapseCC1Alert(false);
    }

    var listControls5 = ["lri", "apriori", "posterior"];
    var errorControls5 = Object.keys(errorInputs).filter((key) =>
      listControls5.includes(key)
    );
    if (errorControls5.length > 0) {
      setcollapseCC5Alert(true);
      setcollapseCC5(true);
    } else {
      setcollapseCC5Alert(false);
    }

    var listControls6 = [
      "baseInfoId",
      "programaIdentId",
      "estadoCoincidenciaId",
      "cromosomaYId",
      "estadoInvestigacionId",
      "desaparicionDia",
      "desaparicionMes",
      "desaparicionAnio",
    ];
    var errorControls6 = Object.keys(errorInputs).filter((key) =>
      listControls6.includes(key)
    );
    if (errorControls6.length > 0) {
      setcollapseCC6Alert(true);
      setcollapseCC6(true);
    } else {
      setcollapseCC6Alert(false);
    }

    if (osamentaId === 0) {
      setcollapseCC2Alert(true);
      setcollapseCC2(true);
    } else {
      setcollapseCC2Alert(false);
      setcollapseCC2(false);
    }

    if (victimaId === 0) {
      setcollapseCC3Alert(true);
      setcollapseCC3(true);
    } else {
      setcollapseCC3Alert(false);
      setcollapseCC3(false);
    }
  };

  const onSelectOsamenta = (osamenta_elemento) => {
    setosamentaDescripcion(
      `CRIH-${osamenta_elemento.casoId}-${osamenta_elemento.fosaDet}-${osamenta_elemento.osamentaId}`
    );
    setosamentaId(osamenta_elemento.osamentaId);
  };

  const onSelectVictima = (victima_elemento) => {
    setvictimaDescripcion(
      `${victima_elemento.codigoVictima}-${victima_elemento.nombreVictima}`
    );
    setvictimaId(victima_elemento.victimaId);
  };


  const [permisoAgregar, setpermisoAgregar] = useState(false);
  useEffect(() => {
    if (userI.usuarioId < 9) {
      setpermisoAgregar(true)
    }
    fetchCatalogo("departamento");
    fetchCatalogo("municipio");
    fetchCatalogo("tipoCasoDid");
    fetchCatalogo("valorEdad");
    fetchCatalogo("grupoEtnolinguistico");
    fetchCatalogo("sexoAdn");
    fetchCatalogo("grupoEtario");
    fetchCatalogo("traumaCirc");
    fetchCatalogo("regionAnatomica");
    fetchCatalogo("causaMuerte");
    fetchCatalogo("datosOdont");
    return () => { };
  }, []);

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo === "tipoCasoDid") setcombotipoCasoDid(result.data);
    if (catalogo === "departamento") setcomboDepartamento(result.data);
    if (catalogo === "municipio") setcomboMunicipio(result.data);

    if (catalogo === "grupoEtnolinguistico")
      setcombogrupoEtnolinguistico(result.data);
    if (catalogo === "sexoAdn") setcombosexo(result.data);

    if (catalogo === "grupoEtario") setcombogrupoEtario(result.data);
  };

  const validaAnio = (value) => {
    if (value.length === 4) {
      if (parseInt(value) > 1500 && parseInt(value) < 2060) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const validaMes = (value) => {
    if (value.length >= 1 || value.length <= 2) {
      if (parseInt(value) >= 1 && parseInt(value) <= 12) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const validaDia = (value) => {
    if (value.length >= 1 || value.length <= 2) {
      if (parseInt(value) >= 1 && parseInt(value) <= 31) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <Col>
      <br></br>
      <ValidationForm
        onSubmit={handleCambioCaso}
        setFocusOnError
        onErrorSubmit={handleErrorSubmit}
        defaultErrorMessage={{
          required: "El campo es requerido.",
          minLength: "Ingresar por lo menos {minLength} caracteres",
        }}
      >
        <Row>
          <Col
            className={
              collapseCC1Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC1(!collapseCC1);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC1}
          >
            <h5>Datos Generales</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC1}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row className="">
                  <Col sm></Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Sesión de identificaciones</Form.Label>
                      <TextInput
                        name="sesionIdentificacion"
                        id="sesionIdentificacion"
                        placeholder="Sesión de identificacion"
                        type="text"
                        className="form-control text-center"
                        value={sesionIdentificacion}
                        onChange={(e) =>
                          setsesionIdentificacion(e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Tipo Caso</Form.Label>
                      <SelectGroup
                        name="tipoCasoDidId"
                        id="tipoCasoDidId"
                        required
                        value={
                          !(tipoCasoDidId === undefined) ? tipoCasoDidId : ""
                        }
                        onChange={(e) => {
                          settipoCasoDidId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combotipoCasoDid === undefined)
                          ? combotipoCasoDid.map((fbb) => (
                            <option
                              key={fbb.tipoCasoDidId}
                              value={fbb.tipoCasoDidId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Sexo</Form.Label>
                      <SelectGroup
                        name="sexoId"
                        id="sexoId"
                        value={!(sexoId === undefined) ? sexoId : ""}
                        onChange={(e) => {
                          setsexoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combosexo === undefined)
                          ? combosexo.map((fbb) => (
                            <option key={fbb.sexoAdnId} value={fbb.sexoAdnId}>
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Grupo Etario</Form.Label>
                      <SelectGroup
                        name="grupoEtarioId"
                        id="grupoEtarioId"
                        required
                        value={
                          !(grupoEtarioId === undefined) ? grupoEtarioId : ""
                        }
                        onChange={(e) => {
                          setgrupoEtarioId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combogrupoEtario === undefined)
                          ? combogrupoEtario.map((fbb) => (
                            <option
                              key={fbb.grupoEtarioId}
                              value={fbb.grupoEtarioId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Grupo Etnolinguistico</Form.Label>
                      <SelectGroup
                        name="grupoEtnolinguisticoId"
                        id="grupoEtnolinguisticoId"
                        value={
                          !(grupoEtnolinguisticoId === undefined)
                            ? grupoEtnolinguisticoId
                            : ""
                        }
                        onChange={(e) => {
                          setgrupoEtnolinguisticoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combogrupoEtnolinguistico === undefined)
                          ? combogrupoEtnolinguistico.map((fbb) => (
                            <option
                              key={fbb.grupoEtnolinguisticoId}
                              value={fbb.grupoEtnolinguisticoId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Collapse>
        </Row>
        <Row>
          <Col
            className={
              collapseCC2Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC2(!collapseCC2);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC2}
          >
            <h5>Osamenta</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC2}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row>
                  <Col className="font-weight-bold">
                    Osamenta seleccionada: {osamentaDescripcion}{" "}
                    <Button
                      type="button"
                      className="btn-icon"
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        seteditOsamenta(!editOsamenta);
                      }}
                    >
                      <i className="feather icon-edit" />{" "}
                    </Button>
                  </Col>
                </Row>
                {editOsamenta === true && (
                  <Row className="animated fadeIn">
                    <OsamentaSelect
                      onSelectOsamenta={onSelectOsamenta}
                    ></OsamentaSelect>
                  </Row>
                )}


                {osamentaId && (
                  <OsamentaDetalle
                    osamentaId={osamentaId}
                    isDisabled={true}
                  ></OsamentaDetalle>
                )}
              </Card.Body>
            </div>
          </Collapse>
        </Row>
        <Row>
          <Col
            className={
              collapseCC3Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC3(!collapseCC3);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC3}
          >
            <h5>Victima</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC3}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row>
                  <Col className="font-weight-bold">
                    Victima seleccionada: {victimaDescripcion}{" "}
                    <Button
                      type="button"
                      className="btn-icon"
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        seteditVictima(!editVictima);
                      }}
                    >
                      <i className="feather icon-edit" />{" "}
                    </Button>
                  </Col>
                </Row>
                {editVictima === true && (
                  <Row className="animated fadeIn">
                    <VictimaSelect
                      onSelectVictima={onSelectVictima}
                    ></VictimaSelect>
                  </Row>
                )}


                {victimaId && (
                  <VictimaDetalle
                    victimaId={victimaId}
                    isDisabled={true}
                  ></VictimaDetalle>
                )}
              </Card.Body>
            </div>
          </Collapse>
        </Row>

        <Row>
          <Col
            className={
              collapseCC5Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC5(!collapseCC5);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC5}
          >
            <h5>Fechas</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC5}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Dictamen</Form.Label>
                      <Datetime
                        id="fechaDictamen"
                        name="fechaDictamen"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Dictamen ",
                        }}
                        value={fechaDictamen}
                        onChange={(e) => {
                          setfechaDictamen(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha fam. Informados</Form.Label>
                      <Datetime
                        id="fechaInfoFamilia"
                        name="fechaInfoFamilia"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Fam. Informados ",
                        }}
                        value={fechaInfoFamilia}
                        onChange={(e) => {
                          setfechaInfoFamilia(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Inhumación</Form.Label>

                      <Datetime
                        id="fechaInhumacion"
                        name="fechaInhumacion"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha inhumación ",
                        }}
                        value={fechaInhumacion}
                        onChange={(e) => {
                          setfechaInhumacion(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Confirmacion</Form.Label>
                      <Datetime
                        id="fechaConfirmacion"
                        name="fechaConfirmacion"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Analisis Osteologico ",
                        }}
                        value={fechaConfirmacion}
                        onChange={(e) => {
                          setfechaConfirmacion(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
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
            className={
              collapseCC6Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC6(!collapseCC6);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC6}
          >
            <h5>Datos</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC6}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row>
                  <Col sm>
                    <h6>Desaparicion|Lugar del evento</h6>
                    <hr></hr>
                  </Col>
                </Row>

                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <SelectGroup
                        name="desaparicionDeptoId"
                        id="desaparicionDeptoId"
                        required
                        value={
                          !(desaparicionDeptoId === undefined)
                            ? desaparicionDeptoId
                            : ""
                        }
                        onChange={(e) => {
                          setdesaparicionDeptoId(e.target.value);
                          setdesaparicionMuniId("");
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboDepartamento === undefined)
                          ? comboDepartamento.map((fbb) => (
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

                  <Col sm>
                    <Form.Group>
                      <Form.Label>Municipio</Form.Label>
                      <SelectGroup
                        name="residenciaMuniId"
                        id="residenciaMuniId"
                        required
                        value={
                          !(desaparicionMuniId === undefined)
                            ? desaparicionMuniId
                            : ""
                        }
                        onChange={(e) => {
                          setdesaparicionMuniId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboMunicipio === undefined)
                          ? comboMunicipio
                            .filter(
                              (filt) =>
                                filt.departamentoId == desaparicionDeptoId
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
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Aldea</Form.Label>
                      <TextInput
                        name="desaparicionAldea"
                        id="desaparicionAldea"
                        placeholder="Aldea"
                        type="text"
                        required
                        className="form-control text-center"
                        value={desaparicionAldea}
                        onChange={(e) => setdesaparicionAldea(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Dia</Form.Label>
                      <TextInput
                        name="desaparicionDia"
                        id="desaparicionDia"
                        type="number"
                        required
                        className="form-control text-center"
                        validator={validaDia}
                        errorMessage={{ validator: "Ingrese dia correcto." }}
                        value={desaparicionDia}
                        onChange={(e) => setdesaparicionDia(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Mes</Form.Label>
                      <TextInput
                        name="desaparicionMes"
                        id="desaparicionMes"
                        type="number"
                        required
                        className="form-control text-center"
                        value={desaparicionMes}
                        validator={validaMes}
                        errorMessage={{ validator: "Ingrese mes correcto." }}
                        onChange={(e) => setdesaparicionMes(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Año</Form.Label>
                      <TextInput
                        name="desaparicionAnio"
                        id="desaparicionAnio"
                        type="number"
                        required
                        className="form-control text-center"
                        validator={validaAnio}
                        errorMessage={{ validator: "Ingrese año correcto(####)" }}
                        value={desaparicionAnio}
                        onChange={(e) => setdesaparicionAnio(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Resumen del Hecho</Form.Label>
                      <TextInput
                        name="resumenHecho"
                        id="resumenHecho"
                        placeholder="Resumen del Hecho"
                        type="text"
                        className="form-control text-center"
                        value={resumenHecho}
                        onChange={(e) => setresumenHecho(e.target.value)}
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
            className={"borderRadSolid btn"}
            onClick={(e) => {
              setcollapseCC10(!collapseCC10);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC10}
          >
            <h5>Documentos</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC10}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row>
                  <Col className="row-eq-height">
                    <ArchivosAdd
                      IdentificadoId={identificadoOstId}
                      mensajeAlerta={MensajeAlerta}
                      onAddDoneFile={setResetListFiles}
                    ></ArchivosAdd>
                  </Col>
                  <Col>
                    {identificadoOstId > 0 && (
                      <ArchivosList
                        IdentificadoId={identificadoOstId}
                        reset={resetListFiles}
                        setreset={setResetListFiles}
                        mensajeAlerta={MensajeAlerta}
                      ></ArchivosList>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Collapse>
        </Row>
        {permisoAgregar && (
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
            </Col>
          </Row>
        )}
      </ValidationForm>
    </Col>
  );
}

export default IdentificadosEditOsteologico;
