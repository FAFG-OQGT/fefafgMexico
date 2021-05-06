import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
} from "react-bootstrap";

import config from "../../../../config";
import Aux from "../../../../hoc/_Aux";
import axios from "axios";
import moment from "moment";

//componentes especificos
import TablaGenerica from "../../TablaGenerica/TablaGenerica";

import userContext from "../../../../context/userContext";

function IdentificadosList(props) {
  const porcentajeIdentificado = (row) => {
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
  const user = useContext(userContext);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [pageCount, setPageCount] = React.useState(0);
  const [totalRegisters, settotalRegisters] = useState(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "-",
        columns: [
          {
            Header: "#",
            Cell: ({row}) => (
              <div className="text-center">
                <Link
                  to={{
                    pathname: "/identificadosSmIhEdit",
                    query: {
                      backUrl: "/identificadosSmIh",
                      dataCaso: row.original,
                    },
                  }}
                >
                  <Badge className="btn" variant={"primary"}>
                    {row.original.identificadoSmihId
                      .toString()
                      .padStart(5, "0")}
                  </Badge>
                </Link>
              </div>
            ),
          },
          {
            Header: "Coincidencia",
            accessor: "coincidenciaId",
          },

          {
            Header: "Osamenta",
            Cell: ({row}) => (
              <div className="text-center">
                <Badge
                  className="btn"
                  onClick={(e) => props.onabrirModal("Osamenta", row.original)}
                  variant={"info"}
                >
                  {`FAFG-${row.original.Osamenta.casoId}-${row.original.Osamenta.fosaDet}-${row.original.Osamenta.osamentaDet}`}
                </Badge>
              </div>
            ),
          },
          {
            Header: "Victima",
            Cell: ({row}) => (
              <div className="text-center">
                <Badge
                  className="btn"
                  onClick={(e) => props.onabrirModal("Victima", row.original)}
                  variant={"info"}
                >
                  {row.original.Victima.codigoVictima}
                </Badge>
              </div>
            ),
          },
          {
            Header: "Nombre",
            accessor: "Victima.nombreVictima",
          },
          {
            Header: "LRI",
            accessor: (d) => {
              if (d.Coincidencia === null) {
                return "--";
              } else {
                return d.Coincidencia.lr;
              }
            },
          },
          {
            Header: "Fam. Informados",
            accessor: (d) => {
              if (d.fechaInfoFamilia === null) {
                return "Pendiente";
              } else {
                return moment(d.fechaInfoFamilia).utc().format("DD-MM-YYYY");
              }
            },
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
            Header: "F. Inhumación",
            accessor: (d) => {
              if (d.fechaConfirmacion === null) {
                return "---";
              } else {
                return moment(d.fechaConfirmacion).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Antemortem",
            accessor: (d) => {
              if (d.fechaEntrevistaAM === null) {
                return "---";
              } else {
                return moment(d.fechaEntrevistaAM).utc().format("DD-MM-YYYY");
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
            Header: "F. Genetica",
            accessor: (d) => {
              if (d.fechaReporteGenetica === null) {
                return "---";
              } else {
                return moment(d.fechaReporteGenetica)
                  .utc()
                  .format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. A. Osteo.",
            accessor: (d) => {
              if (d.fechaAnalisisOst === null) {
                return "---";
              } else {
                return moment(d.fechaAnalisisOst).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "F. Dictamen Idt.",
            accessor: (d) => {
              if (d.fechaDictamen === null) {
                return "---";
              } else {
                return moment(d.fechaDictamen).utc().format("DD-MM-YYYY");
              }
            },
          },
          {
            Header: "Progreso",
            className: "vertical-align:middle",
            accessor: (row) => {
              var porcentaje = porcentajeIdentificado(row);
              var variant = "";

              if (porcentaje < 90) variant = "success";
              if (porcentaje < 60) variant = "warning";
              if (porcentaje < 40) variant = "danger";
              if (porcentaje === 100) variant = "";
              return (
                <div className="text-center">
                  <ProgressBar
                    now={porcentaje}
                    variant={variant}
                    label={`${porcentaje}%`}
                    style={{height: "15px", fontSize: "12px"}}
                  />
                </div>
              );
            },
          },
          {
            Header: "Acciones",
            accessor: (row) => {
              return (
                <div>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-top`}>Archivos</Tooltip>}
                  >
                    <Button
                      type="submit"
                      className="btn-icon"
                      variant="outline-success"
                      size="sm"
                      onClick={(e) =>
                        props.onabrirModal("ArchivosIdentificadoSmih", row)
                      }
                    >
                      <i className="feather icon-folder" />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-top`}>Reporte</Tooltip>}
                  >
                    <Button
                      type="submit"
                      className="btn-icon"
                      variant="outline-success"
                      size="sm"
                      onClick={(e) => props.onabrirModal("PRINT", row)}
                    >
                      <i className="feather icon-printer" />
                    </Button>
                  </OverlayTrigger>
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
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

      const res = await axios.get(
        `${
          config.urlApi
        }/identificadoSmih?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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

  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({pageSize, pageIndex, searchValue}) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      fetchIdentificados(pageSize, pageIndex, searchValue, user.token);
    }
  }, []);

  useEffect(() => {
    if (props.reset) {
      fetchIdentificados(10, 0, "", user.token);
      props.setresetList(false);
    }
    return () => {};
  }, [props.reset]);

  
  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <TablaGenerica
              columns={columns}
              data={data}
              fetchData={fetchData}
              loading={loading}
              pageCount={pageCount}
              className="animated fadeIn table-sm"
              totalRegis={totalRegisters}
              reset={props.reset}
            />
          </Col>
        </Row>
      </Aux>
    </div>
  );
}
export default IdentificadosList;
