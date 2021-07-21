import React, {useContext, useState, useEffect} from "react";
import {Row, Col, Button, Badge} from "react-bootstrap";
import config from "../../../config";
import Aux from "../../../hoc/_Aux";
import axios from "axios";
import moment from "moment";
//componentes especificos
import TablaGenerica from "../TablaGenerica/TablaGenerica";

import userContext from "../../../context/userContext";

const getBadge = (status) => {
  return status === 2 ? "danger" : status === 1 ? "success" : "primary";
};
function OsamentaList(props) {
  const user = useContext(userContext);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [pageCount, setPageCount] = React.useState(0);
  const [totalRegisters, settotalRegisters] = useState(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "---",
        id: "editClick",
        Cell: ({row}) => (
          <Button
            type="submit"
            className="btn-icon"
            variant="outline-primary"
            size="sm"
            onClick={(e) => props.onabrirModal("Editar", row.original)}
          >
            <i className="feather icon-edit" />{" "}
          </Button>
        ),
      },
      {
        Header: "#",
        accessor: "osamentaId",
      },
      {
        Header: "Osamenta",
        accessor: (d) => {
            
            return `CRIH-${d.casoId}-${d.fosaDet}-${d.osamentaDet}`;
          },
      },
      {
        Header: "Sexo ADN",
        accessor: (d) => {
            
            return (d.SexoAdn===null)?"No determinado":d.SexoAdn.descripcion;
          },
      }, {
        Header: "L. Alelos Utiles",
        accessor: "locisAlelosUtiles",
      },
      {
        Header: "F. Ingreso Lab.",
        accessor: (d) => {
          if (d.fechaIngresoLab === null) {
            return "";
          } else {
            return moment(d.fechaIngresoLab).utc().format("DD/MM/YYYY");
          }
        },

      },
      {
        Header: "F. Ingreso MFISys.",
 
        accessor: (d) => {
          if (d.fechaIngresoMFiSys === null) {
            return "";
          } else {
            return moment(d.fechaIngresoMFiSys).utc().format("DD/MM/YYYY");
          }
        },
      },
      {
        Header: "Exhumacion",
        accessor: (d) => {
         
          let exhumacion =
          ((d.DeptoExhumacion===null)?"":d.DeptoExhumacion.descripcion ) + ", " + ( (d.MuniExhumacion===null)?"":d.MuniExhumacion.descripcion);
          return exhumacion;
        },
      },
      {
        Header: "Fecha exhumacion",
        accessor: (d) => {
          if (d.fechaExhumacion === null) {
            return "";
          } else {
            return moment(d.fechaExhumacion).utc().format("DD/MM/YYYY");
          }
        },
      },{
        Header: "Estado",
        accessor: "estadoId",
        Cell: ({value}) => (
          <div className="text-center">
            <Badge variant={getBadge(value)}>
              {value === 2 ? "Inactivo" : value === 1 ? "Activo" : "--"}
            </Badge>
          </div>
        ),
      }
    ],
    []
  );

  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };
  const fetch = async (pageSize, pageIndex, searchValue, token) => {
    if (searchValue === undefined) searchValue = "";
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          config.urlApi
        }/osamenta?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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
      fetch(pageSize, pageIndex, searchValue, user.token);
    }
  }, []);

  useEffect(() => {
    if (props.reset) {
      fetch(10, 0, "", user.token);
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

export default OsamentaList;
