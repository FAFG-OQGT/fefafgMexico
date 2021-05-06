import React, {useState, useEffect} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import OsamentaList from "../../../../App/components/Osamenta/OsamentaList";
import OsamentaEdit from "../../../../App/components/Osamenta/OsamentaEdit";

import OsamentaAdd from "../../../../App/components/Osamenta/OsamentaAdd";
//css
import "./osamenta.css";
import MensajeAlerta from "../../../../App/components/MensajeAlerta/MensajeAlerta"

function Osamenta(props) {
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
            <MainCard title="Osamentas" isOption>
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
                <OsamentaList
                  onabrirModal={onabrirModal}
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                ></OsamentaList>
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
                ? `Editar Osamenta [${dataSelect.osamentaDet}]`
                : modalAdd
                ? "Agregar osamenta"
                : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalEdit ? (
              <OsamentaEdit
                osamenta={dataSelect}
                onEditDone={onEditDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
              ></OsamentaEdit>
            ) : modalAdd ? (
              <OsamentaAdd
                onAddDone={onAddDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
              ></OsamentaAdd>
            ) : (
              <div></div>
            )}
          </Modal.Body>
        </Modal>
      }{" "}
    </div>
  );
}

export default Osamenta;
