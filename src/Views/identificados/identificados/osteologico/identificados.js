import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import IdentificadosList from "../../../../App/components/Identificados/osteologico/IdentificadosList";
import IdentificadosAddOsteologico from "../../../../App/components/Identificados/osteologico/IdentificadosAddOsteologico";

import VictimaDetalle from "../../../../App/components/Victima/VictimaDetalle";
import OsamentaDetalle from "../../../../App/components/Osamenta/OsamentaDetalle";

import ArchivosListPrincipal from "../../../../App/components/Identificados/osteologico/Archivos/ArchivosListPrincipal";
import PreviewReportePdf from "../../../../App/components/ReportePdf/PreviewReportePdf";

import userContext from "../../../../context/userContext";
import MensajeAlerta from "../../../../App/components/MensajeAlerta/MensajeAlerta";
//css
import "./identificados.css";

function Identificados(props) {
  const userI = useContext(userContext);
  const USUARIOS_CON_ACCESO = [1, 2, 3, 4, 5, 6, 8];

  const [permisoAgregar, setpermisoAgregar] = useState(false);
  const [resetList, setresetList] = useState(false);
  const [onedit, setonedit] = useState(false);

  const [modalOsamenta, setmodalOsamenta] = useState(false);

  const [modalVictima, setmodalVictima] = useState(false);

  const [modalArchivosIdentificado, setmodalArchivosIdentificado] = useState(
    false
  );

  const [modal, setmodal] = useState(false);

  const [modalAgregarIdentificado, setmodalAgregarIdentificado] = useState(
    false
  );

  const [modalPrintReporte, setmodalPrintReporte] = useState(false);
  const [dataSelect, setDataSelect] = React.useState({});

  const onabrirModal = (opcion, value) => {
    setDataSelect(value);
    switch (opcion) {
      case "Victima":
        setmodalVictima(true);
        break;
      case "Osamenta":
        setmodalOsamenta(true);
        break;
      case "IdentificadoAgregar":
        setmodalAgregarIdentificado(true);
        break;
      case "ArchivosIdentificadoOst":
        setmodalArchivosIdentificado(true);
        break;
      case "PRINT":
        setmodalPrintReporte(true);
        break;
      default:
      // code block
    }

    setmodal(true);
  };
  const onEditDone = (val) => setonedit(val);

  const oncerrarModal = (valor) => {
    setDataSelect({});
    setmodalVictima(false);
    setmodalOsamenta(false);
    setmodalAgregarIdentificado(false);
    setmodalArchivosIdentificado(false);
    setmodalPrintReporte(false);
    setmodal(valor);
  };
  useEffect(() => {
    if (onedit) {
      setonedit(false);
      setresetList(true);
      oncerrarModal(false);
    }
  }, [onedit]);
  useEffect(() => {
    return () => { };
  });

  useEffect(() => {
    if (userI.usuarioId < 9) {
      setpermisoAgregar(true)
    }
    return () => {
    }
  }, [])
  return (
    <div className="animated fadeIn" id="containerIdentificados">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Identificados Osteologico" isOption>
              <Col xl={12}>
                {permisoAgregar && (
                  <Row>
                    <Col>
                      <Button
                        key="btnSaveEditPerson"
                        variant="outline-success"
                        size="sm"
                        onClick={(e) => {
                          onabrirModal("IdentificadoAgregar", null);
                        }}
                      >
                        <i className="feather icon-plus" />
                      Agregar
                    </Button>
                    </Col>
                  </Row>
                )}
                <IdentificadosList
                  onabrirModal={onabrirModal}
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                ></IdentificadosList>
              </Col>
            </MainCard>
          </Col>
        </Row>
      </Aux>

      <Modal
        size={
          modalOsamenta
            ? "lg"
            : modalVictima
              ? "lg"
              : modalAgregarIdentificado
                ? "xl"
                : modalArchivosIdentificado
                  ? "xl"
                  : modalPrintReporte
                    ? "xl"
                    : "md"
        }
        show={modal}
        onHide={oncerrarModal}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">
            {modalOsamenta
              ? `Osamenta | Identificado : [${dataSelect.identificadoOstId}]`
              : modalVictima
                ? `Victima | Identificado : [${dataSelect.identificadoOstId}]`
                : modalAgregarIdentificado
                  ? `Crear nuevo identificado Osteologico`
                  : modalArchivosIdentificado
                    ? `Archivos | Identificado : [${dataSelect.identificadoOstId}]`
                    : modalPrintReporte
                      ? `Identificado Osteologico: [${dataSelect.identificadoOstId}]`
                      : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalVictima && (
            <VictimaDetalle
              victimaId={dataSelect.victimaId}
              isDisabled={true}
            ></VictimaDetalle>
          )}

          {modalOsamenta && (
            <OsamentaDetalle
              osamentaId={dataSelect.osamentaId}
              isDisabled={true}
            ></OsamentaDetalle>
          )}

          {modalAgregarIdentificado && (
            <IdentificadosAddOsteologico
              onEditDone={onEditDone}
              mensajeAlerta={MensajeAlerta}
            ></IdentificadosAddOsteologico>
          )}
          {modalArchivosIdentificado && (
            <div>
              <ArchivosListPrincipal
                IdentificadoId={dataSelect.identificadoOstId}
                preview={false}
                mensajeAlerta={MensajeAlerta}
              ></ArchivosListPrincipal>
            </div>
          )}

          {modalPrintReporte && (
            <div>
              <PreviewReportePdf
                Id={dataSelect.identificadoOstId}
                reporte={"Osteologico"}
                mensajeAlerta={MensajeAlerta}
                oncerrarModal={oncerrarModal}
              ></PreviewReportePdf>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Identificados;
