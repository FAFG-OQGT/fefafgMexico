import React, {useContext, useState, useEffect} from "react";
import {Row, Col, Button, Form, Collapse, InputGroup} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Datetime from "react-datetime";
import Chart from "react-apexcharts";

import avgChart1 from "../../App/components/charts/chart/avrage-chart-1";

import axios from "axios";
import moment from "moment";

import userContext from "../../context/userContext";

import TablaGenerica from "../../App/components/TablaGenerica/TablaGenerica";
import config from "../../config";

import {apiCatalogo} from "../../utils/fetchCatalogos";
import {JsonToExcel} from "react-json-excel";
import {renderInputFecha, validDate} from "../../App/components/Utils/fechas";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
import "./reportes.css";
import {GraficasCoincidencia} from "../../App/components/charts/fafgCharts/Coincidencia/index";

function ReporteCoincidencia(props) {
  const filename = "reporteCoincidencias",
    fields = {
      coincidenciaId: "coincidenciaId",
      EstadoCoincidencia: "EstadoCoincidencia",
      fechaCoincidencia: "fechaCoincidencia",
      fechaNotificacionDid: "fechaNotificacionDid",
      fechaConfExc: "fechaConfExc",
      Osamenta: "Osamenta",
      OsamentaSexoAdn: "OsamentaSexoAdn",
      codigoVictima: "codigoVictima",
      nombreVictima: "nombreVictima",
      lr: "lr",
      apriori: "apriori",
      posterior: "posterior",
      marcadoresStr: "marcadoresStr",
      BaseInfo: "BaseInfo",
      ProgramaIdent: "ProgramaIdent",
      EstadoInvestigacion: "EstadoInvestigacion",
      CromosomaY: "CromosomaY",
      TipoContexto: "TipoContexto",
      CalidadPerfil: "CalidadPerfil",
      Usuario: "Usuario",
    },
    text = <i className="feather icon-download"></i>;

  const user = useContext(userContext);
  const [data, setData] = React.useState([]);
  const [dataRep, setdataRep] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dataDownload, setdataDownload] = React.useState([]);

  const [pageCount, setPageCount] = React.useState(0);
  const [totalRegisters, settotalRegisters] = useState(0);

  //parametros
  const [baseInfoId, setbaseInfoId] = React.useState(-1);
  const [programaIdentId, setprogramaIdentId] = React.useState(-1);
  const [estadoCoincidenciaId, setestadoCoincidenciaId] = React.useState(-1);
  const [estadoInvestigacionId, setestadoInvestigacionId] = React.useState(-1);
  const [tipoCasoDidId, settipoCasoDidId] = React.useState(-1);
  const [tipoContextoId, settipoContextoId] = React.useState(-1);
  const [sexoAdnId, setsexoAdnId] = React.useState(-1);
  const [calidadPerfilId, setcalidadPerfilId] = useState(-1);

  const [coincidenciaId, setcoincidenciaId] = useState();
  const [casoId, setcasoId] = useState();

  const [codigoVictima, setcodigoVictima] = useState("");
  const [nombreVictima, setnombreVictima] = useState("");
  const [osamenta, setosamenta] = useState("");

  const [lr, setlr] = useState("");
  const [posterior, setposterior] = useState("");
  const [locisAlelosUtiles, setlocisAlelosUtiles] = useState();

  const [comboBaseInfo, setcomboBaseInfo] = useState();
  const [comboprogramaIdent, setcomboprogramaIdent] = useState();
  const [comboestadoCoincidencia, setcomboestadoCoincidencia] = useState();
  const [comboestadoInvestigacion, setcomboestadoInvestigacion] = useState();
  const [combotipoCasoDid, setcombotipoCasoDid] = useState();
  const [combotipoContexto, setcombotipoContexto] = useState();
  const [combocalidadPerfil, setcombocalidadPerfil] = useState();

  const [combosexoAdnId, setcombosexoAdnId] = useState();
  const [collapseVD1, setcollapseVD1] = useState(false);
  const [collapseVD11, setcollapseVD11] = useState(false);
  const [collapseVD12, setcollapseVD12] = useState(false);

  const [fechaCoincidenciaIni, setfechaCoincidenciaIni] = useState("");
  const [fechaCoincidenciaFin, setfechaCoincidenciaFin] = useState("");
  const [fechaNotificacionDidIni, setfechaNotificacionDidIni] = useState("");
  const [fechaNotificacionDidFin, setfechaNotificacionDidFin] = useState("");
  const [fechaConfExcIni, setfechaConfExcIni] = useState("");
  const [fechaConfExcFin, setfechaConfExcFin] = useState("");
  const [initPage, setinitPage] = useState(false);

  const reset = () => {
    setbaseInfoId(-1);
    setprogramaIdentId(-1);
    setestadoCoincidenciaId(-1);
    setestadoInvestigacionId(-1);
    settipoCasoDidId(-1);
    settipoContextoId(-1);
    setsexoAdnId(-1);
    setcalidadPerfilId(-1);

    setcoincidenciaId("");
    setcasoId("");

    setcodigoVictima("");
    setnombreVictima("");
    setosamenta("");

    setlr("");
    setposterior("");
    setlocisAlelosUtiles("");

    setfechaCoincidenciaIni("");
    setfechaCoincidenciaFin("");
    setfechaNotificacionDidIni("");
    setfechaNotificacionDidFin("");
    setfechaConfExcIni("");
    setfechaConfExcFin("");
    setinitPage(false);
    
  };
  const porcentajeCoincidencia = (row) => {
    let conteoVacio = 0;
    let conteoTotal = 11;
    if (row.apriori == null || row.apriori === "" || row.apriori === "null") {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.baseInfoId == null ||
      row.baseInfoId === "" ||
      row.baseInfoId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.cromosomaYId == null ||
      row.cromosomaYId === "" ||
      row.cromosomaYId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.estadoCoincidenciaId == null ||
      row.estadoCoincidenciaId === "" ||
      row.estadoCoincidenciaId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.estadoInvestigacionId == null ||
      row.estadoInvestigacionId === "" ||
      row.estadoInvestigacionId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaCoincidencia == null ||
      row.fechaCoincidencia === "" ||
      row.fechaCoincidencia === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaConfExc == null ||
      row.fechaConfExc === "" ||
      row.fechaConfExc === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaNotificacionDid == null ||
      row.fechaNotificacionDid === "" ||
      row.fechaNotificacionDid === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (row.lr == null || row.lr === "" || row.lr === "null") {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.posterior == null ||
      row.posterior === "" ||
      row.posterior === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.programaIdentId == null ||
      row.programaIdentId === "" ||
      row.programaIdentId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (conteoVacio === 0) {
      return 100;
    }

    let resultado = parseInt(
      conteoTotal * ((conteoTotal - conteoVacio) / 100) * 100
    );

    return resultado;
  };

  const handleGeneraReporte = (e) => {
    e.preventDefault();
    setdataDownload([]);

    fetchCoincidenciasTemp(10000000, 0, "", user.token);
    setinitPage(true);
    fetchData(10, 0, "", user.token);
  };
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };

  const fetchCoincidenciasTemp = async (
    pageSize,
    pageIndex,
    searchValue,
    token
  ) => {
    if (searchValue === undefined) searchValue = "";
    try {
      var dataC = {
        pagina: pageIndex,
        limite: pageSize,
        coincidenciaId:
          coincidenciaId == null || coincidenciaId == "" ? -1 : coincidenciaId,
        casoId: casoId == null || casoId == "" ? -1 : casoId,
        osamenta: osamenta,
        sexoAdnId: sexoAdnId,
        locisAlelosUtiles:
          locisAlelosUtiles == null || locisAlelosUtiles == ""
            ? -1
            : locisAlelosUtiles,

        codigoVictima: codigoVictima,
        nombreVictima: nombreVictima,
        lr: lr,
        posterior: posterior,
        baseInfoId: baseInfoId,
        programaIdentId: programaIdentId,
        estadoCoincidenciaId: estadoCoincidenciaId,
        estadoInvestigacionId: estadoInvestigacionId,

        tipoCasoDidId: tipoCasoDidId,
        tipoContextoId: tipoContextoId,
        calidadPerfilId: calidadPerfilId,
        estadoId: -1,
        usuarioIngresoId: -1,
        fechaCoincidenciaIni: !(fechaCoincidenciaIni === "")
          ? `'${moment(fechaCoincidenciaIni).format("YYYY-MM-DD")}'`
          : null,
        fechaCoincidenciaFin: !(fechaCoincidenciaFin === "")
          ? `'${moment(fechaCoincidenciaFin).format("YYYY-MM-DD")}'`
          : null,
        fechaNotificacionDidIni: !(fechaNotificacionDidIni === "")
          ? `'${moment(fechaNotificacionDidIni).format("YYYY-MM-DD")}'`
          : null,
        fechaNotificacionDidFin: !(fechaNotificacionDidFin === "")
          ? `'${moment(fechaNotificacionDidFin).format("YYYY-MM-DD")}'`
          : null,
        fechaConfExcIni: !(fechaConfExcIni === "")
          ? `'${moment(fechaConfExcIni).format("YYYY-MM-DD")}'`
          : null,
        fechaConfExcFin: !(fechaConfExcFin === "")
          ? `'${moment(fechaConfExcFin).format("YYYY-MM-DD")}'`
          : null,
      };

      const res = await axios.post(
        `${config.urlApi}/reporte/coincidencia`,
        dataC,
        configReq
      );
      setdataRep(res.data.data.rows);
    } catch (error) {
      setLoading(false);
      try {
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
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchCoincidencias = async (
    pageSize,
    pageIndex,
    searchValue,
    token,
    dataSearch
  ) => {
    if (searchValue === undefined) searchValue = "";
    try {
      setLoading(true);

      var dataC = {
        pagina: pageIndex,
        limite: pageSize,
        coincidenciaId:
          coincidenciaId == null || coincidenciaId == "" ? -1 : coincidenciaId,
        casoId: casoId == null || casoId == "" ? -1 : casoId,
        osamenta: osamenta,
        sexoAdnId: sexoAdnId,
        locisAlelosUtiles:
          locisAlelosUtiles == null || locisAlelosUtiles == ""
            ? -1
            : locisAlelosUtiles,

        codigoVictima: codigoVictima,
        nombreVictima: nombreVictima,
        lr: lr,
        posterior: posterior,
        baseInfoId: baseInfoId,
        programaIdentId: programaIdentId,
        estadoCoincidenciaId: estadoCoincidenciaId,
        estadoInvestigacionId: estadoInvestigacionId,

        tipoCasoDidId: tipoCasoDidId,
        tipoContextoId: tipoContextoId,
        calidadPerfilId: calidadPerfilId,
        estadoId: -1,
        usuarioIngresoId: -1,
        fechaCoincidenciaIni: !(fechaCoincidenciaIni === "")
          ? `'${moment(fechaCoincidenciaIni).format("YYYY-MM-DD")}'`
          : null,
        fechaCoincidenciaFin: !(fechaCoincidenciaFin === "")
          ? `'${moment(fechaCoincidenciaFin).format("YYYY-MM-DD")}'`
          : null,
        fechaNotificacionDidIni: !(fechaNotificacionDidIni === "")
          ? `'${moment(fechaNotificacionDidIni).format("YYYY-MM-DD")}'`
          : null,
        fechaNotificacionDidFin: !(fechaNotificacionDidFin === "")
          ? `'${moment(fechaNotificacionDidFin).format("YYYY-MM-DD")}'`
          : null,
        fechaConfExcIni: !(fechaConfExcIni === "")
          ? `'${moment(fechaConfExcIni).format("YYYY-MM-DD")}'`
          : null,
        fechaConfExcFin: !(fechaConfExcFin === "")
          ? `'${moment(fechaConfExcFin).format("YYYY-MM-DD")}'`
          : null,
      };
      const res = await axios.post(
        `${config.urlApi}/reporte/coincidencia`,
        dataC,
        configReq
      );
      settotalRegisters(res.data.data.count);

      setData(res.data.data.rows);
      setPageCount(Math.ceil(res.data.data.count / pageSize));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      try {
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
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);

    if (catalogo == "baseInfo") setcomboBaseInfo(result.data);
    if (catalogo == "programaIdent") setcomboprogramaIdent(result.data);
    if (catalogo == "estadoCoincidencia")
      setcomboestadoCoincidencia(result.data);
    if (catalogo == "estadoInvestigacion")
      setcomboestadoInvestigacion(result.data);
    if (catalogo == "tipoCasoDid") setcombotipoCasoDid(result.data);
    if (catalogo == "tipoContexto") setcombotipoContexto(result.data);
    if (catalogo == "sexoAdn") setcombosexoAdnId(result.data);
    if (catalogo == "calidadPerfil") setcombocalidadPerfil(result.data);
  };

  useEffect(() => {
    if (!(props.dataCaso === null)) {
      fetchCatalogo("baseInfo");
      fetchCatalogo("programaIdent");
      fetchCatalogo("estadoCoincidencia");
      fetchCatalogo("estadoInvestigacion");
      fetchCatalogo("tipoCasoDid");
      fetchCatalogo("tipoContexto");
      fetchCatalogo("sexoAdn");
      fetchCatalogo("calidadPerfil");
    }
    return () => {};
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "-",
        columns: [
          {
            Header: "Id",
            accessor: "coincidenciaId",
          },
          {
            Header: "F. Coin.",
            accessor: (d) => {
              return moment(d.fechaCoincidencia).utc().format("DD-MM-YYYY");
            },
          },
          {
            Header: "Osamenta",
            Cell: ({row}) => (
              <div className="text-center">
                {`CRIH-${row.original.Osamenta.casoId}-${row.original.Osamenta.fosaDet}-${row.original.Osamenta.osamentaDet}`}
              </div>
            ),
          },
          {
            Header: "Victima",
            accessor: "Victima.codigoVictima",
          },
          {
            Header: "Nombre",
            accessor: "Victima.nombreVictima",
          },
        ],
      },
      {
        Header: "Estadístico",
        style: {
          borderRight: "2px solid black",
          borderLeft: "2px solid black",
        },
        columns: [
          {
            Header: "INDICE FILIACION",
            accessor: "lr",
            style: {
              borderLeft: "2px solid black",
            },
          },
          {
            Header: "Apriori",
            accessor: "apriori",
          },
          {
            Header: "Posterior",
            accessor: "posterior",
            style: {
              borderRight: "2px solid black",
            },
          },
        ],
      },

      {
        Header: "-",
        columns: [
          {
            Header: "F. Conf/Exc",

            accessor: (d) => {
              return moment(d.fechaConfExc).utc().format("DD-MM-YYYY");
            },
          },

          {
            Header: "Estado",
            accessor: "EstadoCoincidencia.descripcion",
          } /*
          {
            Header: "Cromosoma Y",
            accessor: "cromosomaYId",
            Cell: ({value}) => (
              <div className="text-center">
                <Badge variant={getBadge(value)}>
                  {value === 0 ? "No" : value === 1 ? "Si" : "--"}
                </Badge>
              </div>
            ),
          },*/,
          {
            Header: "Tipo Caso",
            accessor: (d) => {
              let tipocaso =
                d.TipoCasoDid === null ? "" : d.TipoCasoDid.descripcion;
              return tipocaso;
            },
          },
          {
            Header: "Contexto",
            accessor: (d) => {
              let TipoContexto =
                d.TipoContexto === null ? "" : d.TipoContexto.descripcion;
              return TipoContexto;
            },
          },
          {
            Header: "Progreso",
            className: "vertical-align:middle",
            accessor: (row) => {
              var porcentaje = porcentajeCoincidencia(row);

              return <div className="text-center">{porcentaje}</div>;
            },
          },
        ],
      },
    ],
    []
  );

  const fetchIdRef = React.useRef(0);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  const fetchData2 = React.useCallback(({pageSize, pageIndex, searchValue}) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      fetchCoincidencias(pageSize, pageIndex, searchValue, user.token);
    }
  }, []);

  const fetchData = ({pageSize, pageIndex, searchValue}) => {
    fetchCoincidencias(pageSize, pageIndex, searchValue, user.token);
  };

  useEffect(() => {
    var dataTemp = [];
    if (dataRep.length > 0) {
      dataRep.map((row) => {
        dataTemp.push({
          coincidenciaId: row.coincidenciaId,
          EstadoCoincidencia: row.EstadoCoincidencia
            ? row.EstadoCoincidencia.descripcion
            : "",

          fechaCoincidencia: !(row.fechaCoincidencia === "")
            ? `${moment(row.fechaCoincidencia).format("YYYY-MM-DD")}`
            : null,
          fechaNotificacionDid: !(row.fechaNotificacionDid === "")
            ? `${moment(row.fechaNotificacionDid).format("YYYY-MM-DD")}`
            : null,
          fechaConfExc: !(row.fechaConfExc === "")
            ? `${moment(row.fechaConfExc).format("YYYY-MM-DD")}`
            : null,

          Osamenta: `CRIH-${row.Osamenta.casoId}-${row.Osamenta.fosaDet}-${row.Osamenta.osamentaDet}`,
          OsamentaSexoAdn: !(row.Osamenta.SexoAdn === null)
            ? row.Osamenta.SexoAdn.descripcion
            : null,
          codigoVictima: row.Victima.codigoVictima,
          nombreVictima: row.Victima.nombreVictima,
          lr: row.lr,
          apriori: row.apriori,
          posterior: row.posterior,
          marcadoresStr: row.marcadoresStr,
          BaseInfo: row.BaseInfo ? row.BaseInfo.descripcion : "",
          ProgramaIdent: row.ProgramaIdent ? row.ProgramaIdent.descripcion : "",
          EstadoInvestigacion: row.EstadoInvestigacion
            ? row.EstadoInvestigacion.descripcion
            : "",
          CromosomaY: row.CromosomaY ? row.CromosomaY.descripcion : "",

          TipoContexto: !(row.TipoContexto === "" || row.TipoContexto === null)
            ? row.TipoContexto.descripcion
            : "",
          CalidadPerfil: !(
            row.CalidadPerfil === "" || row.CalidadPerfil === null
          )
            ? row.CalidadPerfil.descripcion
            : "",
          Usuario: row.Usuario.usuario,
        });
      });
    }
    setdataDownload(dataTemp);
    return () => {};
  }, [dataRep]);

  useEffect(() => {
    fetchCoincidenciasTemp(10000000, 0, "", user.token);
  }, []);
  const [collapseData, setCollapseData] = useState(true);
  const [collapseGraficas, setCollapseGraficas] = useState(false);
  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <Card title="Reporte coincidencias" isOption>
              <Row>
                <Col xl={12}>
                  <Row className="rowFiltros rowFiltros-primary">
                    <Col
                      className="bordeSeccion btn btnSeccion"
                      onClick={(e) => {
                        setCollapseData(!collapseData);
                      }}
                      aria-expanded={collapseData}
                    >
                      <h6>Información</h6>
                    </Col>
                  </Row>
                  {collapseData == true && (
                    <>
                      <br></br>
                      <ValidationForm
                        onSubmit={handleOnSubmit}
                        setFocusOnError
                        defaultErrorMessage={{
                          required: "El campo es requerido.",
                          minLength:
                            "Ingresar por lo menos {minLength} caracteres",
                        }}
                      >
                        <Row className="rowFiltros rowFiltros-primary">
                          <Col
                            className="bordeSeccion btn btnSeccion"
                            onClick={(e) => {
                              setcollapseVD1(!collapseVD1);
                            }}
                            aria-expanded={collapseVD1}
                          >
                            <h6>Filtros</h6>
                          </Col>
                        </Row>
                        <Row>
                          <Collapse in={collapseVD1}>
                            <div id="collapseVD1" className="col-12">
                              <Row className="rowFiltros rowFiltros-primary">
                                <Col
                                  className="bordeSeccion-warning  btn btnSeccion-warning "
                                  onClick={(e) => {
                                    setcollapseVD11(!collapseVD11);

                                    setcollapseVD12(false);
                                  }}
                                  aria-expanded={collapseVD11}
                                >
                                  <h6>Campos</h6>
                                </Col>
                              </Row>
                              <Row>
                                <Collapse in={collapseVD11}>
                                  <div id="collapseVD11" className="col-12">
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Base de datos</Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="baseInfoId"
                                            id="baseInfoId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(baseInfoId === undefined)
                                                ? baseInfoId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setbaseInfoId(e.target.value);
                                            }}
                                          >
                                            <option key="-1" value="-1">
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
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Programa</Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="programaIdentId"
                                            className="rowFiltros-control"
                                            id="programaIdentId"
                                            required
                                            value={
                                              !(programaIdentId === undefined)
                                                ? programaIdentId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setprogramaIdentId(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <option key="-1" value="-1">
                                              ---Seleccione una opcion---
                                            </option>
                                            {!(comboprogramaIdent === undefined)
                                              ? comboprogramaIdent.map(
                                                  (fbb) => (
                                                    <option
                                                      key={fbb.programaIdentId}
                                                      value={
                                                        fbb.programaIdentId
                                                      }
                                                    >
                                                      {fbb.descripcion}
                                                    </option>
                                                  )
                                                )
                                              : null}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Estado Coincidencia
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="estadoCoincidenciaId"
                                            id="estadoCoincidenciaId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(
                                                estadoCoincidenciaId ===
                                                undefined
                                              )
                                                ? estadoCoincidenciaId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setestadoCoincidenciaId(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <option key="-1" value="-1">
                                              ---Seleccione una opcion---
                                            </option>
                                            {!(
                                              comboestadoCoincidencia ===
                                              undefined
                                            )
                                              ? comboestadoCoincidencia.map(
                                                  (fbb) => (
                                                    <option
                                                      key={
                                                        fbb.estadoCoincidenciaId
                                                      }
                                                      value={
                                                        fbb.estadoCoincidenciaId
                                                      }
                                                    >
                                                      {fbb.descripcion}
                                                    </option>
                                                  )
                                                )
                                              : null}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Estado Investigacion
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="estadoInvestigacionId"
                                            id="estadoInvestigacionId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(
                                                estadoInvestigacionId ===
                                                undefined
                                              )
                                                ? estadoInvestigacionId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setestadoInvestigacionId(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <option key="-1" value="-1">
                                              ---Seleccione una opcion---
                                            </option>
                                            {!(
                                              comboestadoInvestigacion ===
                                              undefined
                                            )
                                              ? comboestadoInvestigacion.map(
                                                  (fbb) => (
                                                    <option
                                                      key={
                                                        fbb.estadoInvestigacionId
                                                      }
                                                      value={
                                                        fbb.estadoInvestigacionId
                                                      }
                                                    >
                                                      {fbb.descripcion}
                                                    </option>
                                                  )
                                                )
                                              : null}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Tipo Caso Did</Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="tipocasoDid"
                                            id="tipocasoDid"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(tipoCasoDidId === undefined)
                                                ? tipoCasoDidId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              settipoCasoDidId(e.target.value);
                                            }}
                                          >
                                            <option key="-1" value="-1">
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
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Tipo Contexto</Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="tipocontextoId"
                                            id="tipocontextoId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(tipoContextoId === undefined)
                                                ? tipoContextoId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              settipoContextoId(e.target.value);
                                            }}
                                          >
                                            <option key="-1" value="-1">
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
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Sexo ADN</Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="sexoAdnId"
                                            id="sexoAdnId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(sexoAdnId === undefined)
                                                ? sexoAdnId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setsexoAdnId(e.target.value);
                                            }}
                                          >
                                            <option key="-1" value="-1">
                                              ---Seleccione una opcion---
                                            </option>
                                            {!(combosexoAdnId === undefined)
                                              ? combosexoAdnId.map((fbb) => (
                                                  <option
                                                    key={fbb.sexoAdnId}
                                                    value={fbb.sexoAdnId}
                                                  >
                                                    {fbb.descripcion}
                                                  </option>
                                                ))
                                              : null}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Calidad Perfil
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            name="calidadPerfilId"
                                            id="calidadPerfilId"
                                            className="rowFiltros-control"
                                            required
                                            value={
                                              !(calidadPerfilId === undefined)
                                                ? calidadPerfilId
                                                : ""
                                            }
                                            onChange={(e) => {
                                              setcalidadPerfilId(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <option key="-1" value="-1">
                                              ---Seleccione una opcion---
                                            </option>
                                            {!(combocalidadPerfil === undefined)
                                              ? combocalidadPerfil.map(
                                                  (fbb) => (
                                                    <option
                                                      key={fbb.calidadPerfilId}
                                                      value={
                                                        fbb.calidadPerfilId
                                                      }
                                                    >
                                                      {fbb.descripcion}
                                                    </option>
                                                  )
                                                )
                                              : null}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Coincidencia</Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="number"
                                            name="coincidenciaId"
                                            id="coincidenciaId"
                                            value={coincidenciaId}
                                            onChange={(e) => {
                                              setcoincidenciaId(e.target.value);
                                            }}
                                            placeholder="Caso Id"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Caso Id</Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="number"
                                            name="casoId"
                                            value={casoId}
                                            onChange={(e) => {
                                              setcasoId(e.target.value);
                                            }}
                                            id="casoId"
                                            placeholder="Caso"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Codigo Victima
                                          </Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="text"
                                            name="codigoVictima"
                                            value={codigoVictima}
                                            onChange={(e) => {
                                              setcodigoVictima(e.target.value);
                                            }}
                                            id="codigoVictima"
                                            placeholder="Codigo Victima"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Nombre Victima
                                          </Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="text"
                                            name="nombreVictima"
                                            value={nombreVictima}
                                            onChange={(e) => {
                                              setnombreVictima(e.target.value);
                                            }}
                                            id="nombreVictima"
                                            placeholder="Nombre Victima"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Osamenta</Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="text"
                                            name="osamenta"
                                            value={osamenta}
                                            onChange={(e) => {
                                              setosamenta(e.target.value);
                                            }}
                                            id="osamenta"
                                            placeholder="Osamenta"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>LR</Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="text"
                                            name="lr"
                                            value={lr}
                                            onChange={(e) => {
                                              setlr(e.target.value);
                                            }}
                                            id="lr"
                                            placeholder="LR"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Posterior</Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="text"
                                            name="posterior"
                                            value={posterior}
                                            onChange={(e) => {
                                              setposterior(e.target.value);
                                            }}
                                            id="posterior"
                                            placeholder="posterior"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Locis AlelosUtiles
                                          </Form.Label>
                                          <Form.Control
                                            size="sm"
                                            type="number"
                                            name="locisAlelosUtiles"
                                            value={locisAlelosUtiles}
                                            onChange={(e) => {
                                              setlocisAlelosUtiles(
                                                e.target.value
                                              );
                                            }}
                                            id="locisAlelosUtiles"
                                            placeholder="Locis AlelosUtiles"
                                            className="rowFiltros-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </div>
                                </Collapse>
                              </Row>
                              <Row className="rowFiltros rowFiltros-primary">
                                <Col
                                  className="bordeSeccion-warning  btn btnSeccion-warning "
                                  onClick={(e) => {
                                    setcollapseVD12(!collapseVD12);

                                    setcollapseVD11(false);
                                  }}
                                  aria-expanded={collapseVD12}
                                >
                                  <h6>Fechas</h6>
                                </Col>
                              </Row>
                              <Row>
                                <Collapse in={collapseVD12}>
                                  <div id="collapseVD12" className="col-12">
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Coincidencia Inicio
                                          </Form.Label>
                                          <Datetime
                                            id="fechaCoincidenciaIni"
                                            name="fechaCoincidenciaIni"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder:
                                                "Fecha Coincidencia ",
                                            }}
                                            value={fechaCoincidenciaIni}
                                            onChange={(e) => {
                                              setfechaCoincidenciaIni(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Coincidencia Fin
                                          </Form.Label>
                                          <Datetime
                                            id="fechaCoincidenciaFin"
                                            name="fechaCoincidenciaFin"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder:
                                                "Fecha Coincidencia ",
                                            }}
                                            value={fechaCoincidenciaFin}
                                            onChange={(e) => {
                                              setfechaCoincidenciaFin(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Notificacion Inicio
                                          </Form.Label>
                                          <Datetime
                                            id="fechaNotificacionDidIni"
                                            name="fechaNotificacionDidIni"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder:
                                                "Fecha Notificacion ",
                                            }}
                                            value={fechaNotificacionDidIni}
                                            onChange={(e) => {
                                              setfechaNotificacionDidIni(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Notificacion Fin
                                          </Form.Label>
                                          <Datetime
                                            id="fechaNotificacionDidFin"
                                            name="fechaNotificacionDidFin"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder:
                                                "Fecha Notificacion ",
                                            }}
                                            value={fechaNotificacionDidFin}
                                            onChange={(e) => {
                                              setfechaNotificacionDidFin(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>

                                    <Row className="rowFiltros rowFiltros-primary">
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>
                                            Conf/Exc Inicio
                                          </Form.Label>
                                          <Datetime
                                            id="fechaConfExcIni"
                                            name="fechaConfExcIni"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder: "Fecha Conf/Exc",
                                            }}
                                            value={fechaConfExcIni}
                                            onChange={(e) => {
                                              setfechaConfExcIni(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col sm>
                                        <Form.Group>
                                          <Form.Label>Conf/Exc Fin</Form.Label>
                                          <Datetime
                                            id="fechaConfExcFin"
                                            name="fechaConfExcFin"
                                            defaultValue=""
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat={false}
                                            inputProps={{
                                              placeholder: "Fecha Conf/Exc",
                                            }}
                                            value={fechaConfExcFin}
                                            onChange={(e) => {
                                              setfechaConfExcFin(e);
                                            }}
                                            isValidDate={validDate}
                                            renderInput={renderInputFecha}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </div>
                                </Collapse>
                              </Row>
                            </div>
                          </Collapse>
                        </Row>

                        <Row className="rowFiltros ">
                          <Col></Col>
                          <Col className=" d-flex justify-content-center">
                            <Button
                              key="btnn"
                              type="submit"
                              variant="outline-primary"
                              size="sm"
                              onClick={handleGeneraReporte}
                            >
                              <i className="feather icon-file" />
                              Generar
                            </Button>
                            <Button
                              key="btnReset"
                              type="submit"
                              variant="outline-primary"
                              size="sm"
                              onClick={reset}
                            >
                              <i className="feather icon-refresh-ccw" />
                              Limpiar
                            </Button>
                          </Col>
                          <Col className="">
                            <nav className="pull-right">
                              <ul className="pagination ">
                                <li className="paginate_Button page-item">
                                  {dataDownload.length > 0 && (
                                    <JsonToExcel
                                      data={dataDownload}
                                      fileformat="csv"
                                      className="btn-icon btn btn-outline-success btn-sm"
                                      filename={filename}
                                      fields={fields}
                                      text={text}
                                    />
                                  )}
                                </li>
                              </ul>
                            </nav>
                          </Col>
                        </Row>

                        <Row className=" ">
                          <Col>
                            <TablaGenerica
                              columns={columns}
                              reset={initPage}
                              data={data}
                              fetchData={fetchData}
                              loading={loading}
                              pageCount={pageCount}
                              className="animated fadeIn table-sm"
                              totalRegis={totalRegisters}
                            />
                          </Col>
                        </Row>
                      </ValidationForm>
                    </>
                  )}
                  <Row className="rowFiltros rowFiltros-primary">
                    <Col
                      className="btn btnSeccionGraph"
                      onClick={(e) => {
                        setCollapseGraficas(!collapseGraficas);
                      }}
                      aria-expanded={collapseGraficas}
                    >
                      <h6>Gráficas</h6>
                      <Chart {...avgChart1} />
                    </Col>
                  </Row>
                  <br></br>
                  {collapseGraficas === true && dataRep && (
                    <GraficasCoincidencia data={dataRep} />
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Aux>
    </div>
  );
}

export default ReporteCoincidencia;
