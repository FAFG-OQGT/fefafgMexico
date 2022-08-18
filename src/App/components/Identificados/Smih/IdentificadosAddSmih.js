import React, {useState, useEffect, useContext} from "react";

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

import "./IdentificadosAddSmih.css";

import {apiCatalogo} from "../../../../utils/fetchCatalogos";

function IdentificadosAddSmih(props) {
  const renderInput = (props, openCalendar, closeCalendar) => {
    function clear() {
      props.onChange({target: {value: ""}});
    }
    return (
      <div>
        <InputGroup>
          <Form.Control type="text" readOnly {...props} />
          <InputGroup.Append>
            <InputGroup.Text onClick={openCalendar} style={{cursor: "pointer"}}>
              <i className="fa fa-calendar text-primary" />
            </InputGroup.Text>
            <InputGroup.Text onClick={clear} style={{cursor: "pointer"}}>
              <i className="fa fa-times text-danger" />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  };

  const userI = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${userI.token}`},
  };

  //collapse
  const [collapseCC1, setcollapseCC1] = useState(true);
  const [collapseCC2, setcollapseCC2] = useState(false);
  const [collapseCC3, setcollapseCC3] = useState(false);
  const [collapseCC5, setcollapseCC5] = useState(false);
  const [collapseCC6, setcollapseCC6] = useState(false);
  const [collapseCC1Alert, setcollapseCC1Alert] = useState(false);
  const [collapseCC2Alert, setcollapseCC2Alert] = useState(false);
  const [collapseCC3Alert, setcollapseCC3Alert] = useState(false);
  const [collapseCC5Alert, setcollapseCC5Alert] = useState(false);
  const [collapseCC6Alert, setcollapseCC6Alert] = useState(false);

  //DATOS GENERALES
  const [casoIdentificado, setcasoIdentificado] = useState();
  const [sesionIdentificacion, setsesionIdentificacion] = useState();
  const [osamentaFosa, setosamentaFosa] = useState();
  const [tipoCasoDidId, settipoCasoDidId] = useState(0);
  const [combotipoCasoDid, setcombotipoCasoDid] = useState();
  const [sexoId, setsexoId] = useState(0);
  const [combosexo, setcombosexo] = useState();
  const [grupoEtarioId, setgrupoEtarioId] = useState(0);
  const [combogrupoEtario, setcombogrupoEtario] = useState();
  const [grupoEtnolinguisticoId, setgrupoEtnolinguisticoId] = useState(0);
  const [combogrupoEtnolinguistico, setcombogrupoEtnolinguistico] = useState();

  //OSAMENTA
  const [osamentaId, setosamentaId] = useState(0);
  const [osamentaDescripcion, setosamentaDescripcion] = useState("");
  //VICTIMA
  const [victimaId, setvictimaId] = useState(0);
  const [victimaDescripcion, setvictimaDescripcion] = useState("");
  //COINCIDENCIA
  const [coincidenciaId] = useState(null);

  //FECHAS

  const [fechaInfoFamilia, setfechaInfoFamilia] = useState();
  const [fechaReporteDid, setfechaReporteDid] = useState();
  const [fechaAnalisisOst, setfechaAnalisisOst] = useState();
  const [fechaInhumacion, setfechaInhumacion] = useState();

  const [fechaConfirmacion, setfechaConfirmacion] = useState();
  const [fechaReporteGenetica, setfechaReporteGenetica] = useState();
  const [fechaDictamen, setfechaDictamen] = useState();
  const [fechaEntrevistaAM, setfechaEntrevistaAM] = useState();
  //datos 1
  const [desaparicionDeptoId, setdesaparicionDeptoId] = useState();
  const [desaparicionMuniId, setdesaparicionMuniId] = useState();
  const [desaparicionAldea, setdesaparicionAldea] = useState();
  const [desaparicionDia, setdesaparicionDia] = useState();
  const [desaparicionMes, setdesaparicionMes] = useState();
  const [desaparicionAnio, setdesaparicionAnio] = useState();

  const [comboDepartamento, setcomboDepartamento] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();

  //antemortem
  const [edadAM, setedadAM] = useState();
  const [valorEdadAM, setvalorEdadAM] = useState();
  const [anotacionAM, setanotacionAM] = useState();

  //postmortem
  const [rangoMinimoPM, setrangoMinimoPM] = useState();
  const [rangoMaximoPM, setrangoMaximoPM] = useState();
  const [valorEdadPM, setvalorEdadPM] = useState();
  const [anotacionPM, setanotacionPM] = useState();

  //data extra
  const [traumaCirId, settraumaCirId] = useState();
  const [regionAnatomicaId, setregionAnatomicaId] = useState();
  const [causaMuerteId, setcausaMuerteId] = useState();

  const [datosOdontId, setdatosOdontId] = useState();
  const [anotacionDatosOdont, setanotacionDatosOdont] = useState();
  const [resumenHecho,setresumenHecho] = useState();
  const [observaciones,setobservaciones] = useState();

  const [combovalorEdad, setcombovalorEdad] = useState();
  const [combotraumaCir, setcombotraumaCir] = useState();
  const [comboregionAnatomicaId, setcomboregionAnatomicaId] = useState();
  const [combocausaMuerte, setcombocausaMuerte] = useState();
  const [combodatosOdont, setcombodatosOdont] = useState();

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
      create();
    }
  };
  const create = async () => {
    try {
      var data = {
        casoIdentificado: casoIdentificado,
        osamentaId: osamentaId,
        victimaId: victimaId,
        sexoId: sexoId,
        grupoEtarioId: grupoEtarioId,
        grupoEtnolinguisticoId: grupoEtnolinguisticoId,
        sesionIdentificacion: sesionIdentificacion,
        tipoCasoDidId: tipoCasoDidId,
        coincidenciaId: coincidenciaId,
        osamentaFosa: osamentaFosa,
        fechaInfoFamilia: !(fechaInfoFamilia === "")
          ? moment(fechaInfoFamilia).format("YYYY-MM-DD")
          : null,
        fechaReporteDid: !(fechaReporteDid === "")
          ? moment(fechaReporteDid).format("YYYY-MM-DD")
          : null,
        fechaAnalisisOst: !(fechaAnalisisOst === "")
          ? moment(fechaAnalisisOst).format("YYYY-MM-DD")
          : null,
        fechaInhumacion: !(fechaInhumacion === "")
          ? moment(fechaInhumacion).format("YYYY-MM-DD")
          : null,
        fechaConfirmacion: !(fechaConfirmacion === "")
          ? moment(fechaConfirmacion).format("YYYY-MM-DD")
          : null,
        fechaReporteGenetica: !(fechaReporteGenetica === "")
          ? moment(fechaReporteGenetica).format("YYYY-MM-DD")
          : null,
        fechaDictamen: !(fechaDictamen === "")
          ? moment(fechaDictamen).format("YYYY-MM-DD")
          : null,
        fechaEntrevistaAM: !(fechaEntrevistaAM === "")
          ? moment(fechaEntrevistaAM).format("YYYY-MM-DD")
          : null,
        traumaCircId: traumaCirId,
        datosOdontId: datosOdontId,
        regionAnatomicaId: regionAnatomicaId,
        causaMuerteId: causaMuerteId,
        anotacionDatosOdont: anotacionDatosOdont,
        resumenHecho: resumenHecho,
        observaciones: observaciones,
        desaparicionAldea: desaparicionAldea,
        desaparicionMuniId: desaparicionMuniId,
        desaparicionDeptoId: desaparicionDeptoId,
        desaparicionDia: desaparicionDia,
        desaparicionMes: desaparicionMes,
        desaparicionAnio: desaparicionAnio,

        edadAM: edadAM,
        valorEdadAM: valorEdadAM,
        anotacionAM: anotacionAM,
        rangoMinimoPM: rangoMinimoPM,
        rangoMaximoPM: rangoMaximoPM,
        valorEdadPM: valorEdadPM,
        anotacionPM: anotacionPM,

        estadoId: 1,
        usuarioIngresoId: userI.usuarioId,
      };

      const res = await axios.post(
        `${config.urlApi}/IdentificadoSmih`,
        data,
        configReq
      );

      if (res.status === 202) {
        props.onEditDone(true);
        props.mensajeAlerta(
          "Creacion de identificado",
          "Se ha creado el identificado.",
          "success"
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          props.mensajeAlerta(
            "Creacion de identificado",
            dataError,

            "error"
          );
        } else {
          props.mensajeAlerta(
            "Creacion de identificado",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        props.mensajeAlerta(
          "Creacion de identificado",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const handleErrorSubmit = (e, formData, errorInputs) => {
    var listControls1 = ["fechaCoincidencia","sesionIdentificacion"    ,"osamentaFosa"
    ,"tipoCasoDidId"
    ,"sexoId"
    ,"grupoEtarioId"
    ,"grupoEtnolinguisticoId"];
    var errorControls1 = Object.keys(errorInputs).filter((key) =>
      listControls1.includes(key)
    );
    if (errorControls1.length > 0) {
      setcollapseCC1Alert(true);
      setcollapseCC1(true);
    } else {
      setcollapseCC1Alert(false);
    }

    var listControls5 = [
      "fechaDictamen",
      "fechaInfoFamilia",
      "fechaReporteDid",
      "fechaInhumacion",
      "fechaAnalisisOst",
      "fechaConfirmacion",
      "fechaReporteGenetica",
    ];
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
      "desaparicionAldea",
      "estadoInvestigacionId",
      "desaparicionDia",
      "desaparicionMes",
      "desaparicionAnio",
      "desaparicionDeptoId",
      "desaparicionMuniId",
      "edadAM",
      "valorEdadAM",
      "rangoMinimoPM",
      "rangoMaximoPM",
      "valorEdadPM",
      "valorEdadAM",
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
      `CRIH-${victima_elemento.codigoVictima}-${victima_elemento.nombreVictima}`
    );
    setvictimaId(victima_elemento.victimaId);
  };

  useEffect(() => {
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

    return () => {};
  }, []);

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo === "tipoCasoDid") setcombotipoCasoDid(result.data);
    if (catalogo === "departamento") setcomboDepartamento(result.data);
    if (catalogo === "municipio") setcomboMunicipio(result.data);

    if (catalogo === "valorEdad") setcombovalorEdad(result.data);

    if (catalogo === "grupoEtnolinguistico")
      setcombogrupoEtnolinguistico(result.data);
    if (catalogo === "sexoAdn") setcombosexo(result.data);

    if (catalogo === "grupoEtario") setcombogrupoEtario(result.data);
    if (catalogo === "traumaCirc") setcombotraumaCir(result.data);
    if (catalogo === "regionAnatomica") setcomboregionAnatomicaId(result.data);
    if (catalogo === "causaMuerte") setcombocausaMuerte(result.data);
    if (catalogo === "datosOdont") setcombodatosOdont(result.data);
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
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Caso CRIH</Form.Label>
                      <TextInput
                        name="casoIdentificado"
                        id="casoIdentificado"
                        placeholder="Caso Identificado"
                        type="number"
                        required
                        className="form-control text-center"
                        value={casoIdentificado}
                        onChange={(e) => setcasoIdentificado(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Sesión de identificaciones</Form.Label>
                      <TextInput
                        name="sesionIdentificacion"
                        id="sesionIdentificacion"
                        placeholder="Sesión de identificacion"
                        type="text"
                        required
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
                      <Form.Label>Osamentas en Fosa</Form.Label>
                      <TextInput
                        name="osamentaFosa"
                        id="osamentaFosa"
                        placeholder="Osamentas en Fosa"
                        type="number"
                        required
                        className="form-control text-center"
                        value={osamentaFosa}
                        onChange={(e) => setosamentaFosa(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
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
                </Row>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Sexo</Form.Label>
                      <SelectGroup
                        name="sexoId"
                        id="sexoId"
                        required
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
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Grupo Etnolinguistico</Form.Label>
                      <SelectGroup
                        name="grupoEtnolinguisticoId"
                        id="grupoEtnolinguisticoId"
                        required
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
                  <Col></Col>
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
                    Osamenta seleccionada: {osamentaDescripcion}
                  </Col>
                </Row>
                <Row className="">
                  <OsamentaSelect
                    onSelectOsamenta={onSelectOsamenta}
                  ></OsamentaSelect>
                </Row>
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
                    Victima seleccionada: {victimaDescripcion}
                  </Col>
                </Row>
                <Row className="">
                  <VictimaSelect
                    onSelectVictima={onSelectVictima}
                  ></VictimaSelect>
                </Row>
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
                        renderInput={renderInput}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                          placeholder: "Fecha Dictamen ",
                        }}
                        value={
                          !(fechaDictamen === "")
                            ? moment(fechaDictamen).format("DD-MM-YYYY")
                            : ""
                        }
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaDictamen(moment(e).utc());
                          else {
                            setfechaDictamen("");
                          }
                        }}
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
                        dateFormat="DD-MM-YYYY"
                        renderInput={renderInput}
                        value={
                          !(fechaInfoFamilia === "")
                            ? moment(fechaInfoFamilia).format("DD-MM-YYYY")
                            : ""
                        }
                        inputProps={{
                          placeholder: "Fecha inhumación ",
                        }}
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaInfoFamilia(moment(e).utc());
                          else {
                            setfechaInfoFamilia("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha reporte Did</Form.Label>
                      <Datetime
                        id="fechaReporteDid"
                        name="fechaReporteDid"
                        defaultValue=""
                        renderInput={renderInput}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                          placeholder: "Fecha Reporte Did ",
                        }}
                        value={
                          !(fechaReporteDid === "")
                            ? moment(fechaReporteDid).format("DD-MM-YYYY")
                            : ""
                        }
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaReporteDid(moment(e).utc());
                          else {
                            setfechaReporteDid("");
                          }
                        }}
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
                        dateFormat="DD-MM-YYYY"
                        renderInput={renderInput}
                        value={
                          !(fechaInhumacion === "")
                            ? moment(fechaInhumacion).format("DD-MM-YYYY")
                            : ""
                        }
                        inputProps={{
                          placeholder: "Fecha inhumación ",
                        }}
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaInhumacion(moment(e).utc());
                          else {
                            setfechaInhumacion("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha A. Osteologico</Form.Label>

                      <Datetime
                        id="fechaAnalisisOst"
                        name="fechaAnalisisOst"
                        defaultValue=""
                        renderInput={renderInput}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                          placeholder: "Fecha Analisis Osteologico ",
                        }}
                        value={
                          !(fechaAnalisisOst === "")
                            ? moment(fechaAnalisisOst).format("DD-MM-YYYY")
                            : ""
                        }
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaAnalisisOst(moment(e).utc());
                          else {
                            setfechaAnalisisOst("");
                          }
                        }}
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
                        renderInput={renderInput}
                        dateFormat="DD-MM-YYYY"
                        required
                        inputProps={{
                          placeholder: "Fecha Analisis Osteologico ",
                        }}
                        value={
                          !(fechaConfirmacion === "")
                            ? moment(fechaConfirmacion).format("DD-MM-YYYY")
                            : ""
                        }
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaConfirmacion(moment(e).utc());
                          else {
                            setfechaConfirmacion("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Genetica</Form.Label>

                      <Datetime
                        id="fechaReporteGenetica"
                        name="fechaReporteGenetica"
                        defaultValue=""
                        dateFormat="DD-MM-YYYY"
                        renderInput={renderInput}
                        value={
                          !(fechaReporteGenetica === "")
                            ? moment(fechaReporteGenetica).format("DD-MM-YYYY")
                            : ""
                        }
                        inputProps={{
                          placeholder: "Fecha Genetica ",
                        }}
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaReporteGenetica(moment(e).utc());
                          else {
                            setfechaReporteGenetica("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm></Col>

                  <Col sm></Col>
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
                      <Form.Label>Lugar</Form.Label>
                      <TextInput
                        name="desaparicionAldea"
                        id="desaparicionAldea"
                        placeholder="Lugar"
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
                        value={desaparicionAnio}
                        onChange={(e) => setdesaparicionAnio(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm>
                    <h6>Información Antemortem</h6>
                    <hr></hr>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Edad</Form.Label>
                      <TextInput
                        name="edadAM"
                        id="edadAM"
                        placeholder="Edad AM"
                        type="number"
                        required
                        className="form-control text-center"
                        value={edadAM}
                        onChange={(e) => setedadAM(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Tiempo</Form.Label>
                      <SelectGroup
                        name="valorEdadAM"
                        id="valorEdadAM"
                        required
                        value={!(valorEdadAM === undefined) ? valorEdadAM : ""}
                        onChange={(e) => {
                          setvalorEdadAM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combovalorEdad === undefined)
                          ? combovalorEdad.map((fbb) => (
                              <option
                                key={fbb.valorEdadId}
                                value={fbb.valorEdadId}
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
                      <Form.Label>Anotación</Form.Label>
                      <TextInput
                        name="anotacionAM"
                        id="anotacionAM"
                        placeholder="Anotación AM"
                        type="text"
                        className="form-control text-center"
                        value={anotacionAM}
                        onChange={(e) => setanotacionAM(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha nacimiento</Form.Label>

                      <Datetime
                        id="fechaEntrevistaAm"
                        name="fechaEntrevistaAm"
                        defaultValue=""
                        renderInput={renderInput}
                        dateFormat="DD-MM-YYYY"
                        inputProps={{
                          placeholder: "Fecha Antemortem ",
                        }}
                        value={
                          !(fechaEntrevistaAM === "")
                            ? moment(fechaEntrevistaAM).format("DD-MM-YYYY")
                            : ""
                        }
                        onChange={(e) => {
                          if (moment(e).isValid() === true)
                            setfechaEntrevistaAM(moment(e).utc());
                          else {
                            setfechaEntrevistaAM("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm>
                    <h6>Información Postmortem</h6>
                    <hr></hr>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Edad</Form.Label>
                      <InputGroup>
                        <TextInput
                          name="rangoMinimoPM"
                          id="rangoMinimoPM"
                          placeholder="Minimo"
                          type="number"
                          className="form-control text-center"
                          value={rangoMinimoPM}
                          onChange={(e) => setrangoMinimoPM(e.target.value)}
                        />

                        <TextInput
                          name="rangoMaximoPM"
                          id="rangoMaximoPM"
                          placeholder="Maximo"
                          type="number"
                          className="form-control text-center"
                          value={rangoMaximoPM}
                          onChange={(e) => setrangoMaximoPM(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Tiempo</Form.Label>
                      <SelectGroup
                        name="valorEdadPM"
                        id="valorEdadPM"
                        required
                        value={!(valorEdadPM === undefined) ? valorEdadPM : ""}
                        onChange={(e) => {
                          setvalorEdadPM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combovalorEdad === undefined)
                          ? combovalorEdad.map((fbb) => (
                              <option
                                key={fbb.valorEdadId}
                                value={fbb.valorEdadId}
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
                      <Form.Label>Anotación</Form.Label>
                      <TextInput
                        name="anotacionPM"
                        id="anotacionPM"
                        placeholder="Anotación PM"
                        type="text"
                        required
                        className="form-control text-center"
                        value={anotacionPM}
                        onChange={(e) => setanotacionPM(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm>
                    <h6>Información análisis oseo</h6>
                    <hr></hr>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Trauma</Form.Label>
                      <SelectGroup
                        name="traumaCirId"
                        id="traumaCirId"
                        required
                        value={!(traumaCirId === undefined) ? traumaCirId : ""}
                        onChange={(e) => {
                          settraumaCirId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combotraumaCir === undefined)
                          ? combotraumaCir.map((fbb) => (
                              <option
                                key={fbb.traumaCircId}
                                value={fbb.traumaCircId}
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
                      <Form.Label>Region Anatomica</Form.Label>
                      <SelectGroup
                        name="regionAnatomicaId2"
                        id="regionAnatomicaId2"
                        required
                        value={
                          !(regionAnatomicaId === undefined)
                            ? regionAnatomicaId
                            : ""
                        }
                        onChange={(e) => {
                          setregionAnatomicaId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboregionAnatomicaId === undefined)
                          ? comboregionAnatomicaId.map((fbb) => (
                              <option
                                key={fbb.regionAnatomicaId}
                                value={fbb.regionAnatomicaId}
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
                      <Form.Label>Causa Muerte</Form.Label>
                      <SelectGroup
                        name="causaMuerteId"
                        id="causaMuerteId"
                        required
                        value={
                          !(causaMuerteId === undefined) ? causaMuerteId : ""
                        }
                        onChange={(e) => {
                          setcausaMuerteId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combocausaMuerte === undefined)
                          ? combocausaMuerte.map((fbb) => (
                              <option
                                key={fbb.causaMuerteId}
                                value={fbb.causaMuerteId}
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
                      <Form.Label>Datos odontologicos</Form.Label>
                      <SelectGroup
                        name="datosOdontId"
                        id="datosOdontId"
                        required
                        value={
                          !(datosOdontId === undefined) ? datosOdontId : ""
                        }
                        onChange={(e) => {
                          setdatosOdontId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combodatosOdont === undefined)
                          ? combodatosOdont.map((fbb) => (
                              <option
                                key={fbb.datosOdontId}
                                value={fbb.datosOdontId}
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
                      <Form.Label>Anotaciones Odontologicos</Form.Label>
                      <TextInput
                        name="anotacionDatosOdont"
                        id="anotacionDatosOdont"
                        placeholder="Anotaciones Odontologicos"
                        type="text"
                        required
                        className="form-control text-center"
                        value={anotacionDatosOdont}
                        onChange={(e) => setanotacionDatosOdont(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Resumen del hecho</Form.Label>
                      <TextInput
                        name="resumenHecho"
                        id="resumenHecho"
                        placeholder="Resumen del hecho"
                        type="text"
                        required
                        className="form-control text-center"
                        value={resumenHecho}
                        onChange={(e) => setresumenHecho(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Observaciones</Form.Label>
                      <TextInput
                        name="observaciones"
                        id="observaciones"
                        placeholder="Observaciones"
                        type="text"
                        required
                        className="form-control text-center"
                        value={observaciones}
                        onChange={(e) => setobservaciones (e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Collapse>
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
          </Col>
        </Row>
      </ValidationForm>
    </Col>
  );
}

export default IdentificadosAddSmih;
