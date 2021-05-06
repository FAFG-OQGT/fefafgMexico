import React, {useState, useEffect} from "react";
import {Row, Col, Button,  Modal} from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import PersonasList from "../../App/components/personas/personasList";
import PersonasNueva from "../../App/components/personas/personasNueva";
import PersonasEdit from "../../App/components/personas/personasEdit";
import MensajeAlerta from "../../App/components/MensajeAlerta/MensajeAlerta"
 
//css
import "./personas.css";
//import userContext from "../../context/userContext";
 
function Personas(props) {
  //const user = useContext(userContext);
  const [resetList, setresetList] = useState(false);

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

  return (
    <div className="animated fadeIn"  id="containerPersonas" >
      <Aux>
        <Row>
          <Col>
            <Card title="Personas" isOption>
              <Col xl={12}>
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
                <PersonasList
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                  onabrirModalEdit={onabrirModalEdit}
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
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Personas;
