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
import { renderInputFecha, validDate } from "../../Utils/fechas";

import OsamentaSelect from "../../Osamenta/OsamentaSelect";
import VictimaSelect from "../../Victima/VictimaSelect";
import ArchivosAdd from "../../Identificados/Smih/Archivos/ArchivosAdd";
import ArchivosList from "../../Identificados/Smih/Archivos/ArchivosList";
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

import "./IdentificadosEditSmih.css";

import MensajeAlerta from "../../MensajeAlerta/MensajeAlerta";

import { apiCatalogo } from "../../../../utils/fetchCatalogos";

function IdentificadosEditSmih(props) {
  const [data] = useState(props.data ? props.data : null);

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
  const [collapseCC9, setcollapseCC9] = useState(false);
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
  const [identificadoSmihId] = useState(data.identificadoSmihId);
  const [casoIdentificado] = useState(data.casoIdentificado);

  const [sesionIdentificacion, setsesionIdentificacion] = useState(
    data.sesionIdentificacion
  );
  const [osamentaFosa, setosamentaFosa] = useState(data.osamentaFosa);
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
  //COINCIDENCIA
  const [coincidenciaId] = useState(data.coincidenciaId);

  //FECHAS

  const [fechaInfoFamilia, setfechaInfoFamilia] = useState(
    data.fechaInfoFamilia === null ? "" : moment(data.fechaInfoFamilia).utc()
  );
  const [fechaReporteDid, setfechaReporteDid] = useState(
    data.fechaReporteDid === null ? "" : moment(data.fechaReporteDid).utc()
  );
  const [fechaAnalisisOst, setfechaAnalisisOst] = useState(
    data.fechaAnalisisOst === null ? "" : moment(data.fechaAnalisisOst).utc()
  );
  const [fechaInhumacion, setfechaInhumacion] = useState(
    data.fechaInhumacion === null ? "" : moment(data.fechaInhumacion).utc()
  );

  const [fechaConfirmacion, setfechaConfirmacion] = useState(
    data.fechaConfirmacion === null ? "" : moment(data.fechaConfirmacion).utc()
  );
  const [fechaReporteGenetica, setfechaReporteGenetica] = useState(
    data.fechaReporteGenetica === null
      ? ""
      : moment(data.fechaReporteGenetica).utc()
  );
  const [fechaDictamen, setfechaDictamen] = useState(
    data.fechaDictamen === null ? "" : moment(data.fechaDictamen).utc()
  );
  const [fechaEntrevistaAM, setfechaEntrevistaAM] = useState(
    data.fechaEntrevistaAM === null ? "" : moment(data.fechaEntrevistaAM).utc()
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

  //antemortem
  const [edadAM, setedadAM] = useState(data.edadAM);
  const [valorEdadAM, setvalorEdadAM] = useState(data.valorEdadAM);
  const [anotacionAM, setanotacionAM] = useState(
    data.anotacionAM === null ? "" : data.anotacionAM
  );

  //postmortem
  const [rangoMinimoPM, setrangoMinimoPM] = useState(
    data.rangoMinimoPM === null ? "" : data.rangoMinimoPM
  );
  const [rangoMaximoPM, setrangoMaximoPM] = useState(
    data.rangoMaximoPM === null ? "" : data.rangoMaximoPM
  );
  const [valorEdadPM, setvalorEdadPM] = useState(
    data.valorEdadPM === null ? "" : data.valorEdadPM
  );
  const [anotacionPM, setanotacionPM] = useState(
    data.anotacionPM === null ? "" : data.anotacionPM
  );

  //data extra
  const [traumaCirId, settraumaCirId] = useState(data.traumaCircId);
  const [regionAnatomicaId, setregionAnatomicaId] = useState(
    data.regionAnatomicaId
  );
  const [causaMuerteId, setcausaMuerteId] = useState(data.causaMuerteId);

  const [datosOdontId, setdatosOdontId] = useState(data.datosOdontId);
  const [anotacionDatosOdont, setanotacionDatosOdont] = useState(
    data.anotacionDatosOdont
  );
  const [resumenHecho, setresumenHecho] = useState(data.resumenHecho);
  const [observaciones, setobservaciones] = useState(data.observaciones);

  const [combovalorEdad, setcombovalorEdad] = useState();
  const [comboDepartamento, setcomboDepartamento] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();
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
      update();
    }
  };
  const update = async () => {
    try {
      var data = {
        identificadoSmihId: identificadoSmihId,
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
        traumaCircId:
          traumaCirId === "" || traumaCirId === 0 ? null : traumaCirId,
        causaMuerteId:
          causaMuerteId === "" || causaMuerteId === 0 ? null : causaMuerteId,
        datosOdontId:
          datosOdontId === "" || datosOdontId === 0 ? null : datosOdontId,
        regionAnatomicaId:
          regionAnatomicaId === "" || regionAnatomicaId === 0
            ? null
            : regionAnatomicaId,

        anotacionDatosOdont: anotacionDatosOdont,
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

        resumenHecho: resumenHecho,
        observaciones: observaciones,

        estadoId: 1,
        usuarioIngresoId: userI.usuarioId,
      };

      const res = await axios.put(
        `${config.urlApi}/identificadoSmih/${identificadoSmihId}`,
        data,
        configReq
      );
      if (res.status === 201) {
        MensajeAlerta(
          "Actualizacion de identificado",
          "Se ha actualizado el identificado [" + data.identificadoSmihId + "]",
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
    var listControls1 = [
      "fechaCoincidencia",
      "sesionIdentificacion",
      "osamentaFosa",
      "tipoCasoDidId",
      "sexoId",
      "grupoEtarioId",
      "grupoEtnolinguisticoId",
    ];

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
      "fechaReporteGenetica",
    ];
    var errorControls5 = Object.keys(errorInputs).filter((key) =>
      listControls5.includes(key)
    );
    if (
      fechaConfirmacion === "" ||
      fechaConfirmacion === undefined ||
      fechaConfirmacion === null
    )
      errorControls5.push("fechaConfirmacion");

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
      `${victima_elemento.codigoVictima}-${victima_elemento.nombreVictima}`
    );
    setvictimaId(victima_elemento.victimaId);
  };

  const validaAnio = (value) => {
    if (value === undefined || value === null || value === "") {
      return false;
    } else {
      if (value.length === 4) {
        if (parseInt(value) > 1500 && parseInt(value) < 2060) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  const validaMes = (value) => {
    if (value === undefined || value === null || value === "") {
      return false;
    } else {
      if (value.length >= 1 || value.length <= 2) {
        if (parseInt(value) >= 1 && parseInt(value) <= 12) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  const validaDia = (value) => {
    if (value === undefined || value === null || value === "") {
      return false;
    } else {
      if (value.length >= 1 || value.length <= 2) {
        if (parseInt(value) >= 1 && parseInt(value) <= 31) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
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
    fetchCatalogo("genero");
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

    if (catalogo === "valorEdad") setcombovalorEdad(result.data);

    if (catalogo === "grupoEtnolinguistico")
      setcombogrupoEtnolinguistico(result.data);
    if (catalogo === "genero") setcombosexo(result.data);

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
                            <option key={fbb.generoId} value={fbb.generoId}>
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
                </Row>{" "}
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
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha reporte Did</Form.Label>
                      <Datetime
                        id="fechaReporteDid"
                        name="fechaReporteDid"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Reporte Did ",
                        }}
                        value={fechaReporteDid}
                        onChange={(e) => {
                          setfechaReporteDid(e);
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
                      <Form.Label>Fecha A. Osteologico</Form.Label>
                      <Datetime
                        id="fechaAnalisisOst"
                        name="fechaAnalisisOst"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Analisis Osteologico ",
                        }}
                        value={fechaAnalisisOst}
                        onChange={(e) => {
                          setfechaAnalisisOst(e);
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
                          placeholder: "Fecha Confirmacion ",
                          requerido: true,
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

                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Genetica</Form.Label>
                      <Datetime
                        id="fechaReporteGenetica"
                        name="fechaReporteGenetica"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Genetica ",
                        }}
                        value={fechaReporteGenetica}
                        onChange={(e) => {
                          setfechaReporteGenetica(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
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
                        name="desaparicionMuniId"
                        id="desaparicionMuniId"
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
                        validator={validaDia}
                        errorMessage={{ validator: "Ingrese dia correcto." }}
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
                        validator={validaMes}
                        errorMessage={{ validator: "Ingrese mes correcto." }}
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
                        validator={validaAnio}
                        errorMessage={{ validator: "Ingrese año correcto(####)" }}
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
                      <Form.Label>Fecha AM</Form.Label>
                      <Datetime
                        id="fechaEntrevistaAm"
                        name="fechaEntrevistaAm"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Antemortem ",
                        }}
                        value={fechaEntrevistaAM}
                        onChange={(e) => {
                          setfechaEntrevistaAM(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
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
                          required
                          className="form-control text-center"
                          value={rangoMinimoPM}
                          onChange={(e) => setrangoMinimoPM(e.target.value)}
                        />

                        <TextInput
                          name="rangoMaximoPM"
                          id="rangoMaximoPM"
                          placeholder="Maximo"
                          type="number"
                          required
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
                      <Form.Label>Trauma CM</Form.Label>
                      <SelectGroup
                        name="traumaCirId"
                        id="traumaCirId"
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
                        name="regionAnatomicaId"
                        id="regionAnatomicaId"
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
                      <Form.Label>Observaciones</Form.Label>
                      <TextInput
                        name="observaciones"
                        id="observaciones"
                        placeholder="Observaciones"
                        type="text"
                        className="form-control text-center"
                        value={observaciones}
                        onChange={(e) => setobservaciones(e.target.value)}
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
              setcollapseCC9(!collapseCC9);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC9}
          >
            <h5>Documentos</h5>
          </Col>
        </Row>

        <Row>
          <Collapse in={collapseCC9}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row>
                  <Col className="row-eq-height">
                    <ArchivosAdd
                      IdentificadoId={identificadoSmihId}
                      coincidenciaId={coincidenciaId}
                      mensajeAlerta={MensajeAlerta}
                      onAddDoneFile={setResetListFiles}
                    ></ArchivosAdd>
                  </Col>
                  <Col>
                    {identificadoSmihId > 0 && (
                      <ArchivosList
                        IdentificadoId={identificadoSmihId}
                        coincidenciaId={coincidenciaId}
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
          </Row>)}
      </ValidationForm>
    </Col>
  );
}

export default IdentificadosEditSmih;
