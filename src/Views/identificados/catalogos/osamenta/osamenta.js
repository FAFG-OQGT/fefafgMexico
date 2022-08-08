import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import OsamentaList from "../../../../App/components/Osamenta/OsamentaList";
import OsamentaEdit from "../../../../App/components/Osamenta/OsamentaEdit";

import OsamentaAdd from "../../../../App/components/Osamenta/OsamentaAdd";
//css
import "./osamenta.css";
import MensajeAlerta from "../../../../App/components/MensajeAlerta/MensajeAlerta";
import {apiFetchAccesoXObjeto} from "../../../../utils/fetchCatalogos";
import userContext from "../../../../context/userContext";

function Osamenta(props) {
  const userI = useContext(userContext);
  const [resetList, setresetList] = useState(false);

  const [modalEdit, setmodalEdit] = useState(false);
  const [onedit, setonedit] = useState(false);

  const [modalAdd, setmodalAdd] = useState(false);
  const [onAdded, setonAdded] = useState(false);

  const [modal, setmodal] = useState(false);

  const [dataSelect, setDataSelect] = React.useState({});

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
    var data = await apiFetchAccesoXObjeto(userI.token, userI.usuarioId, 7);
    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
  };
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
  useEffect(() => {
    fetchAccesos();
    return () => {};
  }, []);

  return (
    <div className="animated fadeIn" id="containerCoincidencias">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Osamentas" isOption>
              <Col xl={12}>
                {accesos && accesos.agregar === true && (
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
                )}
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
        <Modal size="xl" show={modal} onHide={oncerrarModal}>
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
                osamentaIdUpdate={dataSelect.osamentaId}
                onEditDone={onEditDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
                actualizar={accesos.actualizar}
              ></OsamentaEdit>
            ) : modalAdd ? (
              <OsamentaAdd
                onAddDone={onAddDone}
                oncerrarModal={oncerrarModal}
                mensajeAlerta={MensajeAlerta}
                agregar={accesos.agregar}
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
