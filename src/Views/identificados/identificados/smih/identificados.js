import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Modal} from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import IdentificadosList from "../../../../App/components/Identificados/Smih/IdentificadosList";
import IdentificadosAddSmih from "../../../../App/components/Identificados/Smih/IdentificadosAddSmih";

import ArchivosListPrincipal from "../../../../App/components/Identificados/Smih/Archivos/ArchivosListPrincipal";
import PreviewReportePdf from "../../../../App/components/ReportePdf/PreviewReportePdf";

import VictimaDetalle from "../../../../App/components/Victima/VictimaDetalle";
import OsamentaDetalle from "../../../../App/components/Osamenta/OsamentaDetalle";

import MensajeAlerta from "../../../../App/components/MensajeAlerta/MensajeAlerta";

import userContext from "../../../../context/userContext";

//css
import "./identificados.css";
import {apiFetchAccesoXObjeto} from "../../../../utils/fetchCatalogos";

function Identificados(props) {
  const userI = useContext(userContext);
  const [resetList, setresetList] = useState(false);
  const [onedit, setonedit] = useState(false);

  const [modalOsamenta, setmodalOsamenta] = useState(false);

  const [modalVictima, setmodalVictima] = useState(false);

  const [modalArchivosIdentificado, setmodalArchivosIdentificado] =
    useState(false);

  const [modal, setmodal] = useState(false);

  const [modalAgregarIdentificado, setmodalAgregarIdentificado] =
    useState(false);

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
      case "ArchivosIdentificadoSmih":
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

  const [accesos, setAccesos] = useState({
    actualizar: false,
    ver: false,
    agregar: false,
    eliminar: false,
    verArchivo: false,
    agregarArchivo: false,
    eliminarArchivo: false,
    descargarArchivo: false
  });
  const fetchAccesos = async () => {
    var data = await apiFetchAccesoXObjeto(userI.token, userI.usuarioId, 11);
    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
  };

  useEffect(() => {
    fetchAccesos();

    return () => {};
  }, []);
  return (
    <div className="animated fadeIn" id="containerIdentificados">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Identificados SmIh" isOption>
              <Col xl={12}>
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
              ? `Osamenta | Identificado : [${dataSelect.identificadoSmihId}]`
              : modalVictima
              ? `Victima | Identificado : [${dataSelect.identificadoSmihId}]`
              : modalAgregarIdentificado
              ? `Crear nuevo identificado SmIh`
              : modalArchivosIdentificado
              ? `Archivos | Identificado SmIh: [${dataSelect.identificadoSmihId}]`
              : modalPrintReporte
              ? `Identificado SmIh: [${dataSelect.identificadoSmihId}]`
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
            <IdentificadosAddSmih
              onEditDone={onEditDone}
              mensajeAlerta={MensajeAlerta}
            ></IdentificadosAddSmih>
          )}

          {modalArchivosIdentificado && accesos && accesos.verArchivo && (
            <div>
              <ArchivosListPrincipal
                IdentificadoId={dataSelect.identificadoSmihId}
                coincidenciaId={dataSelect.coincidenciaId}
                preview={false}
                mensajeAlerta={MensajeAlerta}
                descargaArchivo={accesos.descargarArchivo}
                eliminarArchivo={accesos.eliminarArchivo}
              ></ArchivosListPrincipal>
            </div>
          )}
          {modalPrintReporte && (
            <div>
              <PreviewReportePdf
                Id={dataSelect.identificadoSmihId}
                reporte={"SmIh"}
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
