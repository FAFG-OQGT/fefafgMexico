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

function PersonasList({
  onabrirModalEdit,
  reset,
  setresetList,
  actualizar = false
}) {
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
            onClick={(e) => onabrirModalEdit(row.original)}
          >
            <i className="feather icon-edit" />{" "}
          </Button>
        )
      },
      {
        Header: "P. Nombre",
        accessor: "nombre1"
      },
      {
        Header: "S. Nombre",
        accessor: "nombre2"
      },
      {
        Header: "P. Apellido",
        accessor: "apellido1"
      },
      {
        Header: "S. Apellido",
        accessor: "apellido2"
      },
      {
        Header: "Nacimiento",
        accessor: (d) => {
          return moment(d.fechaNacimiento).utc().format("DD-MM-YYYY");
        }
      },
      {
        Header: "Genero",
        accessor: (d) => {
          return d.generoId === 1 ? "Masculino" : "Femenino";
        }
      },
      {
        Header: "Telefono",
        accessor: "telefono"
      },
      {
        Header: "Estado",
        accessor: "estadoId",
        Cell: ({value}) => (
          <div className="text-center">
            <Badge variant={getBadge(value)}>
              {value === 2 ? "Inactivo" : value === 1 ? "Activo" : "--"}
            </Badge>
          </div>
        )
      }
    ],
    [data]
  );
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };
  const fetchPersonas = async (pageSize, pageIndex, searchValue) => {
    if (searchValue === undefined) searchValue = "";
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          config.urlApi
        }/persona?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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
      fetchPersonas(pageSize, pageIndex, searchValue);
    }
  }, []);

  useEffect(() => {
    if (reset) {
      fetchPersonas(10, 0, "");
      setresetList(false);
    }
    return () => {};
  }, [reset]);

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
              reset={reset}
            />
          </Col>
        </Row>
      </Aux>
    </div>
  );
}
export default PersonasList;
