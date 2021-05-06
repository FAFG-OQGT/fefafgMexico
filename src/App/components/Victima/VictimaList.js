import React, {useContext, useState, useEffect} from "react";
import {Row, Col, Button, Badge} from "react-bootstrap";
import config from "../../../config";
import Aux from "../../../hoc/_Aux";
import moment from "moment";

import axios from "axios";
//componentes especificos
import TablaGenerica from "../TablaGenerica/TablaGenerica";

import userContext from "../../../context/userContext";

const getBadgeEstado = (status) => {
  return status === 2 ? "danger" : status === 1 ? "success" : "primary";
};
function VictimaList(props) {
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
        Header: "Codigo",
        accessor: "codigoVictima",
      },
      {
        Header: "Nombre",
        accessor: "nombreVictima",
      },
      {
        Header: "Residencia",
        accessor: (d) => {
          let residencia =
            (d.DeptoResidencia === null ? "" : d.DeptoResidencia.descripcion) +
            ", " +
            (d.MuniResidencia === null ? "" : d.MuniResidencia.descripcion);
          return residencia;
        },
      },
      {
        Header: "Lugar del Hecho",
        accessor: (d) => {
          let lugarHecho =
            (d.DeptoLugarHecho === null ? "" : d.DeptoLugarHecho.descripcion) +
            ", " +
            (d.MuniLugarHecho === null ? "" : d.MuniLugarHecho.descripcion);
          return lugarHecho;
        },
      },
      {
        Header: "Fecha del Hecho",
        accessor: (d) => {
          let fechaHecho = `${d.diaHecho ? d.diaHecho.toString() : "XX"}-${
            d.mesHecho ? d.mesHecho.toString() : "XX"
          }-${d.anioHecho ? d.anioHecho.toString() : "XXXX"}`;
          return fechaHecho;
        },
      },
      {
        Header: "F. Nacimiento",
        accessor: (d) => {
          if (d.fechaNacimientoVictima === null) {
            return "";
          } else {
            return moment(d.fechaNacimientoVictima).utc().format("DD/MM/YYYY");
          }
        },
      },
      {
        Header: "Documento",
        accessor: "noDocumento",
      },
      {
        Header: "Tipo Doc.",
        accessor: (d) => {
          return d.TipoDocumento === null ? "" : d.TipoDocumento.descripcion;
        },
      },
      {
        Header: "Estado",
        accessor: (d) => (
          <div className="text-center">
            <Badge variant={getBadgeEstado(d.Estado.estadoId)}>
              {d.Estado.descripcion}
            </Badge>
          </div>
        ),
      },
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
        }/victima?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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

export default VictimaList;
