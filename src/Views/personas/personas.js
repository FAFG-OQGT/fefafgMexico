import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import PersonasList from "../../App/components/personas/personasList";
import PersonasNueva from "../../App/components/personas/personasNueva";
import PersonasEdit from "../../App/components/personas/personasEdit";
import MensajeAlerta from "../../App/components/MensajeAlerta/MensajeAlerta";
import {apiFetchAccesoXObjeto} from "../../utils/fetchCatalogos";

//css
import "./personas.css";
import userContext from "../../context/userContext";

function Personas(props) {
  const user = useContext(userContext);
  const [resetList, setresetList] = useState(false);

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
    var data = await apiFetchAccesoXObjeto(user.token, user.usuarioId, 4);
    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
  };
  const [modalNuevaPersona, setmodalNuevaPersona] = useState(false);
  const [onNuevaPersona, setonNuevaPersona] = useState(false);

  const [modaleditarPersona, setmodaleditarPersona] = useState(false);
  const [oneditarPersona, setoneditarPersona] = useState(false);
  const [personaEditar, setPersonaEditar] = useState({});

  const abrirModalNuevo = (valor) => {
    setmodalNuevaPersona(valor);
  };
  const onCerrarModalNuevo = () => setmodalNuevaPersona(false);

  const onNuevoDone = (val) => setonNuevaPersona(val);

  const onEditarDone = (val) => setoneditarPersona(val);
  const onCerrarModalEdita = () => setmodaleditarPersona(false);
  const onabrirModalEdit = (personToEdit) => {
    setmodaleditarPersona(true);
    setPersonaEditar(personToEdit);
  };

  useEffect(() => {
    if (onNuevaPersona) {
      onCerrarModalNuevo();
      setonNuevaPersona(false);
      setresetList(true);
    }
  }, [onNuevaPersona]);

  useEffect(() => {
    if (oneditarPersona) {
      onCerrarModalEdita();
      setoneditarPersona(false);
      setresetList(true);
    }
  }, [oneditarPersona]);
  useEffect(() => {
    fetchAccesos();
    return () => {};
  }, []);
  return (
    <div className="animated fadeIn" id="containerPersonas">
      <Aux>
        <Row>
          <Col>
            <Card title="Personas" isOption>
              <Col xl={12}>
                {accesos && accesos.agregar === true && (
                  <Row>
                    <Col>
                      <Button
                        key="btnSaveEditPerson"
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
                <PersonasList
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                  onabrirModalEdit={onabrirModalEdit}
                  actualizar={accesos.actualizar}
                ></PersonasList>
              </Col>
            </Card>
          </Col>
        </Row>
      </Aux>

      <Modal
        size="lg"
        show={modalNuevaPersona}
        onHide={() => setmodalNuevaPersona(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Nueva Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonasNueva
            onNuevoDone={onNuevoDone}
            onCerrarModalNuevo={onCerrarModalNuevo}
            mensajeAlerta={MensajeAlerta}
            agregar={accesos.agregar}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={modaleditarPersona}
        onHide={() => setmodaleditarPersona(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Editar [{personaEditar.personaId}]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonasEdit
            persona={personaEditar}
            onEditarDone={onEditarDone}
            onCerrarModalEdita={onCerrarModalEdita}
            mensajeAlerta={MensajeAlerta}
            actualizar={accesos.actualizar}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Personas;
