import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import MainCard from "../../../App/components/MainCard";
import {apiFetchPersonas, apiCatalogo} from "../../../utils/fetchCatalogos";
import userContext from "../../../context/userContext";
import PNotify from "pnotify/dist/es/PNotify";
import "pnotify/dist/es/PNotifyButtons";
import "pnotify/dist/es/PNotifyConfirm";
import "pnotify/dist/es/PNotifyCallbacks";

//css
//import userContext from "../../context/userContext";
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
function Coincidencias(props) {
  const userI = useContext(userContext);
  const [estado, setEstado] = useState("");
  const [cat_tipoDocumento, setcat_tipoDocumento] = useState();
  const [cat_tipoSangre, setcat_tipoSangre] = useState();
  const [cat_baseInfo, setcat_baseInfo] = useState();
  const [cat_cromosomaY, setcat_cromosomaY] = useState();
  const [cat_donante, setcat_donante] = useState();
  const [cat_estadoCoincidencia, setcat_estadoCoincidencia] = useState();
  const [cat_estadoInvestigacion, setcat_estadoInvestigacion] = useState();
  const [cat_programaIdent, setcat_programaIdent] = useState();
  const [cat_sexoAdn, setcat_sexoAdn] = useState();
  const [cat_tipoCasoDid, setcat_tipoCasoDid] = useState();
  const [cat_tipoContexto, setcat_tipoContexto] = useState();
  const fetchData = async () => {
    const result = await apiFetchPersonas(userI.token);
    setEstado(result);
  };

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userI.token);

    if (catalogo == "tipoDocumento") setcat_tipoDocumento(result.data);
    if (catalogo == "tipoSangre") setcat_tipoSangre(result.data);
    if (catalogo == "baseInfo") setcat_baseInfo(result.data);
    if (catalogo == "cromosomaY") setcat_cromosomaY(result.data);
    if (catalogo == "donante") setcat_donante(result.data);
    if (catalogo == "estadoCoincidencia")
      setcat_estadoCoincidencia(result.data);
    if (catalogo == "estadoInvestigacion")
      setcat_estadoInvestigacion(result.data);
    if (catalogo == "programaIdent") setcat_programaIdent(result.data);
    if (catalogo == "sexoAdn") setcat_sexoAdn(result.data);
    if (catalogo == "tipoCasoDid") setcat_tipoCasoDid(result.data);
    if (catalogo == "tipoContexto") setcat_tipoContexto(result.data);
  };

  useEffect(() => {
    fetchData();

    fetchCatalogo("tipoDocumento");
    fetchCatalogo("tipoSangre");
    fetchCatalogo("baseInfo");
    fetchCatalogo("cromosomaY");
    fetchCatalogo("donante");
    fetchCatalogo("estadoCoincidencia");
    fetchCatalogo("estadoInvestigacion");
    fetchCatalogo("programaIdent");
    fetchCatalogo("sexoAdn");
    fetchCatalogo("tipoCasoDid");
    fetchCatalogo("tipoContexto");
    return () => {};
  }, []);
  useEffect(() => {
    return () => {};
  }, [estado]);

  return (
    <div className="animated fadeIn" id="containerCoincidencias">
      <Aux>
        <Row>
          <Col>
            <MainCard title="Coincidencias" isOption>
              <Col xl={12}>
                <Row>
                  <Col>
                    <Button
                      key="btnSaveCoincidencias"
                      variant="outline-success"
                      size="sm"
                    >
                      <i className="feather icon-plus" />
                      Agregar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ul className="list-group">
                      Tipo documento
                      {!(cat_tipoDocumento === undefined)
                        ? cat_tipoDocumento.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.tipoDocumentoId}
                              value={fbb.tipoDocumentoId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      Tipo sangre
                      {!(cat_tipoSangre === undefined)
                        ? cat_tipoSangre.map((fbb) => (
                            <li key={fbb.tipoSangreId} value={fbb.tipoSangreId}
                            className="list-group-item">
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      Base Info
                      {!(cat_baseInfo === undefined)
                        ? cat_baseInfo.map((fbb) => (
                            <li 
                            className="list-group-item" key={fbb.baseInfoId} value={fbb.baseInfoId}>
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      CromosomaY
                      {!(cat_cromosomaY === undefined)
                        ? cat_cromosomaY.map((fbb) => (
                            <li 
                            className="list-group-item" key={fbb.cromosomaYId} value={fbb.cromosomaYId}>
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      Donante
                      {!(cat_donante === undefined)
                        ? cat_donante.map((fbb) => (
                            <li 
                            className="list-group-item" key={fbb.donanteId} value={fbb.donanteId}>
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      estadoCoincidencia
                      {!(cat_estadoCoincidencia === undefined)
                        ? cat_estadoCoincidencia.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.estadoCoincidenciaId}
                              value={fbb.estadoCoincidenciaId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      estadoInvestigacion
                      {!(cat_estadoInvestigacion === undefined)
                        ? cat_estadoInvestigacion.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.estadoInvestigacionId}
                              value={fbb.estadoInvestigacionId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
 
                  </Col>
                  <Col>
                  <ul className="list-group">
                      programaIdent
                      {!(cat_programaIdent === undefined)
                        ? cat_programaIdent.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.programaIdentId}
                              value={fbb.programaIdentId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      sexoAdn
                      {!(cat_sexoAdn === undefined)
                        ? cat_sexoAdn.map((fbb) => (
                            <li 
                            className="list-group-item" key={fbb.sexoAdnId} value={fbb.sexoAdnId}>
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      tipoCasoDid
                      {!(cat_tipoCasoDid === undefined)
                        ? cat_tipoCasoDid.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.tipoCasoDidId}
                              value={fbb.tipoCasoDidId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                    <ul className="list-group">
                      tipoContexto
                      {!(cat_tipoContexto === undefined)
                        ? cat_tipoContexto.map((fbb) => (
                            <li
                            className="list-group-item"
                              key={fbb.tipoContextoId}
                              value={fbb.tipoContextoId}
                            >
                              {fbb.descripcion}
                            </li>
                          ))
                        : null}
                    </ul>
                  </Col>
                </Row>
              </Col>
            </MainCard>
          </Col>
        </Row>
      </Aux>
    </div>
  );
}
export default Coincidencias;
