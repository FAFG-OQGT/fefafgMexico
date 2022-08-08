import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import UsuariosList from "../../App/components/usuarios/UsuariosList";
import UsuariosNuevo from "../../App/components/usuarios/UsuariosNuevo";
import UsuariosEditar from "../../App/components/usuarios/UsuariosEdit";
import CambioContrasena from "../../App/components/usuarios/cambioContrasena";
import CambioPerfil from "../../App/components/usuarios/cambioPerfil";
import {apiFetchAccesoXObjeto} from "../../utils/fetchCatalogos";
import userContext from "../../context/userContext";

import MensajeAlerta from "../../App/components/MensajeAlerta/MensajeAlerta";
//css
import "./usuarios.css";

//css
import "./usuarios.css";

function Usuarios(props) {
  const user = useContext(userContext);

  const [accesos, setAccesos] = useState({
    actualizar: false,
    ver: false,
    agregar: false,
    eliminar: false,
    verArchivo: false,
    agregarArchivo: false,
    eliminarArchivo: false,
    descargarArchivo: false,
    verAnotaciones: false,
    agregarAnotaciones: false,
    verSeguimientoSolicitud: false,
    agregarSeguimientoSolicitud: false,
    verNotasLaboratorio: false,
    agregarNotasLaboratorio: false,
    verFio: false,
    editarFio: false,
    verDonantes: false,
    editarDonantes: false
  });

  const fetchAccesos = async () => {
    var data = await apiFetchAccesoXObjeto(user.token, user.usuarioId, 5);
    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
  };
  //const user = useContext(userContext);
  const [resetList, setresetList] = useState(false);

  const [modalNuevoUsuario, setmodalNuevoUsuario] = useState(false);
  const [onNuevoUsuario, setonNuevoUsuario] = useState(false);

  const [modaleditarUsuario, setmodaleditarUsuario] = useState(false);
  const [oneditarUsuario, setoneditarUsuario] = useState(false);
  const [usuarioEditar, setusuarioEditar] = useState({});

  const [modalCambioCon, setmodalCambioCon] = useState(false);
  const [onCambioCon, setoncambioCon] = useState(false);

  const [modalCambioRol, setmodalCambioRol] = useState(false);
  const [onCambioRol, setoncambioRol] = useState(false);

  const abrirModalNuevo = (valor) => {
    setmodalNuevoUsuario(valor);
  };
  const onCerrarModalNuevo = () => setmodalNuevoUsuario(false);

  const onNuevoDone = (val) => setonNuevoUsuario(val);

  const onEditarDone = (val) => setoneditarUsuario(val);
  const onCerrarModalEdita = () => setmodaleditarUsuario(false);
  const onabrirModalEdit = (usuarioToEdit) => {
    setmodaleditarUsuario(true);
    setusuarioEditar(usuarioToEdit);
  };

  const onabrirModalCambio = (usuarioToEdit) => {
    setmodalCambioCon(true);
    setusuarioEditar(usuarioToEdit);
  };

  const onabrirModalCambioRol = (usuarioToEdit) => {
    setmodalCambioRol(true);
    setusuarioEditar(usuarioToEdit);
  };

  const onCerrarModalCambio = () => setmodalCambioCon(false);

  const onCambioConDone = (val) => setoncambioCon(val);

  const onCerrarModalRol = () => setmodalCambioRol(false);

  const onCambioRolDone = (val) => setoncambioRol(val);

  useEffect(() => {
    if (onNuevoUsuario) {
      onCerrarModalNuevo();
      setonNuevoUsuario(false);
      setresetList(true);
    }
  }, [onNuevoUsuario]);

  useEffect(() => {
    if (oneditarUsuario) {
      onCerrarModalEdita();
      setoneditarUsuario(false);
      setresetList(true);
    }
  }, [oneditarUsuario]);

  useEffect(() => {
    if (onCambioRol) {
      onCerrarModalRol();
      setoncambioRol(false);
      setresetList(true);
    }
  }, [onCambioRol]);

  useEffect(() => {
    if (onCambioCon) {
      onCerrarModalCambio();
      setoncambioCon(false);
      setresetList(false);
    }
  }, [onCambioCon]);
  useEffect(() => {
    fetchAccesos();
    return () => {};
  }, []);
  return (
    <div className="animated fadeIn">
      <Aux>
        <Row>
          <Col>
            <Card title="Usuarios" isOption>
              <Col xl={12}>
              {accesos && accesos.agregar === true && (
                  <Row>
                    <Col>
                      <Button
                        key="btnSaveAddUser"
                        variant="outline-success"
                        size="sm"
                        onClick={(e) => abrirModalNuevo(true)}
                      >
                        <i className="feather icon-plus" />
                        Agregar
                      </Button>
                    </Col>
                  </Row>
                )}
                <UsuariosList
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                  onabrirModalEdit={onabrirModalEdit}
                  onabrirModalCambio={onabrirModalCambio}
                  onabrirModalCambioRol={onabrirModalCambioRol}
                  mensajeAlerta={MensajeAlerta}
                  actualizar={accesos.actualizar}
                ></UsuariosList>
              </Col>
            </Card>
          </Col>
        </Row>
      </Aux>

      <Modal
        size="lg"
        show={modalNuevoUsuario}
        onHide={() => setmodalNuevoUsuario(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Nueva Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuariosNuevo
            onNuevoDone={onNuevoDone}
            onCerrarModalNuevo={onCerrarModalNuevo}
            mensajeAlerta={MensajeAlerta}
            agregar={accesos.agregar}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={modaleditarUsuario}
        onHide={() => setmodaleditarUsuario(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Editar [{usuarioEditar.usuarioId}]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuariosEditar
            usuario={usuarioEditar}
            onEditarDone={onEditarDone}
            onCerrarModalEdita={onCerrarModalEdita}
            mensajeAlerta={MensajeAlerta}
            actualizar={accesos.actualizar}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={modalCambioCon}
        onHide={() => setmodalCambioCon(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">
            Cambio contraseña [{usuarioEditar.usuario}]
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CambioContrasena
            usuario={usuarioEditar}
            onCambioConDone={onCambioConDone}
            onCerrarModalCambio={onCerrarModalCambio}
            mensajeAlerta={MensajeAlerta}
            actualizar={accesos.actualizar}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="md"
        show={modalCambioRol}
        onHide={() => setmodalCambioRol(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">
            Cambio de perfil [{usuarioEditar.usuario}]
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CambioPerfil
            usuario={usuarioEditar}
            onCambioRolDone={onCambioRolDone}
            onCerrarModalRol={onCerrarModalRol}
            mensajeAlerta={MensajeAlerta}
            actualizar={accesos.actualizar}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Usuarios;
