import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import MainCard from "../../../App/components/MainCard";
import CoincidenciasList from "../../../App/components/Coincidencias/CoincidenciasList";
import CoincidenciaCasoAdd from "../../../App/components/CoincidenciaCaso/CoincidenciaCasoAdd";

import VictimaDetalle from "../../../App/components/Victima/VictimaDetalle";
import OsamentaDetalle from "../../../App/components/Osamenta/OsamentaDetalle";
import DonanteListEdit from "../../../App/components/Coincidencias/Donantes/DonantesListEdit";
import NotasLaboratorioList from "../../../App/components/Coincidencias/NotasLaboratorio/NotasLaboratorioList";
import AnotacionesDidList from "../../../App/components/Coincidencias/AnotacionesDid/AnotacionesDidList";
import SeguimientoDidList from "../../../App/components/Coincidencias/SeguimientoDid/SeguimientoDidList";

import SeguimientoDidAdd from "../../../App/components/Coincidencias/SeguimientoDid/SeguimientoDidAdd";
import NotasLaboratorioAdd from "../../../App/components/Coincidencias/NotasLaboratorio/NotasLaboratorioAdd";
import AnotacionesDidAdd from "../../../App/components/Coincidencias/AnotacionesDid/AnotacionesDidAdd";
import ArchivosListPrincipal from "../../../App/components/Coincidencias/Archivos/ArchivosListPrincipal";

import FioUpdate from "../../../App/components/Coincidencias/Fio/FioUpdate";
import PreviewReportePdf from "../../../App/components/ReportePdf/PreviewReportePdf";

import userContext from "../../../context/userContext";

import MensajeAlerta from "../../../App/components/MensajeAlerta/MensajeAlerta"
//css
import "./coincidencias.css";



function Coincidencias(props) {
  const userI = useContext(userContext);
  const USUARIOS_CON_ACCESO = [1, 2, 3, 4, 5, 6, 8];


  const [permisoAgregar, setpermisoAgregar] = useState(false);

  const [resetList, setresetList] = useState(false);
  const [onedit, setonedit] = useState(false);

  const [modalOsamenta, setmodalOsamenta] = useState(false);

  const [modalVictima, setmodalVictima] = useState(false);

  const [modalDonante, setmodalDonante] = useState(false);

  const [modalNotLab, setmodalNotLab] = useState(false);

  const [modalAnotacionesDID, setmodalAnotacionesDID] = useState(false);
  const [modalSeguimientoDID, setmodalSeguimientoDID] = useState(false);
  const [modalArchivosCoincidencia, setmodalArchivosCoincidencia] = useState(
    false
  );
  const [modalAgregarCoincidencia, setmodalAgregarCoincidencia] = useState(
    false
  );

  const [modalFio, setmodalFio] = useState(false);
  const [modalPrintFio, setmodalPrintFio] = useState(false);
  const [modalPrintReporte, setmodalPrintReporte] = useState(false);

  const [modal, setmodal] = useState(false);

  const [dataSelect, setDataSelect] = React.useState({});

  const onabrirModal = (opcion, value) => {
    setDataSelect(value);
    switch (opcion) {
      case "Donante":
        setmodalDonante(true);
        break;
      case "Victima":
        setmodalVictima(true);
        break;
      case "Osamenta":
        setmodalOsamenta(true);
        break;
      case "NotaLaboratorio":
        setmodalNotLab(true);
        break;

      case "AnotacionesDID":
        setmodalAnotacionesDID(true);
        break;
      case "CoincidenciaAgregar":
        setmodalAgregarCoincidencia(true);
        break;
      case "SeguimientoDID":
        setmodalSeguimientoDID(true);
        break;
      case "ArchivosCoincidencia":
        setmodalArchivosCoincidencia(true);
        break;
      case "FIO":
        setmodalFio(true);
        break;
      case "PRINTFIO":
        setmodalPrintFio(true);
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
    setmodalDonante(false);
    setmodalVictima(false);
    setmodalOsamenta(false);
    setmodalNotLab(false);
    setmodalAnotacionesDID(false);
    setmodalAgregarCoincidencia(false);
    setmodalSeguimientoDID(false);
    setmodalArchivosCoincidencia(false);
    setmodalFio(false);
    setmodalPrintFio(false);
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
    if (userI.usuarioId < 9) {
      setpermisoAgregar(true)
    }
    return () => {
    }
  }, [])

  return (
    <div className="animated fadeIn" id="containerCoincidencias">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Coincidencias" isOption>
              <Col xl={12}>
                {permisoAgregar && (
                  <Row>
                    <Col>
                      <Button
                        key="btnSaveEditPerson"
                        variant="outline-success"
                        size="sm"
                        onClick={(e) => {
                          onabrirModal("CoincidenciaAgregar", null);
                        }}
                      >
                        <i className="feather icon-plus" />
                      Agregar
                    </Button>
                    </Col>
                  </Row>
                )}
                <CoincidenciasList
                  onabrirModal={onabrirModal}
                  reset={resetList}
                  setresetList={(val) => setresetList(val)}
                ></CoincidenciasList>
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
              : modalDonante
                ? "md"
                : modalNotLab
                  ? "lg"
                  : modalAnotacionesDID
                    ? "lg"
                    : modalSeguimientoDID
                      ? "lg"
                      : modalAgregarCoincidencia
                        ? "xl"
                        : modalArchivosCoincidencia
                          ? "xl"
                          : modalFio
                            ? "xl"
                            : modalPrintFio
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
              ? `Osamenta | Coincidencia : [${dataSelect.coincidenciaId}]`
              : modalVictima
                ? `Victima | Coincidencia : [${dataSelect.coincidenciaId}]`
                : modalDonante
                  ? `Donante | Coincidencia : [${dataSelect.coincidenciaId}]`
                  : modalNotLab
                    ? `Nota Laboratorio | Coincidencia : [${dataSelect.coincidenciaId}]`
                    : modalAnotacionesDID
                      ? `Anotaciones DID | Coincidencia : [${dataSelect.coincidenciaId}]`
                      : modalSeguimientoDID
                        ? `Seguimiento Solicitudes DID | Coincidencia : [${dataSelect.coincidenciaId}]`
                        : modalAgregarCoincidencia
                          ? "Crear nueva coincidencia"
                          : modalArchivosCoincidencia
                            ? `Archivos de coincidencia : [${dataSelect.coincidenciaId}]`
                            : modalFio
                              ? `Fio de coincidencia : [${dataSelect.coincidenciaId}]`
                              : modalPrintFio
                                ? `Fio de coincidencia : [${dataSelect.coincidenciaId}]`
                                : modalPrintReporte
                                  ? `Reporte coincidencia : [${dataSelect.coincidenciaId}]`
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
          {modalAgregarCoincidencia && (
            <CoincidenciaCasoAdd
              onEditDone={onEditDone}
              mensajeAlerta={MensajeAlerta}
            ></CoincidenciaCasoAdd>
          )}
          {modalOsamenta && (
            <OsamentaDetalle
              osamentaId={dataSelect.osamentaId}
              isDisabled={true}
            ></OsamentaDetalle>
          )}
          {modalDonante && (
            <DonanteListEdit
              CoincidenciaId={dataSelect.coincidenciaId}
              DonanteCoincidencia={dataSelect.DonanteCoincidencia}
              onEditDone={onEditDone}
              mensajeAlerta={MensajeAlerta}
            ></DonanteListEdit>
          )}

          {modalNotLab && (
            <div>
              <NotasLaboratorioAdd
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></NotasLaboratorioAdd>
              <NotasLaboratorioList
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></NotasLaboratorioList>
            </div>
          )}
          {modalAnotacionesDID && (
            <div>
              <AnotacionesDidAdd
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></AnotacionesDidAdd>
              <AnotacionesDidList
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></AnotacionesDidList>
            </div>
          )}
          {modalSeguimientoDID && (
            <div>
              <SeguimientoDidAdd
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></SeguimientoDidAdd>
              <SeguimientoDidList
                CoincidenciaId={dataSelect.coincidenciaId}
                onEditDone={onEditDone}
                mensajeAlerta={MensajeAlerta}
              ></SeguimientoDidList>
            </div>
          )}
          {modalArchivosCoincidencia && (
            <div>
              <ArchivosListPrincipal
                CoincidenciaId={dataSelect.coincidenciaId}
                preview={false}
                mensajeAlerta={MensajeAlerta}
              ></ArchivosListPrincipal>
            </div>
          )}

          {modalFio && (
            <div>
              <FioUpdate
                CoincidenciaId={dataSelect.coincidenciaId}
                mensajeAlerta={MensajeAlerta}
                onEditDone={onEditDone}
                oncerrarModal={oncerrarModal}
              ></FioUpdate>
            </div>
          )}
          {modalPrintFio && (
            <div>
              <PreviewReportePdf
                Id={dataSelect.coincidenciaId}
                reporte={"Fio"}
                mensajeAlerta={MensajeAlerta}
                oncerrarModal={oncerrarModal}
              ></PreviewReportePdf>
            </div>
          )}
          {modalPrintReporte && (
            <div>
              <PreviewReportePdf
                Id={dataSelect.coincidenciaId}
                reporte={"Coincidencia"}
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
export default Coincidencias;
