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

import "./reportes.css";
import {IdentificadoOst} from "../../App/components/charts/fafgCharts/Coincidencia/IdentificadoOst";

function ReporteIOst(props) {
  const renderInput = (props, openCalendar, closeCalendar) => {
    function clear() {
      props.onChange({target: {value: ""}});
    }
    return (
      <div>
        <InputGroup className="input-group-sm">
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

  const filename = "reporteIOsteo",
    fields = {
      IdentificadoOstId: "IdentificadoOstId",
      SesionIdentificacion: "SesionIdentificacion",
      Osamenta: "Osamenta",
      CodigoVictima: "CodigoVictima",
      NombreVictima: "NombreVictima",
      Sexo: "Sexo",
      GrupoEtario: "GrupoEtario",
      GrupoEtnolinguistico: "GrupoEtnolinguistico",
      TipoCasoDid: "TipoCasoDid",
      DesaparicionAldea: "DesaparicionAldea ",
      DesaparicionMunicipio: "DesaparicionMuni",
      DesaparicionDepartamento: "DesaparicionDepto",
      DesaparicionDia: "DesaparicionDia",
      DesaparicionMes: "DesaparicionMes",
      DesaparicionAnio: "DesaparicionAnio",
      FechaConfirmacion: "FechaConfirmacion",
      FechaInfoFamilia: "FechaInfoFamilia",
      FechaDictamen: "FechaDictamen",
      FechaInhumacion: "FechaInhumacion",
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
  const [casoIdentificado, setcasoIdentificado] = useState();
  const [tipoCasoDidId, settipoCasoDidId] = React.useState(-1);
  const [sesionIdentificacion, setsesionIdentificacion] = useState("");
  const [lr, setlr] = useState("");
  const [posterior, setposterior] = useState("");
  const [sexoId, setsexoId] = React.useState(-1);
  const [grupoEtarioId, setgrupoEtarioId] = useState(-1);
  const [combogrupoEtario, setcombogrupoEtario] = useState();
  const [grupoEtnolinguisticoId, setgrupoEtnolinguisticoId] = useState(-1);
  const [combogrupoEtnolinguistico, setcombogrupoEtnolinguistico] = useState();

  const [desaparicionDeptoId, setdesaparicionDeptoId] = useState(-1);
  const [desaparicionMuniId, setdesaparicionMuniId] = useState(-1);
  const [desaparicionAldea, setdesaparicionAldea] = useState("");
  const [desaparicionDia, setdesaparicionDia] = useState();
  const [desaparicionMes, setdesaparicionMes] = useState();
  const [desaparicionAnio, setdesaparicionAnio] = useState();

  const [comboDepartamento, setcomboDepartamento] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();

  //VICTIMA
  const [codigoVictima, setcodigoVictima] = useState("");
  const [nombreVictima, setnombreVictima] = useState("");
  const [residenciaDeptoId, setresidenciaDeptoId] = useState(-1);
  const [residenciaMuniId, setresidenciaMuniId] = useState(-1);
  const [residenciaAldea, setresidenciaAldea] = useState("");

  //OSAMENTA
  const [osamenta, setosamenta] = useState("");
  const [fosa, setfosa] = useState("");
  const [exhumacionDeptoId, setexhumacionDeptoId] = useState(-1);
  const [exhumacionMuniId, setexhumacionMuniId] = useState(-1);
  const [exhumacionAldea, setexhumacionAldea] = useState("");
  const [coordenadasExhumacion, setcoordenadasExhumacion] = useState("");

  const [combotipoCasoDid, setcombotipoCasoDid] = useState();

  const [combogeneroId, setcombogeneroId] = useState();
  const [collapseVD1, setcollapseVD1] = useState(false);
  const [collapseVD11, setcollapseVD11] = useState(false);
  const [collapseVD12, setcollapseVD12] = useState(false);
  const [collapseVD13, setcollapseVD13] = useState(false);
  const [collapseVD14, setcollapseVD14] = useState(false);

  const [fechaConfirmacionIni, setfechaConfirmacionIni] = useState("");
  const [fechaConfirmacionFin, setfechaConfirmacionFin] = useState("");
  const [fechaInfoFamiliaIni, setfechaInfoFamiliaIni] = useState("");
  const [fechaInfoFamiliaFin, setfechaInfoFamiliaFin] = useState("");
  const [fechaDictamenIni, setfechaDictamenIni] = useState("");
  const [fechaDictamenFin, setfechaDictamenFin] = useState("");
  const [fechaInhumacionIni, setfechaInhumacionIni] = useState("");
  const [fechaInhumacionFin, setfechaInhumacionFin] = useState("");

  const [fechaExhumacionIni, setfechaExhumacionIni] = useState("");
  const [fechaExhumacionFin, setfechaExhumacionFin] = useState("");
  const [initPage, setinitPage] = useState(false);

  const porcentajeIdentificadoOst = (row) => {
    let conteoVacio = 0;
    let conteoTotal = 34;

    if (
      row.osamentaFosa == null ||
      row.osamentaFosa === "" ||
      row.osamentaFosa === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.fechaConfirmacion == null ||
      row.fechaConfirmacion === "" ||
      row.fechaConfirmacion === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaInfoFamilia == null ||
      row.fechaInfoFamilia === "" ||
      row.fechaInfoFamilia === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaDictamen == null ||
      row.fechaDictamen === "" ||
      row.fechaDictamen === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.fechaEntrevistaAM == null ||
      row.fechaEntrevistaAM === "" ||
      row.fechaEntrevistaAM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.fechaAnalisisOst == null ||
      row.fechaAnalisisOst === "" ||
      row.fechaAnalisisOst === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (row.sexoId == null || row.sexoId === "" || row.sexoId === "null") {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.grupoEtarioId == null ||
      row.grupoEtarioId === "" ||
      row.grupoEtarioId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.grupoEtnolinguisticoId == null ||
      row.grupoEtnolinguisticoId === "" ||
      row.grupoEtnolinguisticoId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.tipoCasoDidId == null ||
      row.tipoCasoDidId === "" ||
      row.tipoCasoDidId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.fechaInhumacion == null ||
      row.fechaInhumacion === "" ||
      row.fechaInhumacion === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.desaparicionAldea == null ||
      row.desaparicionAldea === "" ||
      row.desaparicionAldea === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.desaparicionMuniId == null ||
      row.desaparicionMuniId === "" ||
      row.desaparicionMuniId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.desaparicionDeptoId == null ||
      row.desaparicionDeptoId === "" ||
      row.desaparicionDeptoId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.desaparicionDia == null ||
      row.desaparicionDia === "" ||
      row.desaparicionDia === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.desaparicionMes == null ||
      row.desaparicionMes === "" ||
      row.desaparicionMes === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.desaparicionAnio == null ||
      row.desaparicionAnio === "" ||
      row.desaparicionAnio === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.sesionIdentificacion == null ||
      row.sesionIdentificacion === "" ||
      row.sesionIdentificacion === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.fechaReporteDid == null ||
      row.fechaReporteDid === "" ||
      row.fechaReporteDid === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.fechaReporteGenetica == null ||
      row.fechaReporteGenetica === "" ||
      row.fechaReporteGenetica === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (row.edadAM == null || row.edadAM === "" || row.edadAM === "null") {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.valorEdadAM == null ||
      row.valorEdadAM === "" ||
      row.valorEdadAM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.anotacionAM == null ||
      row.anotacionAM === "" ||
      row.anotacionAM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.rangoMinimoPM == null ||
      row.rangoMinimoPM === "" ||
      row.rangoMinimoPM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    if (
      row.valorEdadPM == null ||
      row.valorEdadPM === "" ||
      row.valorEdadPM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.anotacionPM == null ||
      row.anotacionPM === "" ||
      row.anotacionPM === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.traumaCircId == null ||
      row.traumaCircId === "" ||
      row.traumaCircId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.datosOdontId == null ||
      row.datosOdontId === "" ||
      row.datosOdontId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.anotacionDatosOdont == null ||
      row.anotacionDatosOdont === "" ||
      row.anotacionDatosOdont === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.regionAnatomicaId == null ||
      row.regionAnatomicaId === "" ||
      row.regionAnatomicaId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.causaMuerteId == null ||
      row.causaMuerteId === "" ||
      row.causaMuerteId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.observaciones == null ||
      row.observaciones === "" ||
      row.observaciones === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.resumenHecho == null ||
      row.resumenHecho === "" ||
      row.resumenHecho === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    let resultado = parseInt(((conteoTotal - conteoVacio) / conteoTotal) * 100);

    return resultado;
  };

  const handleGeneraReporte = (e) => {
    e.preventDefault();
    setdataDownload([]);

    fetchIdentificadosRep(100000, 0, "", user.token);
    setinitPage(true);
    fetchData(10, 0, "", user.token);
  };
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };

  const reset = () => {
    setcasoIdentificado("");
    settipoCasoDidId(-1);
    setsesionIdentificacion("");
    setlr("");
    setposterior("");
    setsexoId(-1);
    setgrupoEtarioId(-1);
    setgrupoEtnolinguisticoId(-1);

    setdesaparicionDeptoId(-1);
    setdesaparicionMuniId(-1);
    setdesaparicionAldea("");
    setdesaparicionDia("");
    setdesaparicionMes("");
    setdesaparicionAnio("");

    setcodigoVictima("");
    setnombreVictima("");
    setresidenciaDeptoId(-1);
    setresidenciaMuniId(-1);
    setresidenciaAldea("");

    setosamenta("");
    setfosa("");
    setexhumacionDeptoId(-1);
    setexhumacionMuniId(-1);
    setexhumacionAldea("");
    setcoordenadasExhumacion("");

    setfechaConfirmacionIni("");
    setfechaConfirmacionFin("");
    setfechaInfoFamiliaIni("");
    setfechaInfoFamiliaFin("");
    setfechaDictamenIni("");
    setfechaDictamenFin("");
    setfechaInhumacionIni("");
    setfechaInhumacionFin("");

    setfechaExhumacionIni("");
    setfechaExhumacionFin("");
    setinitPage(false);
  };

  const fetchIdentificadosRep = async (
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
        casoIdentificado:
          casoIdentificado == null || casoIdentificado == ""
            ? -1
            : parseInt(casoIdentificado),
        codigoVictima: codigoVictima,
        nombreVictima: nombreVictima,
        residenciaAldea: residenciaAldea,
        residenciaMuniId: residenciaMuniId,
        residenciaDeptoId: residenciaDeptoId,
        osamenta: osamenta,
        fosa: fosa,
        exhumacionAldea: exhumacionAldea,
        exhumacionMuniId: exhumacionMuniId,
        exhumacionDeptoId: exhumacionDeptoId,
        coordenadasExhumacion: coordenadasExhumacion,
        lr: lr,
        posterior: posterior,
        sexoId: sexoId,
        grupoEtarioId: grupoEtarioId,
        grupoEtnolinguisticoId: grupoEtnolinguisticoId,
        tipoCasoDidId: tipoCasoDidId,

        desaparicionAldea: desaparicionAldea,
        desaparicionMuniId: desaparicionMuniId,
        desaparicionDeptoId: desaparicionDeptoId,
        desaparicionDia:
          desaparicionDia == null ||
          desaparicionDia == "" ||
          desaparicionDia == undefined
            ? -1
            : parseInt(desaparicionDia),
        desaparicionMes:
          desaparicionMes == null ||
          desaparicionMes == "" ||
          desaparicionMes == undefined
            ? -1
            : parseInt(desaparicionMes),
        desaparicionAnio:
          desaparicionAnio == null ||
          desaparicionAnio == "" ||
          desaparicionAnio == undefined
            ? -1
            : parseInt(desaparicionAnio),
        sesionIdentificacion: sesionIdentificacion,
        estadoId: -1,
        usuarioIngresoId: -1,
        fechaConfirmacionIni: !(fechaConfirmacionIni === "")
          ? `'${moment(fechaConfirmacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaConfirmacionFin: !(fechaConfirmacionFin === "")
          ? `'${moment(fechaConfirmacionFin).format("YYYY-MM-DD")}'`
          : null,
        fechaInfoFamiliaIni: !(fechaInfoFamiliaIni === "")
          ? `'${moment(fechaInfoFamiliaIni).format("YYYY-MM-DD")}'`
          : null,
        fechaInfoFamiliaFin: !(fechaInfoFamiliaFin === "")
          ? `'${moment(fechaInfoFamiliaFin).format("YYYY-MM-DD")}'`
          : null,
        fechaDictamenIni: !(fechaDictamenIni === "")
          ? `'${moment(fechaDictamenIni).format("YYYY-MM-DD")}'`
          : null,
        fechaDictamenFin: !(fechaDictamenFin === "")
          ? `'${moment(fechaDictamenFin).format("YYYY-MM-DD")}'`
          : null,
        fechaInhumacionIni: !(fechaInhumacionIni === "")
          ? `'${moment(fechaInhumacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaInhumacionFin: !(fechaInhumacionFin === "")
          ? `'${moment(fechaInhumacionFin).format("YYYY-MM-DD")}'`
          : null,

        fechaExhumacionIni: !(fechaExhumacionIni === "")
          ? `'${moment(fechaExhumacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaExhumacionFin: !(fechaExhumacionFin === "")
          ? `'${moment(fechaExhumacionFin).format("YYYY-MM-DD")}'`
          : null,
      };

      const res = await axios.post(
        `${config.urlApi}/reporte/identificadoOst`,
        dataC,
        configReq
      );
      setdataRep(res.data.data.rows);
    } catch (error) {
      setLoading(false);
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
  const fetchIdentificados = async (
    pageSize,
    pageIndex,
    searchValue,
    token
  ) => {
    if (searchValue === undefined) searchValue = "";
    try {
      setLoading(true);

      var dataC = {
        pagina: pageIndex,
        limite: pageSize,
        casoIdentificado:
          casoIdentificado == null || casoIdentificado == ""
            ? -1
            : parseInt(casoIdentificado),
        codigoVictima: codigoVictima,
        nombreVictima: nombreVictima,
        residenciaAldea: residenciaAldea,
        residenciaMuniId: residenciaMuniId,
        residenciaDeptoId: residenciaDeptoId,
        osamenta: osamenta,
        fosa: fosa,
        exhumacionAldea: exhumacionAldea,
        exhumacionMuniId: exhumacionMuniId,
        exhumacionDeptoId: exhumacionDeptoId,
        coordenadasExhumacion: coordenadasExhumacion,
        lr: lr,
        posterior: posterior,
        sexoId: sexoId,
        grupoEtarioId: grupoEtarioId,
        grupoEtnolinguisticoId: grupoEtnolinguisticoId,
        tipoCasoDidId: tipoCasoDidId,

        desaparicionAldea: desaparicionAldea,
        desaparicionMuniId: desaparicionMuniId,
        desaparicionDeptoId: desaparicionDeptoId,
        desaparicionDia:
          desaparicionDia == null ||
          desaparicionDia == "" ||
          desaparicionDia == undefined
            ? -1
            : parseInt(desaparicionDia),
        desaparicionMes:
          desaparicionMes == null ||
          desaparicionMes == "" ||
          desaparicionMes == undefined
            ? -1
            : parseInt(desaparicionMes),
        desaparicionAnio:
          desaparicionAnio == null ||
          desaparicionAnio == "" ||
          desaparicionAnio == undefined
            ? -1
            : parseInt(desaparicionAnio),
        sesionIdentificacion: sesionIdentificacion,
        estadoId: -1,
        usuarioIngresoId: -1,
        fechaConfirmacionIni: !(fechaConfirmacionIni === "")
          ? `'${moment(fechaConfirmacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaConfirmacionFin: !(fechaConfirmacionFin === "")
          ? `'${moment(fechaConfirmacionFin).format("YYYY-MM-DD")}'`
          : null,
        fechaInfoFamiliaIni: !(fechaInfoFamiliaIni === "")
          ? `'${moment(fechaInfoFamiliaIni).format("YYYY-MM-DD")}'`
          : null,
        fechaInfoFamiliaFin: !(fechaInfoFamiliaFin === "")
          ? `'${moment(fechaInfoFamiliaFin).format("YYYY-MM-DD")}'`
          : null,
        fechaDictamenIni: !(fechaDictamenIni === "")
          ? `'${moment(fechaDictamenIni).format("YYYY-MM-DD")}'`
          : null,
        fechaDictamenFin: !(fechaDictamenFin === "")
          ? `'${moment(fechaDictamenFin).format("YYYY-MM-DD")}'`
          : null,
        fechaInhumacionIni: !(fechaInhumacionIni === "")
          ? `'${moment(fechaInhumacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaInhumacionFin: !(fechaInhumacionFin === "")
          ? `'${moment(fechaInhumacionFin).format("YYYY-MM-DD")}'`
          : null,

        fechaExhumacionIni: !(fechaExhumacionIni === "")
          ? `'${moment(fechaExhumacionIni).format("YYYY-MM-DD")}'`
          : null,
        fechaExhumacionFin: !(fechaExhumacionFin === "")
          ? `'${moment(fechaExhumacionFin).format("YYYY-MM-DD")}'`
          : null,
      };

      const res = await axios.post(
        `${config.urlApi}/reporte/identificadoOst`,
        dataC,
        configReq
      );
      settotalRegisters(res.data.data.count);
      setData(res.data.data.rows);
      setPageCount(Math.ceil(res.data.data.count / pageSize));

      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);

    if (catalogo == "tipoCasoDid") setcombotipoCasoDid(result.data);

    if (catalogo == "genero") setcombogeneroId(result.data);
    if (catalogo == "grupoEtnolinguistico")
      setcombogrupoEtnolinguistico(result.data);
    if (catalogo == "grupoEtario") setcombogrupoEtario(result.data);
    if (catalogo === "departamento") setcomboDepartamento(result.data);
    if (catalogo === "municipio") setcomboMunicipio(result.data);
  };

  useEffect(() => {
    if (!(props.dataCaso === null)) {
      fetchCatalogo("genero");
      fetchCatalogo("grupoEtario");
      fetchCatalogo("grupoEtnolinguistico");
      fetchCatalogo("departamento");
      fetchCatalogo("municipio");
    }
    return () => {};
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "-",
        columns: [
          {
            Header: "Identificado Ost.",
            accessor: "identificadoOstId",
          },
          {
            Header: "Osamenta",
            Cell: ({row}) => (
              <div className="text-center">
                {`FAFG-${row.original.Osamenta.casoId}-${row.original.Osamenta.fosaDet}-${row.original.Osamenta.osamentaDet}`}
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
          {
            Header: "F. Confirmación",
            accessor: (d) => {
              if (d.fechaConfirmacion === null) {
                return "---";
              } else {
                return moment(d.fechaConfirmacion).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Info. Fam.",
            accessor: (d) => {
              if (d.fechaInfoFamilia === null) {
                return "---";
              } else {
                return moment(d.fechaInfoFamilia).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Dictamen",
            accessor: (d) => {
              if (d.fechaDictamen === null) {
                return "---";
              } else {
                return moment(d.fechaDictamen).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Reporte Did",
            accessor: (d) => {
              if (d.fechaReporteDid === null) {
                return "---";
              } else {
                return moment(d.fechaReporteDid).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Inhumación",
            accessor: (d) => {
              if (d.fechaInhumacion === null) {
                return "---";
              } else {
                return moment(d.fechaInhumacion).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "Progreso",
            className: "vertical-align:middle",
            accessor: (row) => {
              var porcentaje = porcentajeIdentificadoOst(row);

              return <div className="text-center">{porcentaje}</div>;
            },
          },
        ],
      },
    ],
    []
  );

  const fetchIdRef = React.useRef(0);

  const fetchData2 = React.useCallback(({pageSize, pageIndex, searchValue}) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      fetchIdentificados(pageSize, pageIndex, searchValue, user.token);
    }
  }, []);

  const fetchData = ({pageSize, pageIndex, searchValue}) => {
    fetchIdentificados(pageSize, pageIndex, searchValue, user.token);
  };

  useEffect(() => {
    var dataTemp = [];
    if (dataRep.length > 0) {
      dataRep.map((row) => {
        dataTemp.push({
          IdentificadoOstId: row.identificadoOstId,
          SesionIdentificacion: row.sesionIdentificacion,
          Osamenta: `FAFG-${row.Osamenta.casoId}-${row.Osamenta.fosaDet}-${row.Osamenta.osamentaDet}`,
          CodigoVictima: row.Victima.codigoVictima,
          NombreVictima: row.Victima.nombreVictima,
          Sexo: !(row.Sexo === "" || row.Sexo === null)
            ? row.Sexo.descripcion
            : "",
          GrupoEtario: !(row.GrupoEtario === "" || row.GrupoEtario === null)
            ? row.GrupoEtario.descripcion
            : "",
          GrupoEtnolinguistico: !(
            row.GrupoEtnolinguistico === "" || row.GrupoEtnolinguistico === null
          )
            ? row.GrupoEtnolinguistico.descripcion
            : "",
          TipoCasoDid: !(
            row.TipoCasoDidOst === "" || row.TipoCasoDidOst === null
          )
            ? row.TipoCasoDidOst.descripcion
            : "",
          DesaparicionAldea: row.desaparicionAldea,
          DesaparicionMunicipio: !(
            row.MuniDesap === "" || row.MuniDesap === null
          )
            ? row.MuniDesap.descripcion
            : "",
          DesaparicionDepartamento: !(
            row.DeptoDesap === "" || row.DeptoDesap === null
          )
            ? row.DeptoDesap.descripcion
            : "",
          DesaparicionDia: row.desaparicionDia,
          DesaparicionMes: row.desaparicionMes,
          DesaparicionAnio: row.desaparicionAnio,
          FechaConfirmacion: !(
            row.fechaConfirmacion === "" || row.fechaConfirmacion === null
          )
            ? `${moment(row.fechaConfirmacion).format("YYYY-MM-DD")}`
            : null,
          FechaInfoFamilia: !(
            row.fechaInfoFamilia === "" || row.fechaInfoFamilia === null
          )
            ? `${moment(row.fechaInfoFamilia).format("YYYY-MM-DD")}`
            : null,
          FechaDictamen: !(
            row.fechaDictamen === "" || row.fechaDictamen === null
          )
            ? `${moment(row.fechaDictamen).format("YYYY-MM-DD")}`
            : null,
          FechaInhumacion: !(
            row.fechaInhumacion === "" || row.fechaInhumacion === null
          )
            ? `${moment(row.fechaInhumacion).format("YYYY-MM-DD")}`
            : null,
          Usuario: row.Usuario.usuario,
        });
      });
    }

    setdataDownload(dataTemp);

    return () => {};
  }, [dataRep]);
  useEffect(() => {
    fetchIdentificadosRep(10000, 0, "", user.token);
  }, []);

  const [collapseData, setCollapseData] = useState(true);
  const [collapseGraficas, setCollapseGraficas] = useState(false);
  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <Card title="Reporte identificados Osteologico" isOption>
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
                </Row>{" "}
                {collapseData == true && (
                  <>
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
                                setcollapseVD13(false);
                                setcollapseVD13(false);
                                setcollapseVD14(false);
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
                                      <Form.Label>Caso Identificado</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="number"
                                        name="casoIdentificado"
                                        id="casoIdentificado"
                                        value={casoIdentificado}
                                        onChange={(e) => {
                                          setcasoIdentificado(e.target.value);
                                        }}
                                        placeholder="Caso identificado"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Sesión</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="sesionIdentificacion"
                                        value={sesionIdentificacion}
                                        onChange={(e) => {
                                          setsesionIdentificacion(
                                            e.target.value
                                          );
                                        }}
                                        id="sesionIdentificacion"
                                        placeholder="Sesiòn"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Sexo</Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="sexoId"
                                        id="sexoId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(sexoId === undefined) ? sexoId : ""
                                        }
                                        onChange={(e) => {
                                          setsexoId(e.target.value);
                                        }}
                                      >
                                        <option key="-1" value="-1">
                                          ---Seleccione una opcion---
                                        </option>
                                        {!(combogeneroId === undefined)
                                          ? combogeneroId.map((fbb) => (
                                              <option
                                                key={fbb.generoId}
                                                value={fbb.generoId}
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
                                      <Form.Label>Grupo Etario</Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="grupoEtarioId"
                                        id="grupoEtarioId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(grupoEtarioId === undefined)
                                            ? grupoEtarioId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setgrupoEtarioId(e.target.value);
                                        }}
                                      >
                                        <option key="-1" value="-1">
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Grupo Etnolinguistico
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="grupoEtnolinguisticoId"
                                        id="grupoEtnolinguisticoId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(
                                            grupoEtnolinguisticoId === undefined
                                          )
                                            ? grupoEtnolinguisticoId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setgrupoEtnolinguisticoId(
                                            e.target.value
                                          );
                                        }}
                                      >
                                        <option key="-1" value="-1">
                                          ---Seleccione una opcion---
                                        </option>
                                        {!(
                                          combogrupoEtnolinguistico ===
                                          undefined
                                        )
                                          ? combogrupoEtnolinguistico.map(
                                              (fbb) => (
                                                <option
                                                  key={
                                                    fbb.grupoEtnolinguisticoId
                                                  }
                                                  value={
                                                    fbb.grupoEtnolinguisticoId
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
                                </Row>

                                <Row className="rowFiltros rowFiltros-primary">
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Aldea Desaparición
                                      </Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="desaparicionAldea"
                                        value={desaparicionAldea}
                                        onChange={(e) => {
                                          setdesaparicionAldea(e.target.value);
                                        }}
                                        id="desaparicionAldea"
                                        placeholder="Aldea Desaparición"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                      Estado Desaparición
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="desaparicionDeptoId"
                                        id="desaparicionDeptoId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(desaparicionDeptoId === undefined)
                                            ? desaparicionDeptoId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setdesaparicionDeptoId(
                                            parseInt(e.target.value)
                                          );
                                          setdesaparicionMuniId(-1);
                                        }}
                                      >
                                        <option key="-1" value="-1">
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Municipio Desaparición
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="desaparicionMuniId"
                                        id="desaparicionMuniId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(desaparicionMuniId === undefined)
                                            ? desaparicionMuniId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setdesaparicionMuniId(
                                            parseInt(e.target.value)
                                          );
                                        }}
                                      >
                                        <option key="-1" value="-1">
                                          ---Seleccione una opcion---
                                        </option>
                                        {!(comboMunicipio === undefined)
                                          ? comboMunicipio
                                              .filter(
                                                (filt) =>
                                                  filt.departamentoId ==
                                                  desaparicionDeptoId
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Dia </Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="number"
                                        name="desaparicionDia"
                                        id="desaparicionDia"
                                        value={desaparicionDia}
                                        onChange={(e) => {
                                          setdesaparicionDia(e.target.value);
                                        }}
                                        placeholder="Dia"
                                        className="rowFiltros-control  text-center"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Mes </Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="number"
                                        name="desaparicionMes"
                                        id="desaparicionMes"
                                        value={desaparicionMes}
                                        onChange={(e) => {
                                          setdesaparicionMes(e.target.value);
                                        }}
                                        placeholder="Mes"
                                        className="rowFiltros-control  text-center"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Año </Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="number"
                                        name="desaparicionAnio"
                                        id="desaparicionAnio"
                                        value={desaparicionAnio}
                                        onChange={(e) => {
                                          setdesaparicionAnio(e.target.value);
                                        }}
                                        placeholder="Año"
                                        className="rowFiltros-control text-center"
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
                                setcollapseVD14(false);
                                setcollapseVD13(false);
                                setcollapseVD13(false);
                                setcollapseVD13(false);
                                setcollapseVD14(false);
                                setcollapseVD13(false);
                              }}
                              aria-expanded={collapseVD12}
                            >
                              <h6>Victima</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Collapse in={collapseVD12}>
                              <div id="collapseVD12" className="col-12">
                                <Row className="rowFiltros rowFiltros-primary">
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Codigo Victima</Form.Label>
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
                                      <Form.Label>Nombre Victima</Form.Label>
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
                                      <Form.Label>Aldea Residencia</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="residenciaAldea"
                                        value={residenciaAldea}
                                        onChange={(e) => {
                                          setresidenciaAldea(e.target.value);
                                        }}
                                        id="residenciaAldea"
                                        placeholder="Aldea Residencia"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                      Estado Residencia
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="residenciaDeptoId
                                    "
                                        id="residenciaDeptoId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(residenciaDeptoId === undefined)
                                            ? residenciaDeptoId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setresidenciaDeptoId(
                                            parseInt(e.target.value)
                                          );
                                          setresidenciaMuniId(-1);
                                        }}
                                      >
                                        <option key="-1" value="-1">
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Municipio Residencia
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="residenciaMuniId"
                                        id="residenciaMuniId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(residenciaMuniId === undefined)
                                            ? residenciaMuniId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setresidenciaMuniId(
                                            parseInt(e.target.value)
                                          );
                                        }}
                                      >
                                        <option key="-1" value="-1">
                                          ---Seleccione una opcion---
                                        </option>
                                        {!(comboMunicipio === undefined)
                                          ? comboMunicipio
                                              .filter(
                                                (filt) =>
                                                  filt.departamentoId ==
                                                  residenciaDeptoId
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
                                      </Form.Control>
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
                                setcollapseVD13(!collapseVD13);

                                setcollapseVD11(false);
                                setcollapseVD12(false);
                                setcollapseVD14(false);
                              }}
                              aria-expanded={collapseVD13}
                            >
                              <h6>Osamenta</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Collapse in={collapseVD13}>
                              <div id="collapseVD13" className="col-12">
                                <Row className="rowFiltros rowFiltros-primary">
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
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Fosa</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="fosa"
                                        value={fosa}
                                        onChange={(e) => {
                                          setfosa(e.target.value);
                                        }}
                                        id="fosa"
                                        placeholder="Fosa"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Aldea Exhumación</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="exhumacionAldea"
                                        value={exhumacionAldea}
                                        onChange={(e) => {
                                          setexhumacionAldea(e.target.value);
                                        }}
                                        id="exhumacionAldea"
                                        placeholder="Aldea Exhumación"
                                        className="rowFiltros-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                      Estado Exhumación
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="exhumacionDeptoId"
                                        id="exhumacionDeptoId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(exhumacionDeptoId === undefined)
                                            ? exhumacionDeptoId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setexhumacionDeptoId(
                                            parseInt(e.target.value)
                                          );
                                          setexhumacionMuniId(-1);
                                        }}
                                      >
                                        <option key="-1" value="-1">
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Municipio Exhumación
                                      </Form.Label>
                                      <Form.Control
                                        as="select"
                                        name="exhumacionMuniId"
                                        id="exhumacionMuniId"
                                        className="rowFiltros-control"
                                        required
                                        value={
                                          !(exhumacionMuniId === undefined)
                                            ? exhumacionMuniId
                                            : ""
                                        }
                                        onChange={(e) => {
                                          setexhumacionMuniId(
                                            parseInt(e.target.value)
                                          );
                                        }}
                                      >
                                        <option key="-1" value="-1">
                                          ---Seleccione una opcion---
                                        </option>
                                        {!(comboMunicipio === undefined)
                                          ? comboMunicipio
                                              .filter(
                                                (filt) =>
                                                  filt.departamentoId ==
                                                  exhumacionDeptoId
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
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Coordenadas</Form.Label>
                                      <Form.Control
                                        size="sm"
                                        type="text"
                                        name="coordenadasExhumacion"
                                        value={coordenadasExhumacion}
                                        onChange={(e) => {
                                          setcoordenadasExhumacion(
                                            e.target.value
                                          );
                                        }}
                                        id="coordenadasExhumacion"
                                        placeholder="Coordenadas"
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
                                setcollapseVD14(!collapseVD14);

                                setcollapseVD11(false);
                                setcollapseVD12(false);
                                setcollapseVD13(false);
                              }}
                              aria-expanded={collapseVD14}
                            >
                              <h6>Fechas</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Collapse in={collapseVD14}>
                              <div id="collapseVD14" className="col-12">
                                <Row className="rowFiltros rowFiltros-primary">
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Confirmación Inicio
                                      </Form.Label>
                                      <Datetime
                                        id="fechaConfirmacionIni"
                                        name="fechaConfirmacionIni"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Confirmaciòn ",
                                        }}
                                        value={
                                          !(fechaConfirmacionIni === "")
                                            ? moment(
                                                fechaConfirmacionIni
                                              ).format("DD-MM-YYYY")
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaConfirmacionIni(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaConfirmacionIni("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Confirmación Fin</Form.Label>
                                      <Datetime
                                        id="fechaConfirmacionFin"
                                        name="fechaConfirmacionFin"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Confirmación ",
                                        }}
                                        value={
                                          !(fechaConfirmacionFin === "")
                                            ? moment(
                                                fechaConfirmacionFin
                                              ).format("DD-MM-YYYY")
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaConfirmacionFin(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaConfirmacionFin("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>
                                        Familia Info. Inicio
                                      </Form.Label>
                                      <Datetime
                                        id="fechaInfoFamiliaIni"
                                        name="fechaInfoFamiliaIni"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Familia Info. ",
                                        }}
                                        value={
                                          !(fechaInfoFamiliaIni === "")
                                            ? moment(
                                                fechaInfoFamiliaIni
                                              ).format("DD-MM-YYYY")
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaInfoFamiliaIni(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaInfoFamiliaIni("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Familia Info. Fin</Form.Label>
                                      <Datetime
                                        id="fechaInfoFamiliaFin"
                                        name="fechaInfoFamiliaFin"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Confirmación ",
                                        }}
                                        value={
                                          !(fechaInfoFamiliaFin === "")
                                            ? moment(
                                                fechaInfoFamiliaFin
                                              ).format("DD-MM-YYYY")
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaInfoFamiliaFin(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaInfoFamiliaFin("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Dictamen Inicio</Form.Label>
                                      <Datetime
                                        id="fechaDictamenIni"
                                        name="fechaDictamenIni"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Dictamen ",
                                        }}
                                        value={
                                          !(fechaDictamenIni === "")
                                            ? moment(fechaDictamenIni).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaDictamenIni(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaDictamenIni("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Dictamen Fin</Form.Label>
                                      <Datetime
                                        id="fechaDictamenFin"
                                        name="fechaDictamenFin"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Dictamen ",
                                        }}
                                        value={
                                          !(fechaDictamenFin === "")
                                            ? moment(fechaDictamenFin).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaDictamenFin(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaDictamenFin("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row className="rowFiltros rowFiltros-primary">
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Inhumación Inicio</Form.Label>
                                      <Datetime
                                        id="fechaInhumacionIni"
                                        name="fechaInhumacionIni"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Inhumación ",
                                        }}
                                        value={
                                          !(fechaInhumacionIni === "")
                                            ? moment(fechaInhumacionIni).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaInhumacionIni(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaInhumacionIni("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Inhumación Fin</Form.Label>
                                      <Datetime
                                        id="fechaInhumacionFin"
                                        name="fechaInhumacionFin"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Inhumación ",
                                        }}
                                        value={
                                          !(fechaInhumacionFin === "")
                                            ? moment(fechaInhumacionFin).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaInhumacionFin(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaInhumacionFin("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Exhumación Inicio</Form.Label>
                                      <Datetime
                                        id="fechaExhumacionIni"
                                        name="fechaExhumacionIni"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Exhumación ",
                                        }}
                                        value={
                                          !(fechaExhumacionIni === "")
                                            ? moment(fechaExhumacionIni).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaExhumacionIni(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaExhumacionIni("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col sm>
                                    <Form.Group>
                                      <Form.Label>Exhumación Fin</Form.Label>
                                      <Datetime
                                        id="fechaExhumacionFin"
                                        name="fechaExhumacionFin"
                                        defaultValue=""
                                        renderInput={renderInput}
                                        dateFormat="DD-MM-YYYY"
                                        inputProps={{
                                          placeholder: "Fecha Exhumación ",
                                        }}
                                        value={
                                          !(fechaExhumacionFin === "")
                                            ? moment(fechaExhumacionFin).format(
                                                "DD-MM-YYYY"
                                              )
                                            : ""
                                        }
                                        onChange={(e) => {
                                          if (moment(e).isValid() === true)
                                            setfechaExhumacionFin(
                                              moment(e).utc()
                                            );
                                          else {
                                            setfechaExhumacionFin("");
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Col>

                                  <Col sm></Col>
                                  <Col sm></Col>
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
                          key="btnSaveEditPerson"
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
                          data={data}
                          reset={initPage}
                          fetchData={fetchData}
                          loading={loading}
                          pageCount={pageCount}
                          className="animated fadeIn table-sm"
                          totalRegis={totalRegisters}
                        />
                      </Col>
                    </Row>
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
                  <IdentificadoOst data={dataRep} />
                )}
              </Col>
            </Card>
          </Col>
        </Row>
      </Aux>
    </div>
  );
}

export default ReporteIOst;
