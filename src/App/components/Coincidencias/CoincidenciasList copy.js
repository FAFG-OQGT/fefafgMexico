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
  Label,
  Modal,
} from "react-bootstrap";

import config from "../../../config";
import Aux from "../../../hoc/_Aux";
import axios from "axios";
import moment from "moment";

//componentes especificos
import TablaGenerica from "../TablaGenerica/TablaGenerica";

import userContext from "../../../context/userContext";

const getBadge = (status) => {
  return status === 0 ? "danger" : status === 1 ? "success" : "primary";
};

function PersonasList(props) {
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
            Header: "C. Id",
            Cell: ({row}) => (
              <div className="text-center">
                <Link
                  to={{
                    pathname: "/coincidenciasCaso",
                    query: {backUrl: "/coincidencias", dataCaso: row.original},
                  }}
                >
                  {row.original.coincidenciaId.toString()}
                </Link>
              </div>
            ),
          },
          {
            Header: "Caso",
            accessor: (d) => {
              return d.casoCoincidenciaId.toString().padStart(5, "0");
            },
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
                <Badge
                  className="btn"
                  onClick={(e) => props.onabrirModal("Osamenta", row.original)}
                  variant={"info"}
                >
                  {row.original.Osamenta.osamentaDet}
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
                          {!(row.original.donantes === undefined)
                            ? row.original.donantes.map((fbb) => (
                                <tr key={fbb.donanteCoincidenciaId}>
                                  <td>{fbb.parentezco}</td>
                                  <td>{fbb.cantidad}</td>
                                </tr>
                              ))
                            : null}
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
                    {row.original.donantes.reduce((a, b) => a + b.cantidad, 0)}
                  </Badge>
                </OverlayTrigger>
              </div>
            ),
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
            accessor: "priori",
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
            accessor: "estadoInvestigaDesc",
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
            accessor: "tipoCaso",
          },
          {
            Header: "Contexto",
            accessor: "tipoContexto",
          },
          {
            Header: "Acciones",
            accessor: (row) => {
              return (
                <div>
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
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>Anotaciones DID</Tooltip>
                    }
                  >
                    <Button
                      type="submit"
                      className="btn-icon"
                      variant="outline-secondary"
                      size="sm"
                      onClick={(e) => props.onabrirModal("AnotacionesDID", row)}
                    >
                      <i className="feather icon-file-text" />
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
        }/persona?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
        configReq
      );
      /*
      const res = {
        data: [
          {
            coincidenciaId: 1001,
            casoCoincidenciaId: 1,
            fechaCoincidencia: "2020-07-14",
            osamentaId: 1,
            osamenta: "FAFG-1848-XII-5",
            victimaId: 1,
            victima: "FAFG-FD-2956-V01",
            lr: "58000000000000000",
            priori: "1/7880",
            posterior: "mayor 99.9999%",
            baseInfo: "Kaqchikel (2015)",
            programaIdent: "M-FISys",
            estadoCoincidenciaId: 1,
            estadoCoindiDesc: "Confirmada",
            fechaNotificacion: "2020-07-14",
            fechaConfExc: "2020-07-14",
            estadoInvestigaId: 1,
            estadoInvestigaDesc: "Seguimiento",
            cromosomaYId: 0,
            tipoCaso: "Desaparicion",
            tipoContexto: "Abierto",
            donantes: [
              {donanteCoincidenciaId: 1, parentezco: "Esposo", cantidad: 0},
              {donanteCoincidenciaId: 2, parentezco: "Madre", cantidad: 1},
              {donanteCoincidenciaId: 3, parentezco: "Padre", cantidad: 1},
              {donanteCoincidenciaId: 4, parentezco: "Hijo", cantidad: 0},
              {donanteCoincidenciaId: 5, parentezco: "Hija", cantidad: 0},
              {donanteCoincidenciaId: 6, parentezco: "medio", cantidad: 0},
              {donanteCoincidenciaId: 7, parentezco: "Otro", cantidad: 2},
            ],
          },
          {
            coincidenciaId: 1002,
            casoCoincidenciaId: 2,
            fechaCoincidencia: "2020-07-15",
            osamentaId: 1,
            osamenta: "FAFG-1848-XI-2",
            victimaId: 1,
            victima: "FAFG-FD-2956-V02",

            lr: "59959995959595",
            priori: "2/999",
            posterior: "mayor 99.9999%",

            baseInfo: "Kaqchikel (2015)",
            programaUsado: "M-FISys",
            estadoCoincidenciaId: 2,
            estadoCoindiDesc: "Pendiente",
            fechaNotificacion: "2020-07-15",
            fechaConfExc: "2020-07-15",
            estadoInvestigaId: 1,
            estadoInvestigaDesc: "Seguimiento",
            cromosomaYId: 0,
            tipoCaso: "Desaparicion",
            tipoContexto: "Abierto",
            donantes: [
              {donanteCoincidenciaId: 1, parentezco: "Esposo", cantidad: 0},
              {donanteCoincidenciaId: 2, parentezco: "Madre", cantidad: 0},
              {donanteCoincidenciaId: 3, parentezco: "Padre", cantidad: 0},
              {donanteCoincidenciaId: 4, parentezco: "Hijo", cantidad: 0},
              {donanteCoincidenciaId: 5, parentezco: "Hija", cantidad: 0},
              {donanteCoincidenciaId: 6, parentezco: "medio", cantidad: 0},
              {donanteCoincidenciaId: 7, parentezco: "Otro", cantidad: 2},
            ],
          },
        ],
      };
      */
      settotalRegisters(res.data.count);
      setData(res.data);
      setPageCount(Math.ceil(res.data.count / pageSize));

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
export default PersonasList;
