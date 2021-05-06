import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button, Badge, Modal } from "react-bootstrap";
import config from "../../config";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import PNotify from "pnotify/dist/es/PNotify";
import "pnotify/dist/es/PNotifyButtons";
import "pnotify/dist/es/PNotifyConfirm";
import "pnotify/dist/es/PNotifyCallbacks";

//componentes especificos
import TablaGenerica from "../../App/components/TablaGenerica/TablaGenerica";
import UsuariosEdit from "./usuariosEdit";
import UsuariosNuevo from "./usuariosNuevo";
import CambioContrasena from "../../App/components/usuarios/cambioContrasena";

//css
import "./usuarios.css";

import userContext from "../../context/userContext";
const mensajeAlerta = (titulo, mensaje, tipo) => {
  if (tipo === "success")
    PNotify.success({
      title: titulo,
      text: mensaje,
    });
  if (tipo === "error")
    PNotify.error({
      title: titulo,
      text: mensaje,
    });
};

const getBadge = (status) => {
  return status === 2 ? "danger" : status === 1 ? "success" : "primary";
};

function Usuarios(props) {
  const [usuarioEdit, setUsuarioEdit] = useState({});
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [modalEditIsOpen, setmodalEditIsOpen] = useState(false);
  const [editDoneC, seteditDoneC] = useState(false);
  const [modalNewIsOpen, setmodalNewIsOpen] = useState(false);
  const [nuevoDoneC, setnuevoDoneC] = useState(false);
  const [modalCambioCon, setmodalCambioCon] = useState(false);
  const [cambioConDone, setcambioConDone] = useState(false);
  const [totalRegisters, settotalRegisters] = useState(0);
  const [paginaIndex, setpaginaIndex] = useState(0);
  const fetchIdRef = React.useRef(0);
  const user = useContext(userContext);



  const openModalEdit = (openModal, usuarioToEdit) => {
    seteditDoneC(false);
    setmodalEditIsOpen(openModal);
    setUsuarioEdit(usuarioToEdit);
  };

  const openModalNew = (openModal, usuarioToEdit) => {
    setnuevoDoneC(false);
    setmodalNewIsOpen(openModal);
  };

  const openModalCambioCon = (openModal, usuarioToEdit) => {
    setcambioConDone(false);
    setmodalCambioCon(openModal);
  };

 

  const columns = React.useMemo(
    () => [
      {
        Header: "---",
        id: "editClick",
        Cell: ({ row }) => (
          <div className="text-center">
            <Button
              type="submit"
              className="btn-icon"
              variant="outline-primary"
              size="sm"
              onClick={(e) => openModalEdit(true, row.original)}
            >
              <i className="feather icon-edit" />{" "}
            </Button>
          </div>
        ),
      },
      {
        Header: "Usuario",
        accessor: "usuario",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Estado",
        accessor: "estadoId",
        Cell: ({ value }) => (
          <div className="text-center">
            <Badge variant={getBadge(value)}>
              {value === 2 ? "Inactivo" : value === 1 ? "Activo" : "--"}
            </Badge>
          </div>
        ),
      },
      {
        Header: "Cambio contraseña",
        id: "passClick",
        Cell: ({ row }) => (
          <div className="text-center">
            <Button
              type="submit"
              className="btn-icon"
              variant="outline-warning"
              size="sm"
              onClick={(e) => openModalCambioCon(true, row.original)}
            >
              <i className="feather icon-lock" />{" "}
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    if (editDoneC || nuevoDoneC) {
      setLoading(true);
      fetchUsuarios(10, paginaIndex);
      setLoading(false);
      setmodalEditIsOpen(false);
      setmodalNewIsOpen(false);
      setnuevoDoneC(false);
      seteditDoneC(false);
    }
  }, [editDoneC, nuevoDoneC]);


  const fetchUsuarios = async (pageSize, pageIndex, searchValue) => {
    if (searchValue === undefined) searchValue = "";
    setLoading(true);
 
    const res = await fetch(`${config.urlApi} "/usuario?pagina="${pageIndex.toString()}&limite=${pageSize.toString()}&filtro=${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    )
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => res.json());
  
    setData(res.rows);
    settotalRegisters(res.count);
    setPageCount(Math.ceil(res.count / pageSize));
  };

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, searchValue }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        fetchUsuarios(pageSize, pageIndex, searchValue);
        setLoading(false);
      }
    },
    []
  );

  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <Card title="Usuarios" isOption>
              <Col xl={12}>
                <Row>
                  <Col>
                    <Button
                      key="btnSaveEditPerson"
                      variant="outline-success"
                      size="sm"
                      onClick={(e) => openModalNew(true)}
                    >
                      <i className="feather icon-plus" />
                      Agregar
                    </Button>
                  </Col>
                </Row>
                <TablaGenerica
                  columns={columns}
                  data={data}
                  fetchData={fetchData}
                  loading={loading}
                  pageCount={pageCount}
                  className="animated fadeIn"
                  totalRegis={totalRegisters}
                  fnPaginaIndex={(val) => setpaginaIndex(val)}
                />
              </Col>
            </Card>
          </Col>
        </Row>
      </Aux>

      <Modal
        size="lg"
        show={modalEditIsOpen}
        onHide={() => setmodalEditIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Editar [{usuarioEdit.usuarioId}]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuariosEdit
            usuario={usuarioEdit}
            funcEditDone={(val) => seteditDoneC(val)}
            funcCloseModal={(val) => setmodalEditIsOpen(val)}
            mensajeAlerta={mensajeAlerta}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={modalNewIsOpen}
        onHide={() => setmodalNewIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Nueva Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuariosNuevo
            funcnuevoDone={(val) => setnuevoDoneC(val)}
            funcCloseModalNuevo={ (val) => setmodalNewIsOpen(val)}
            mensajeAlerta={mensajeAlerta}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={modalCambioCon}
        onHide={() => setmodalCambioCon(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Cambio contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CambioContrasena
            funccambioCon={(val) => setcambioConDone(val)}
            funcCloseModalcambioCon={(val) => setmodalCambioCon(val)}
            mensajeAlerta={mensajeAlerta}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Usuarios;
