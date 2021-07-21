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
  Modal,
} from "react-bootstrap";
import axios from "axios";
import config from "../../../config";
import VictimaDetalle from "../Victima/VictimaDetalle";
import OsamentaDetalle from "../Osamenta/OsamentaDetalle"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { renderInputFecha, validDate } from "../Utils/fechas";

import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
import Datetime from "react-datetime";
//context
import userContext from "../../../context/userContext";
//plugins
import moment from "moment";
import { apiFetch } from "../../../utils/fetchGraphs";

import "./CoincidenciaCasoEdit.css";

import TokenLoad from "../Token/TokenLoad";
import OsamentaSelect from "../Osamenta/OsamentaSelect";
import VictimaSelect from "../Victima/VictimaSelect";
import DonanteList from "../Coincidencias/Donantes/DonantesList";
import NotasLaboratorioList from "../Coincidencias/NotasLaboratorio/NotasLaboratorioList";
import AnotacionesDidList from "../Coincidencias/AnotacionesDid/AnotacionesDidList";
import SeguimientoDidList from "../Coincidencias/SeguimientoDid/SeguimientoDidList";
import ArchivosList from "../Coincidencias/Archivos/ArchivosList";
import ArchivosAdd from "../Coincidencias/Archivos/ArchivosAdd";
import MensajeAlerta from "../MensajeAlerta/MensajeAlerta";

import { apiCatalogo } from "../../../utils/fetchCatalogos";

function CoincidenciaCasoEdit(props) {
  const userI = useContext(userContext);
  const configReq = {
    headers: { Authorization: `Bearer ${userI.token}` },
  };
  const [dataCaso] = useState(props.dataCaso ? props.dataCaso : null);

  //collapse
  const [modalToken, setmodalToken] = useState(false);
  const [collapseCC1, setcollapseCC1] = useState(true);
  const [collapseCC2, setcollapseCC2] = useState(false);
  const [collapseCC3, setcollapseCC3] = useState(false);
  const [collapseCC4, setcollapseCC4] = useState(false);
  const [collapseCC5, setcollapseCC5] = useState(false);
  const [collapseCC6, setcollapseCC6] = useState(false);
  const [collapseCC7, setcollapseCC7] = useState(false);
  const [collapseCC8, setcollapseCC8] = useState(false);
  const [collapseCC9, setcollapseCC9] = useState(false);
  const [collapseCC10, setcollapseCC10] = useState(false);
  const [collapseCC1Alert, setcollapseCC1Alert] = useState(false);
  const [collapseCC2Alert, setcollapseCC2Alert] = useState(false);
  const [collapseCC3Alert, setcollapseCC3Alert] = useState(false);
  const [collapseCC4Alert, setcollapseCC4Alert] = useState(false);
  const [collapseCC5Alert, setcollapseCC5Alert] = useState(false);
  const [collapseCC6Alert, setcollapseCC6Alert] = useState(false);
  const [collapseCC7Alert, setcollapseCC7Alert] = useState(false);
  const [collapseCC8Alert, setcollapseCC8Alert] = useState(false);
  const [collapseCC9Alert] = useState(false);
  const [collapseCC10Alert] = useState(false);

  //CLINCIDENCIAS STATES
  const [coincidenciaId, setcoincidenciaId] = useState(0);

  const [marcadoresStr, setmarcadoresStr] = useState(0);

  const [calidadPerfilId, setcalidadPerfilId] = useState(0);

  const [casoOsamenta, setcasoOsamenta] = useState(0);
  const [fechaCoincidencia, setfechaCoincidencia] = useState("");

  const [editOsamenta, seteditOsamenta] = useState(false);
  const [editVictima, seteditVictima] = useState(false);

  const [osamentaId, setosamentaId] = useState(0);
  const [osamentaDescripcion, setosamentaDescripcion] = useState("");
  const [victimaId, setvictimaId] = useState(0);
  const [victimaDescripcion, setvictimaDescripcion] = useState("");
  const [lri, setlri] = useState("");
  const [apriori, setapriori] = useState("");
  const [posterior, setposterior] = useState("");
  const [baseInfoId, setbaseInfoId] = useState(0);
  const [programaIdentId, setprogramaIdentId] = useState(0);
  const [donanteCoincidencia, setdonanteCoincidencia] = useState({});

  const [estadoCoincidenciaId, setestadoCoincidenciaId] = useState(0);
  const [estadoInvestigacionId, setestadoInvestigacionId] = useState(0);
  const [tipoCasoDidId, settipoCasoDidId] = useState(0);
  const [tipoContextoId, settipoContextoId] = useState(0);
  const [cromosomaYId, setcromosomaYId] = useState(0);
  const [fechaNotificacionDid, setfechaNotificacionDid] = useState("");
  const [fechaConfExc, setfechaConfExc] = useState("");

  const [resetListFiles, setresetListFiles] = useState(false);

  const [comboBaseInfo, setcomboBaseInfo] = useState();
  const [comboprogramaIdent, setcomboprogramaIdent] = useState();
  const [comboestadoCoincidencia, setcomboestadoCoincidencia] = useState();
  const [comboestadoInvestigacion, setcomboestadoInvestigacion] = useState();
  const [combocromosomaY, setcombocromosomaY] = useState();
  const [combotipoCasoDid, setcombotipoCasoDid] = useState();
  const [combotipoContexto, setcombotipoContexto] = useState();
  const [combocalidadPerfil, setcombocalidadPerfil] = useState();
  const [token, setToken] = useState("");
  const [banderaIdentificado, setbanderaIdentificado] = useState(false);

  const oncerrarModalToken = (e) => {
    setmodalToken(false);
  };
  const handleCambioCaso = (e, formData, inputs) => {
    e.preventDefault();
    setcollapseCC1Alert(false);
    setcollapseCC2Alert(false);
    setcollapseCC3Alert(false);
    setcollapseCC4Alert(false);
    setcollapseCC5Alert(false);
    setcollapseCC6Alert(false);
    setcollapseCC7Alert(false);
    setcollapseCC8Alert(false);

    if (estadoCoincidenciaId == 2) {
      if (
        tipoCasoDidId === null ||
        tipoCasoDidId === undefined ||
        tipoCasoDidId <= 0
      ) {
        MensajeAlerta(
          "Identificado SmIh",
          "Necesita seleccionar el tipo de caso. ",
          "error"
        );
      } else {
        if (!banderaIdentificado) sweetConfirmHandler();
        else update(false);
      }
    } else {
      update(false);
    }
  };
  const onSetToken = (value) => {
    setToken(value);
  };
  const verificaToken = (e) => {
    if (token === "" || token === undefined || token === null) {
      MensajeAlerta("Error token", "Ingrese un token válido.", "error");
    } else {
      if (!(token.length === 6)) {
        MensajeAlerta(
          "Error token",
          "Debe ingresar un codigo con 6 digitos.",
          "error"
        );
      } else {
        setmodalToken(false);
        update(true);
      }
    }
  };
  const sweetConfirmHandler = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Está seguro de confirmar la coincidencia?",
      text: "Se procedera a crear el identificado. ",
      type: "warning",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.value) {
        if (token === "" || token === null) {
          sendMail();
          setmodalToken(true);
        }
      } else {
        return MySwal.fire("", "No se realizo ningun cambio.", "error");
      }
    });
  };

  const sendMail = async () => {
    try {
      var data = {
        usuarioIngresoId: userI.usuarioId,
      };
      const res = await axios.post(
        `${config.urlApi}/IdentificadoSmih`,
        data,
        configReq
      );
      if (res.status === 202) {
        MensajeAlerta("Envio de token", res.data.data, "info");
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          MensajeAlerta(
            "Envio de token",
            dataError,

            "error"
          );
        } else {
          MensajeAlerta(
            "Envio de token",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        MensajeAlerta(
          "Envio de token",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const update = async (creaSmih = false) => {
    let lriConv = "";

    if (lri.includes("e+", 0)) {
      lriConv = lri;
    } else {
      if (!isNaN(parseInt(lri))) {
        lriConv = parseInt(lri).toExponential(2);
      } else {
        MensajeAlerta(
          "Actualizacion coincidencia",
          "Ingrese un valor para LR valido. ",
          "error"
        );
        return;
      }
    }

    try {
      var data = {
        coincidenciaId: coincidenciaId,
        marcadoresStr: marcadoresStr,
        calidadPerfilId:
          calidadPerfilId === "" || calidadPerfilId === 0
            ? null
            : calidadPerfilId,
        fechaCoincidencia: !(fechaCoincidencia === "")
          ? moment(fechaCoincidencia).format("YYYY-MM-DD")
          : null,
        osamentaId: osamentaId,
        victimaId: victimaId,
        lr: lriConv,
        apriori: apriori,
        posterior: posterior,
        baseInfoId: baseInfoId,
        programaIdentId: programaIdentId,
        estadoCoincidenciaId: estadoCoincidenciaId,
        estadoInvestigacionId: estadoInvestigacionId,
        cromosomaYId: cromosomaYId,
        fechaNotificacionDid: !(fechaNotificacionDid === "")
          ? moment(fechaNotificacionDid).format("YYYY-MM-DD")
          : null,
        fechaConfExc: !(fechaConfExc === "")
          ? moment(fechaConfExc).format("YYYY-MM-DD")
          : null,
        tipoCasoDidId:
          tipoCasoDidId === "" || tipoCasoDidId === 0 ? null : tipoCasoDidId,
        tipoContextoId:
          tipoContextoId === "" || tipoContextoId === 0 ? null : tipoContextoId,
        estadoId: 1,
        usuarioIngresoId: userI.usuarioId,

        token: token,
      };
      const res = await axios.put(
        `${config.urlApi}/coincidencia/${data.coincidenciaId}`,
        data,
        configReq
      );
      setToken("");
      if (res.status === 201) {
        MensajeAlerta(
          "Actualizacion coincidencia",
          "Se ha actualizado la coincidencia con id [" +
          data.coincidenciaId +
          "]. ",
          "success"
        );
        if (creaSmih) createSmih();

        editDoneRedirectHome(true);
      }
    } catch (error) {
      setToken("");
      if (error.response.status === 400) {
        if (error.response.data.error) {
          MensajeAlerta(
            "Actualizacion coincidencia",
            `Se ha actualizado la coincidencia :[${data.coincidenciaId}]`,

            "error"
          );
        } else {
          MensajeAlerta(
            "Actualizacion coincidencia",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        MensajeAlerta(
          "Actualizacion coincidencia",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const createSmih = async () => {
    try {
      var data = {
        coincidenciaId: coincidenciaId,
        casoIdentificado: "",
        osamentaId: osamentaId,
        victimaId: victimaId,
        tipoCasoDidId:
          tipoCasoDidId === "" || tipoCasoDidId === 0 ? null : tipoCasoDidId,
        tipoContextoId:
          tipoContextoId === "" || tipoContextoId === 0 ? null : tipoContextoId,
        estadoId: 1,
        usuarioIngresoId: userI.usuarioId,
        token: token,
      };

      const res = await axios.post(
        `${config.urlApi}/IdentificadoSmih/confirmInsert`,
        data,
        configReq
      );
      setToken("");
      if (res.status === 202) {
        MensajeAlerta(
          "Creacion de identificado",
          "Se ha creado el identificado Smih con id [" +
          res.data.data.identificadoSmihId +
          "]. ",
          "success"
        );
      }
    } catch (error) {
      setToken("");
      if (error.response.status === 400 || error.response.status === 500) {
        if (error.response.data.error) {
          MensajeAlerta(
            "Creacion de identificado",
            error.response.data.data,

            "error"
          );
        } else {
          MensajeAlerta(
            "Creacion de identificado",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        MensajeAlerta(
          "Creacion de identificado",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const editDoneRedirectHome = (value) => {
    props.onEditDone(value);
  };

  const setResetListFiles = (value) => {
    setresetListFiles(value);
  };

  const handleErrorSubmit = (e, formData, errorInputs) => {
    var listControls1 = [
      "fechaCoincidencia",
      "marcadoresStr",
      "calidadPerfilId",
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
      "tipoContextoId",
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
    if (catalogo == "calidadPerfil") setcombocalidadPerfil(result.data);
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

  const fetchData = async (url, fnSetState) => {
    const result = await apiFetch(url, userI.token);
    fnSetState(result);
  };

  const [permisoAgregar, setpermisoAgregar] = useState(false);
  useEffect(() => {


    if (userI.usuarioId < 9) {
      setpermisoAgregar(true)
    }


    if (!(props.dataCaso === null)) {
      fetchCatalogo("baseInfo");
      fetchCatalogo("programaIdent");
      fetchCatalogo("estadoCoincidencia");
      fetchCatalogo("estadoInvestigacion");
      fetchCatalogo("cromosomaY");
      fetchCatalogo("tipoCasoDid");
      fetchCatalogo("tipoContexto");
      fetchCatalogo("calidadPerfil");
      setcoincidenciaId(dataCaso.coincidenciaId);
      fetchData(
        `Coincidencia/flag/${dataCaso.coincidenciaId}`,
        setbanderaIdentificado
      );
      setmarcadoresStr(dataCaso.marcadoresStr);
      setcalidadPerfilId(dataCaso.calidadPerfilId);

      setfechaCoincidencia(
        dataCaso.fechaCoincidencia === null
          ? ""
          : moment(dataCaso.fechaCoincidencia).utc()
      );
      setosamentaId(dataCaso.osamentaId);
      setvictimaId(dataCaso.victimaId);
      setosamentaDescripcion(
        `CRIH-${dataCaso.Osamenta.casoId}-${dataCaso.Osamenta.fosaDet}-${dataCaso.Osamenta.osamentaDet}`
      );
      setvictimaDescripcion(
        `CRIH-${dataCaso.Victima.codigoVictima}-${dataCaso.Victima.nombreVictima}`
      );
      setlri(dataCaso.lr);
      setapriori(dataCaso.apriori);
      setposterior(dataCaso.posterior);
      setbaseInfoId(dataCaso.baseInfoId);
      setprogramaIdentId(dataCaso.programaIdentId);
      setestadoCoincidenciaId(dataCaso.estadoCoincidenciaId);
      setestadoInvestigacionId(dataCaso.estadoInvestigacionId);
      settipoCasoDidId(
        dataCaso.tipoCasoDidId === null ? "" : dataCaso.tipoCasoDidId
      );

      settipoContextoId(dataCaso.tipoContextoId);
      setcromosomaYId(dataCaso.cromosomaYId);
      setfechaNotificacionDid(
        dataCaso.fechaNotificacionDid === null
          ? ""
          : moment(dataCaso.fechaNotificacionDid).utc()
      );

      setfechaConfExc(
        dataCaso.fechaConfExc === null
          ? ""
          : moment(dataCaso.fechaConfExc).utc()
      );
      setdonanteCoincidencia(dataCaso.DonanteCoincidencia);
      setcasoOsamenta(dataCaso.Osamenta.casoId);


    }
    return () => { };
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
                      <Form.Label>Caso</Form.Label>
                      <TextInput
                        name="casoOsamenta"
                        id="casoOsamenta"
                        placeholder="Codigo caso DID"
                        type="text"
                        className="form-control text-center"
                        readOnly
                        value={casoOsamenta}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm></Col>
                  <Col sm>
                    <Form.Group>
                      <Form.Label>Fecha coincidencia</Form.Label>
                      <Datetime
                        id="fechaCoincidencia"
                        name="fechaCoincidencia"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Coincidencia ",
                          requerido: true,
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
                  <Col sm> </Col>
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
                    {victimaId > 0 && (
                      <VictimaSelect
                        onSelectVictima={onSelectVictima}
                      ></VictimaSelect>
                    )}
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
              collapseCC4Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC4(!collapseCC4);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC4}
          >
            <h5>Donantes</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC4}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                <Row className="">
                  <Col sm>
                    {!(donanteCoincidencia === undefined) &&
                      donanteCoincidencia.length > 0 && (
                        <DonanteList
                          DonanteCoincidencia={donanteCoincidencia}
                        ></DonanteList>
                      )}
                  </Col>
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
                        className="form-control text-center"
                        value={lri}
                        onChange={(e) => setlri(e.target.value)}
                        required
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
                  <Col>
                    <Form.Group>
                      <Form.Label>Fecha Notificación</Form.Label>
                      <Datetime
                        id="fechaNotificacionDid"
                        name="fechaNotificacionDid"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha Notificacion DID ",
                          requerido: true,
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
                  <Col>
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
                          requerido: true,
                        }}
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
                  <Col>
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
                  <Col>
                    {" "}
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
                  <Col>
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
          <Col
            className={
              collapseCC7Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC7(!collapseCC7);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC7}
          >
            <h5>Notas laboratorio</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC7}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                {coincidenciaId > 0 && (
                  <NotasLaboratorioList
                    CoincidenciaId={coincidenciaId}
                  ></NotasLaboratorioList>
                )}
              </Card.Body>
            </div>
          </Collapse>
        </Row>

        <Row>
          <Col
            className={
              collapseCC8Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC8(!collapseCC8);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC8}
          >
            <h5>Anotaciones DID</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC8}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                {coincidenciaId > 0 && (
                  <AnotacionesDidList
                    CoincidenciaId={coincidenciaId}
                  ></AnotacionesDidList>
                )}
              </Card.Body>
            </div>
          </Collapse>
        </Row>

        <Row>
          <Col
            className={
              collapseCC9Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
            onClick={(e) => {
              setcollapseCC9(!collapseCC9);
            }}
            aria-controls="basic-collapse"
            aria-expanded={collapseCC9}
          >
            <h5>Solicitudes de seguimiento</h5>
          </Col>
        </Row>
        <Row>
          <Collapse in={collapseCC9}>
            <div id="basic-collapse" className="col-12">
              <Card.Body>
                {coincidenciaId > 0 && (
                  <SeguimientoDidList
                    CoincidenciaId={coincidenciaId}
                  ></SeguimientoDidList>
                )}
              </Card.Body>
            </div>
          </Collapse>
        </Row>

        <Row>
          <Col
            className={
              collapseCC10Alert
                ? "borderRadSolidAlert btn"
                : "borderRadSolid btn"
            }
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
                      CoincidenciaId={coincidenciaId}
                      mensajeAlerta={MensajeAlerta}
                      onAddDoneFile={setResetListFiles}
                    ></ArchivosAdd>
                  </Col>
                  <Col>
                    {coincidenciaId > 0 && (
                      <ArchivosList
                        CoincidenciaId={coincidenciaId}
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
                key="btnGuardarCoinci"
                name="btnGuardarCoinci"
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
      <Modal
        size={"xl"}
        show={modalToken}
        onHide={oncerrarModalToken}
        id="modalToken"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modalHeaderToken" closeButton>
          <h5>Ingrese token para poder guardar el identificado </h5>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <Row className="justify-content-center">
            <div className="margin-top--small">
              <TokenLoad onTokenSet={onSetToken}></TokenLoad>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className="modalHeaderToken">
          <Col className=" d-flex justify-content-center">
            <Button
              key="btnOkToken"
              name="btnOkToken"
              variant="warning"
              size="md"
              onClick={verificaToken}
            >
              <i className="feather icon-save" />
              GUARDAR
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default CoincidenciaCasoEdit;
