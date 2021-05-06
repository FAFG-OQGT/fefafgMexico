import React, {useState, useEffect} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import VictimaList from "../../../../App/components/Victima/VictimaList.js";
import VictimaEdit from "../../../../App/components/Victima/VictimaEdit";
import VictimaAdd from "../../../../App/components/Victima/VictimaAdd";

//css
import "./Victima.css";
import MensajeAlerta from "../../../../App/components/MensajeAlerta/MensajeAlerta"
function Victima(props) {
  const [resetList, setresetList] = useState(false);

  const [modalEdit, setmodalEdit] = useState(false);
  const [onedit, setonedit] = useState(false);

  const [modalAdd, setmodalAdd] = useState(false);
  const [onAdded, setonAdded] = useState(false);

  const [modal, setmodal] = useState(false);

  const [dataSelect, setDataSelect] = React.useState({});

  const onabrirModal = (opcion, value) => {
    switch (opcion) {
      case "Editar":
        setmodalEdit(true);
        setDataSelect(value);
        break;
      case "Crear":
        setmodalAdd(true);
        break;
      default:
      // code block
    }

    setmodal(true);
  };

  const onEditDone = (val) => setonedit(val);
  const onAddDone = (val) => setonAdded(val);

  const oncerrarModal = () => {
    setmodalEdit(false);
    setmodalAdd(false);
    setDataSelect({});
    setmodal(false);
  };

  useEffect(() => {
    if (onedit) {
      oncerrarModal();
      setonedit(false);
      setresetList(true);
    }
  }, [onedit]);
  useEffect(() => {
    if (onAdded) {
      oncerrarModal();
      setonAdded(false);
      setresetList(true);
    }
  }, [onAdded]);

  return (
    <div className="animated fadeIn" id="containerCoincidencias">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Victimas" isOption>
              <Col xl={12}>
                <Row>
                  <Col>
                    <Button
                      key="btnSaveEditPerson"
                      variant="outline-success"
                      size="sm"
                      onClick={(e) => onabrirModal("Crear", null)}
                    >
                      <i className="feather icon-plus" />
                      Agregar
                    </Button>
                  </Col>
                </Row>
                <VictimaList
                  onabrirModal={onabrirModal}
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                ></VictimaList>
              </Col>
            </MainCard>
          </Col>
        </Row>
      </Aux>
      {
        <Modal  size="xl" show={modal} onHide={oncerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">
              {modalEdit
                ? `Editar victima [${dataSelect.codigoVictima}]`
                : modalAdd
                ? "Agregar victima"
                : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalEdit ? (
              <VictimaEdit
                victima={dataSelect}
                onEditDone={onEditDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
              ></VictimaEdit>
            ) : modalAdd ? (
              <VictimaAdd
                onAddDone={onAddDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
              ></VictimaAdd>
            ) : (
              <div></div>
            )}
          </Modal.Body>
        </Modal>
      }{" "}
    </div>
  );
}

export default Victima;
