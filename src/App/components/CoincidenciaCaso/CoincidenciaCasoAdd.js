import React, {useState, useEffect, useContext} from "react";

//Controles bootstrap
import {
  Row,
  Col,
  Button,
  Form,
  Collapse,
  Card,
  InputGroup
} from "react-bootstrap";
import axios from "axios";
import config from "../../../config";

import OsamentaSelect from "../../../App/components/Osamenta/OsamentaSelect";
import VictimaSelect from "../../../App/components/Victima/VictimaSelect";
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from "react-bootstrap4-form-validation";
import Datetime from "react-datetime";
//context
import userContext from "../../../context/userContext";
//plugins
import moment from "moment";

import "./CoincidenciaCasoEdit.css";

import {
  apiCatalogo,
  apiFetchAccesoXObjeto
} from "../../../utils/fetchCatalogos";
import {renderInputFecha, validDate} from "../Utils/fechas";

function CoincidenciaCasoAdd(props) {
  const userI = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${userI.token}`}
  };

  const [accesos, setAccesos] = useState({
    actualizar: false,
    ver: false,
    agregar: false,
    eliminar: false,
    verArchivo: false,
    agregarArchivo: false,
    eliminarArchivo: false,
    descargarArchivo: false
  });
  const fetchAccesos = async () => {
    var data = await apiFetchAccesoXObjeto(userI.token, userI.usuarioId, 9);
    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
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

  //CLINCIDENCIAS STATES

  const [responsableId, setresponsableId] = useState(null);
  const [marcadoresStr, setmarcadoresStr] = useState(null);

  const [calidadPerfilId, setcalidadPerfilId] = useState(null);
  const [fechaCoincidencia, setfechaCoincidencia] = useState("");
  const [osamentaId, setosamentaId] = useState(null);
  const [osamentaDescripcion, setosamentaDescripcion] = useState("");
  const [victimaId, setvictimaId] = useState(null);
  const [victimaDescripcion, setvictimaDescripcion] = useState("");

  const [lri, setlri] = useState("");
  const [apriori, setapriori] = useState("");
  const [posterior, setposterior] = useState("");
  const [baseInfoId, setbaseInfoId] = useState(null);
  const [programaIdentId, setprogramaIdentId] = useState(null);

  const [estadoCoincidenciaId, setestadoCoincidenciaId] = useState(null);
  const [tipoCasoDidId, settipoCasoDidId] = useState(null);
  const [tipoContextoId, settipoContextoId] = useState(null);
  const [estadoInvestigacionId, setestadoInvestigacionId] = useState(null);
  const [cromosomaYId, setcromosomaYId] = useState(null);
  const [fechaNotificacionDid, setfechaNotificacionDid] = useState("");
  const [fechaConfExc, setfechaConfExc] = useState("");

  const [comboBaseInfo, setcomboBaseInfo] = useState();
  const [comboprogramaIdent, setcomboprogramaIdent] = useState();
  const [comboestadoCoincidencia, setcomboestadoCoincidencia] = useState();
  const [comboestadoInvestigacion, setcomboestadoInvestigacion] = useState();
  const [combocromosomaY, setcombocromosomaY] = useState();
  const [combotipoCasoDid, setcombotipoCasoDid] = useState();
  const [combotipoContexto, setcombotipoContexto] = useState();
  const [combocalidadPerfil, setcombocalidadPerfil] = useState();
  const [comboResponsable, setcomboResponsable] = useState();

  const handleCambioCaso = (e, formData, inputs) => {
    e.preventDefault();
    let banderaOsaVic = 0;
    if (osamentaId === 0 || osamentaId === null) {
      setcollapseCC2Alert(true);
      setcollapseCC2(true);
      banderaOsaVic = banderaOsaVic + 1;
    } else {
      setcollapseCC2Alert(false);
      setcollapseCC2(false);
    }

    if (victimaId === 0 || victimaId === null) {
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
    let lriConv = "";

    if (lri.includes("e+", 0)) {
      lriConv = lri;
    } else {
      if (!isNaN(parseInt(lri))) {
        lriConv = parseInt(lri).toExponential(2);
      } else {
        props.mensajeAlerta(
          "Actualizacion coincidencia",
          "Ingrese un valor para LR valido. ",
          "error"
        );
        return;
      }
    }

    try {
      var dataCoincidencia = {
        fechaCoincidencia: !(fechaCoincidencia === "")
          ? moment(fechaCoincidencia).format("YYYY-MM-DD")
          : null,
        marcadoresStr: marcadoresStr,
        responsableId:
          responsableId === "" || responsableId == "0" ? null : responsableId,

        calidadPerfilId:
          calidadPerfilId === "" || calidadPerfilId == "0"
            ? null
            : calidadPerfilId,

        osamentaId: osamentaId,
        victimaId: victimaId,
        lr: !(isNaN(parseInt(lri)) === true)
          ? parseInt(lri).toExponential(2)
          : lri,
        apriori: apriori,
        posterior: posterior,
        baseInfoId: baseInfoId === "" || baseInfoId == "0" ? null : baseInfoId,
        programaIdentId: programaIdentId,
        estadoCoincidenciaId: estadoCoincidenciaId,
        estadoInvestigacionId:
          estadoInvestigacionId === "" || estadoInvestigacionId == "0"
            ? null
            : estadoInvestigacionId,
        cromosomaYId: cromosomaYId,
        fechaNotificacionDid: !(fechaNotificacionDid === "")
          ? moment(fechaNotificacionDid).format("YYYY-MM-DD")
          : null,
        fechaConfExc: !(fechaConfExc === "")
          ? moment(fechaConfExc).format("YYYY-MM-DD")
          : null,
        estadoId: 1,
        tipoCasoDidId:
          tipoCasoDidId === "" || tipoCasoDidId === 0 ? null : tipoCasoDidId,
        tipoContextoId:
          tipoContextoId === "" || tipoContextoId === 0 ? null : tipoContextoId,
        usuarioIngresoId: userI.usuarioId
      };

      const res = await axios.post(
        `${config.urlApi}/coincidencia`,
        dataCoincidencia,
        configReq
      );

      if (res.status === 202) {
        props.onEditDone(true);
        props.mensajeAlerta(
          "Creacion de coincidencia",
          "Se ha creado la coincidencia.",
          "success"
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          props.mensajeAlerta(
            "Creacion de coincidencia",
            dataError,

            "error"
          );
        } else {
          props.mensajeAlerta(
            "Creacion de coincidencia",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        props.mensajeAlerta(
          "Creacion de coincidencia",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const handleErrorSubmit = (e, formData, errorInputs) => {
    var listControls1 = [
      "fechaCoincidencia",
      "marcadoresStr",
      "calidadPerfilId"
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
      "fechaNotificacionDid",
      "fechaConfExc",
      "estadoCoincidenciaId",
      "cromosomaYId",
      "estadoInvestigacionId",
      "tipoCasoDidId",
      "tipoContextoId"
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

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo == "baseInfo") setcomboBaseInfo(result.data);
    if (catalogo == "programaIdent") setcomboprogramaIdent(result.data);
    if (catalogo == "estadoCoincidencia")
      setcomboestadoCoincidencia(result.data);
    if (catalogo == "estadoInvestigacion")
      setcomboestadoInvestigacion(result.data);
    if (catalogo == "cromosomaY") setcombocromosomaY(result.data);
    if (catalogo == "tipoCasoDid") setcombotipoCasoDid(result.data);
    if (catalogo == "tipoContexto") setcombotipoContexto(result.data);
    if (catalogo == "tipoContexto") setcombotipoContexto(result.data);
    if (catalogo == "calidadPerfil") setcombocalidadPerfil(result.data);
    if (catalogo == "responsablesSOD") setcomboResponsable(result.data);
  };

  const onSelectOsamenta = (osamenta_elemento) => {
    setosamentaDescripcion(
      `CRIH-${osamenta_elemento.casoId}-${osamenta_elemento.fosaDet}-${osamenta_elemento.osamentaDet}`
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
    fetchAccesos();
    fetchCatalogo("responsablesSOD");
    fetchCatalogo("baseInfo");
    fetchCatalogo("programaIdent");
    fetchCatalogo("estadoCoincidencia");
    fetchCatalogo("estadoInvestigacion");
    fetchCatalogo("cromosomaY");
    fetchCatalogo("tipoCasoDid");
    fetchCatalogo("tipoContexto");
    fetchCatalogo("calidadPerfil");

    return () => {};
  }, []);

  return (
    <Col>
      <br></br>
      <ValidationForm
        onSubmit={handleCambioCaso}
        setFocusOnError
        onErrorSubmit={handleErrorSubmit}
        defaultErrorMessage={{
          required: "El campo es requerido.",
          minLength: "Ingresar por lo menos {minLength} caracteres"
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
                      <Form.Label>Fecha coincidencia</Form.Label>
                      <Datetime
                        id="fechaCoincidencia"
                        name="fechaCoincidencia"
                        defaultValue=""
                        dateFormat="DD-MM-YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha coincidencia",
                          requerido: true
                        }}
                        value={fechaCoincidencia}
                        onChange={(e) => {
                          setfechaCoincidencia(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Marcadores</Form.Label>
                      <TextInput
                        name="marcadoresStr"
                        id="marcadoresStr"
                        placeholder="Marcadores"
                        type="number"
                        min={0}
                        max={24}
                        className="form-control text-center"
                        value={marcadoresStr}
                        onChange={(e) => setmarcadoresStr(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Calidad perfil</Form.Label>
                      <SelectGroup
                        name="calidadPerfilId"
                        id="calidadPerfilId"
                        value={
                          !(calidadPerfilId === undefined)
                            ? calidadPerfilId
                            : ""
                        }
                        onChange={(e) => {
                          setcalidadPerfilId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combocalidadPerfil === undefined)
                          ? combocalidadPerfil.map((fbb) => (
                              <option
                                key={fbb.calidadPerfilId}
                                value={fbb.calidadPerfilId}
                              >
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Responsable</Form.Label>
                      <SelectGroup
                        name="responsableId"
                        id="responsableId"
                        value={
                          !(responsableId === undefined) ? responsableId : ""
                        }
                        onChange={(e) => {
                          setresponsableId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboResponsable === undefined)
                          ? comboResponsable.map((fbb) => (
                              <option
                                key={fbb.responsableId}
                                value={fbb.responsableId}
                              >
                                {fbb.responsable}
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
            <h5>Estadistico</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC5}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>LR</Form.Label>
                      <TextInput
                        name="lri"
                        id="lri"
                        placeholder="LR"
                        type="text"
                        required
                        className="form-control text-center"
                        value={lri}
                        onChange={(e) => setlri(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Apriori</Form.Label>
                      <TextInput
                        name="apriori"
                        id="apriori"
                        placeholder="Apriori"
                        type="text"
                        className="form-control text-center"
                        value={apriori}
                        onChange={(e) => setapriori(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Posterior</Form.Label>
                      <TextInput
                        name="posterior"
                        id="posterior"
                        placeholder="Posterior"
                        type="text"
                        className="form-control text-center"
                        value={posterior}
                        onChange={(e) => setposterior(e.target.value)}
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
            <h5>Confirmacion Identificacion</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC6}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row className="">
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Base de datos</Form.Label>
                      <SelectGroup
                        name="baseInfoId"
                        id="baseInfoId"
                        value={!(baseInfoId === undefined) ? baseInfoId : ""}
                        onChange={(e) => {
                          setbaseInfoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboBaseInfo === undefined)
                          ? comboBaseInfo.map((fbb) => (
                              <option
                                key={fbb.baseInfoId}
                                value={fbb.baseInfoId}
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
                      <Form.Label>Programa</Form.Label>
                      <SelectGroup
                        name="programaIdentId"
                        id="programaIdentId"
                        required
                        value={
                          !(programaIdentId === undefined)
                            ? programaIdentId
                            : ""
                        }
                        onChange={(e) => {
                          setprogramaIdentId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboprogramaIdent === undefined)
                          ? comboprogramaIdent.map((fbb) => (
                              <option
                                key={fbb.programaIdentId}
                                value={fbb.programaIdentId}
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
                      <Form.Label>Fecha Notificación</Form.Label>

                      <Datetime
                        id="fechaNotificacionDid"
                        name="fechaNotificacionDid"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Notificacion DID",
                          requerido: true
                        }}
                        value={fechaNotificacionDid}
                        onChange={(e) => {
                          setfechaNotificacionDid(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha Confn/Exc</Form.Label>
                      <Datetime
                        id="fechaConfExc"
                        name="fechaConfExc"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Confirmacion/Exclusion",
                          requerido: true
                        }}
                        required
                        value={fechaConfExc}
                        onChange={(e) => {
                          setfechaConfExc(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Estado Coincidencia</Form.Label>
                      <SelectGroup
                        name="estadoCoincidenciaId"
                        id="estadoCoincidenciaId"
                        required
                        value={
                          !(estadoCoincidenciaId === undefined)
                            ? estadoCoincidenciaId
                            : ""
                        }
                        onChange={(e) => {
                          setestadoCoincidenciaId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboestadoCoincidencia === undefined)
                          ? comboestadoCoincidencia.map((fbb) => (
                              <option
                                key={fbb.estadoCoincidenciaId}
                                value={fbb.estadoCoincidenciaId}
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
                      <Form.Label>Cromosoma Y</Form.Label>
                      <SelectGroup
                        name="cromosomaYId"
                        id="cromosomaYId"
                        value={
                          !(cromosomaYId === undefined) ? cromosomaYId : ""
                        }
                        onChange={(e) => {
                          setcromosomaYId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combocromosomaY === undefined)
                          ? combocromosomaY.map((fbb) => (
                              <option
                                key={fbb.cromosomaYId}
                                value={fbb.cromosomaYId}
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
                      <Form.Label>Estado Investigacion</Form.Label>
                      <SelectGroup
                        name="estadoInvestigacionId"
                        id="estadoInvestigacionId"
                        value={
                          !(estadoInvestigacionId === undefined)
                            ? estadoInvestigacionId
                            : ""
                        }
                        onChange={(e) => {
                          setestadoInvestigacionId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboestadoInvestigacion === undefined)
                          ? comboestadoInvestigacion.map((fbb) => (
                              <option
                                key={fbb.estadoInvestigacionId}
                                value={fbb.estadoInvestigacionId}
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
                      <Form.Label>Tipo Caso</Form.Label>
                      <SelectGroup
                        name="tipoCasoDidId"
                        id="tipoCasoDidId"
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
                <Row>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Contexto</Form.Label>
                      <SelectGroup
                        name="tipoContextoId"
                        id="tipoContextoId"
                        value={
                          !(tipoContextoId === undefined) ? tipoContextoId : ""
                        }
                        onChange={(e) => {
                          settipoContextoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combotipoContexto === undefined)
                          ? combotipoContexto.map((fbb) => (
                              <option
                                key={fbb.tipoContextoId}
                                value={fbb.tipoContextoId}
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

export default CoincidenciaCasoAdd;
