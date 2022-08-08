import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Badge,
  OverlayTrigger,
  Popover,
  Tooltip,
  ProgressBar
} from "react-bootstrap";

import config from "../../../config";
import Aux from "../../../hoc/_Aux";
import axios from "axios";
import moment from "moment";

//componentes especificos
import TablaGenerica from "../TablaGenerica/TablaGenerica";

import userContext from "../../../context/userContext";

function CoincidenciaList(props) {
  const user = useContext(userContext);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [accesos, setAccesos] = React.useState(props.accesos);

  const [pageCount, setPageCount] = React.useState(0);
  const [totalRegisters, settotalRegisters] = useState(0);
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
    if (
      row.marcadoresStr == null ||
      row.marcadoresStr === "" ||
      row.marcadoresStr === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }
    if (
      row.calidadPerfilId == null ||
      row.calidadPerfilId === "" ||
      row.calidadPerfilId === "null"
    ) {
      conteoVacio = conteoVacio + 1;
    }

    let resultado = parseInt(((conteoTotal - conteoVacio) / conteoTotal) * 100);

    return resultado;
  };
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
                    pathname: config.baseApp + "/coincidenciasCaso",
                    query: {
                      backUrl: config.baseApp + "/coincidencias",
                      dataCaso: row.original
                    }
                  }}
                >
                  {" "}
                  <Badge className="btn" variant={"primary"}>
                    {row.original.coincidenciaId.toString().padStart(5, "0")}{" "}
                  </Badge>
                </Link>
              </div>
            )
          },
          {
            Header: "F. Coin.",
            accessor: (d) => {
              return moment(d.fechaCoincidencia).utc().format("DD-MM-YYYY");
            }
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
                  {`CRIH-${row.original.Osamenta.casoId}-${row.original.Osamenta.fosaDet}-${row.original.Osamenta.osamentaDet}`}
                </Badge>
              </div>
            )
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
            )
          },
          {
            Header: "Nombre",
            Cell: ({row}) => (
              <div className="text-center">
                {row.original.Victima.nombreVictima}
              </div>
            )
          },
          {
            Header: "Donantes",
            className: "text-center",
            Cell: ({row}) => (
              <div className="text-center">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Popover id={`popover-positioned-html`} title={"Parientes"}>
                      <table>
                        <tbody>
                          {!(row.original.DonanteCoincidencia === undefined) ? (
                            row.original.DonanteCoincidencia.length > 0 ? (
                              row.original.DonanteCoincidencia.map((fbb) => (
                                <tr key={fbb.donanteCoincidenciaId}>
                                  <td>{fbb.Donante.descripcion}</td>
                                  <td>{fbb.cantidadDonantes}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                            )
                          ) : (
                            <tr>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Popover>
                  }
                >
                  <Badge
                    variant={"primary"}
                    className="btn"
                    onClick={(e) => props.onabrirModal("Donante", row.original)}
                  >
                    {!(row.original.DonanteCoincidencia === undefined)
                      ? row.original.DonanteCoincidencia.reduce(function (
                          acc,
                          val
                        ) {
                          return acc + val.cantidadDonantes;
                        },
                        0)
                      : 0}
                  </Badge>
                </OverlayTrigger>
              </div>
            )
          }
        ]
      },
      {
        Header: "Estadístico",
        style: {
          borderRight: "2px solid black",
          borderLeft: "2px solid black"
        },
        columns: [
          {
            Header: "INDICE FILIACION",
            accessor: "lr",
            style: {
              borderLeft: "2px solid black"
            }
          },
          {
            Header: "Apriori",
            accessor: "apriori"
          },
          {
            Header: "Posterior",
            accessor: "posterior",
            style: {
              borderRight: "2px solid black"
            }
          }
        ]
      },

      {
        Header: "-",
        columns: [
          {
            Header: "F. Conf/Exc",

            accessor: (d) => {
              return moment(d.fechaConfExc).utc().format("DD-MM-YYYY");
            }
          },

          {
            Header: "Estado",
            accessor: "EstadoCoincidencia.descripcion"
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
            }
          },
          {
            Header: "Contexto",
            accessor: (d) => {
              let TipoContexto =
                d.TipoContexto === null ? "" : d.TipoContexto.descripcion;
              return TipoContexto;
            }
          },
          {
            Header: "Responsable",
            accessor: (d) => {
              let Responsablev =
                d.Responsable === null ? "" : d.Responsable.usuario;
              return Responsablev;
            }
          },
          {
            Header: "Progreso",
            className: "vertical-align:middle",
            accessor: (row) => {
              var porcentaje = porcentajeCoincidencia(row);
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
            }
          },
          {
            Header: "Acciones",
            accessor: (row) => {
              return (
                <div>
                  {accesos.verNotasLaboratorio === true && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>Notas laboratorio</Tooltip>
                      }
                    >
                      <Button
                        type="submit"
                        className="btn-icon"
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) =>
                          props.onabrirModal("NotaLaboratorio", row)
                        }
                      >
                        <i className="feather icon-activity" />
                      </Button>
                    </OverlayTrigger>
                  )}
                  {accesos.verAnotaciones === true && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>Anotaciones DID</Tooltip>
                      }
                    >
                      <Button
                        type="submit"
                        className="btn-icon"
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) =>
                          props.onabrirModal("AnotacionesDID", row)
                        }
                      >
                        <i className="feather icon-edit" />
                      </Button>
                    </OverlayTrigger>
                  )}
                  {accesos.verSeguimientoSolicitud === true && (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>
                          Seguimiento Solicitudes DID
                        </Tooltip>
                      }
                    >
                      <Button
                        type="submit"
                        className="btn-icon"
                        variant="outline-secondary"
                        size="sm"
                        onClick={(e) =>
                          props.onabrirModal("SeguimientoDID", row)
                        }
                      >
                        <i className="feather icon-eye" />
                      </Button>
                    </OverlayTrigger>
                  )}
                  {accesos.verArchivo === true && (
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
                          props.onabrirModal("ArchivosCoincidencia", row)
                        }
                      >
                        <i className="feather icon-folder" />
                      </Button>
                    </OverlayTrigger>
                  )}
                  {accesos.verFio === true && (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-top`}>FIO</Tooltip>}
                    >
                      <Button
                        type="submit"
                        className="btn-icon"
                        variant="outline-success"
                        size="sm"
                        onClick={(e) => props.onabrirModal("FIO", row)}
                      >
                        <i className="feather icon-file" />
                      </Button>
                    </OverlayTrigger>
                  )}
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-top`}>FIO</Tooltip>}
                  >
                    <Button
                      type="submit"
                      className="btn-icon"
                      variant="outline-success"
                      size="sm"
                      onClick={(e) => props.onabrirModal("PRINTFIO", row)}
                    >
                      <i className="feather icon-printer" />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-top`}>Coincidencia</Tooltip>}
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
            }
          }
        ]
      }
    ],
    []
  );
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };
  const fetchCoincidencias = async (
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
        }/coincidencia?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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
      fetchCoincidencias(pageSize, pageIndex, searchValue, user.token);
    }
  }, []);

  useEffect(() => {
    if (props.reset) {
      fetchCoincidencias(10, 0, "", user.token);
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
export default CoincidenciaList;
