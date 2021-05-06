import React, {useContext, useState, useEffect} from "react";
import {
  Row,
  Col,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import config from "../../../config";
import axios from "axios";
import Aux from "../../../hoc/_Aux";

//componentes especificos
import TablaGenerica from "../TablaGenerica/TablaGenerica";

import userContext from "../../../context/userContext";
const getBadge = (status) => {
  return status === 2 ? "danger" : status === 1 ? "success" : "primary";
};

function UsuariosList(props) {
  const userC = useContext(userContext);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [pageCount, setPageCount] = React.useState(0);
  const [totalRegisters, settotalRegisters] = useState(0);

  const configReq = {
    headers: {Authorization: `Bearer ${userC.token}`},
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "---",
        id: "editClick",
        Cell: ({row}) => (
          <div className="text-center">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Editar</Tooltip>}
            >
              <Button
                type="submit"
                className="btn-icon"
                variant="outline-primary"
                size="sm"
                onClick={(e) => props.onabrirModalEdit(row.original.Usuario)}
              >
                <i className="feather icon-edit" />{" "}
              </Button>
            </OverlayTrigger>
          </div>
        ),
      },
      {
        Header: "Usuario",
        accessor: "Usuario.usuario",
      },
      {
        Header: "Correo",
        accessor: "Usuario.email",
      },
      {
        Header: "Puesto",

        accessor: (d) => {
          var puesto = "";
          if (d.Usuario) {
            puesto =
              d.Usuario.Puesto === null ? "" : d.Usuario.Puesto.descripcion;
          }
          return puesto;
        },
      },
      {
        Header: "Estado",
        accessor: "Usuario.estadoId",
        Cell: ({value}) => (
          <div className="text-center">
            <Badge variant={getBadge(value)}>
              {value === 2 ? "Inactivo" : value === 1 ? "Activo" : "--"}
            </Badge>
          </div>
        ),
      },
      {
        Header: "",
        id: "passClick",
        Cell: ({row}) => (
          <div className="text-center">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Cambiar contraseña</Tooltip>}
            >
              <Button
                type="submit"
                className="btn-icon"
                variant="outline-danger"
                size="sm"
                onClick={(e) => props.onabrirModalCambio(row.original.Usuario)}
              >
                <i className="feather icon-lock" />{" "}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Perfil</Tooltip>}
            >
              <Button
                type="submit"
                className="btn-icon"
                variant="outline-dark"
                size="sm"
                onClick={(e) => props.onabrirModalCambioRol(row.original)}
              >
                <i className="feather icon-shield" />{" "}
              </Button>
            </OverlayTrigger>
          </div>
        ),
      },
    ],
    []
  );
  const fetchUsuarios = async (pageSize, pageIndex, searchValue, token) => {
    if (searchValue === undefined) searchValue = "";
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          config.urlApi
        }/usuario?pagina=${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
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
          props.mensajeAlerta(
            "Error",
            `${dataError.codigo} - ${dataError.data}`,
            "error"
          );
          console.log(`${dataError.codigo} - ${dataError.data}`);
        } else {
          props.mensajeAlerta("Error", error.response.statusText, "error");
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } else {
        props.mensajeAlerta("Error", error.response.statusText, "error");
        console.log(`${error.response.status} - ${error.response.statusText}`);
      }
    }
  };

  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({pageSize, pageIndex, searchValue}) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      fetchUsuarios(pageSize, pageIndex, searchValue, userC.token);
    }
  }, []);

  useEffect(() => {
    if (props.reset) {
      fetchUsuarios(10, 0, "", userC.token);
      props.setresetList(false);
    }
    return () => {};
  }, [props.reset]);
  useEffect(() => {
    return () => {};
  }, [data]);

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
              className="animated fadeIn"
              totalRegis={totalRegisters}
              reset={props.reset}
            />
          </Col>
        </Row>
      </Aux>
    </div>
  );
}

export default UsuariosList;
