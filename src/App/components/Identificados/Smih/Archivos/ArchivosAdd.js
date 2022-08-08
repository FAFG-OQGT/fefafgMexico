import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Form, Card, Button} from "react-bootstrap";
import userContext from "../../../../../context/userContext";
import config from "../../../../../config";
import Swal from "sweetalert2";
import axios from "axios";
import {SelectGroup} from "react-bootstrap4-form-validation";
import {apiCatalogo} from "../../../../../utils/fetchCatalogos";
function ArchivosAdd({
  IdentificadoId,
  coincidenciaId,
  mensajeAlerta,
  onAddDoneFile,
  permisoAgregar
}) {
  const [loading, setloading] = useState(false);

  const userf = useContext(userContext);

  const configReq = {
    headers: {Authorization: `Bearer ${userf.token}`}
  };

  const [documentoid, setdocumentoid] = useState();
  const [documentoText, setdocumentoText] = useState();
  const [acceptTypes] = useState(
    "application/pdf,application/vnd.ms-excel,image/jpg,image/jpeg,image/png,application/msword,application/vnd.ms-powerpoint"
  );

  const [repoDocId, setrepodoc] = useState();
  const [file, setfile] = useState();
  const [archivoName, setarchivoName] = useState("Seleccionar Archivo");

  const [combodocumento, setcombodocumento] = useState();
  const [comborepoDoc, setcomborepoDoc] = useState();

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      documentoid === undefined ||
      repoDocId === undefined ||
      documentoid === "" ||
      repoDocId === ""
    )
      Swal.fire(
        "Alerta",
        "Debe de seleccionar tipo documento y documento",
        "warning"
      );
    else {
      if (file === undefined || file === null) {
        Swal.fire("Alerta", "Debe de seleccionar un archivo.", "warning");
        return false;
      }

      const data = new FormData();
      if (file.size > config.maxSizeSmih) {
        Swal.fire(
          "Alerta",
          "Debe de seleccionar un archivo que no sobrepase los 10mb.",
          "warning"
        );
        return false;
      }
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(file.name)[1];
      var nombreNuevo = documentoText.replace(/\s/g, "");
      nombreNuevo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      nombreNuevo =
        nombreNuevo +
        "_C" +
        coincidenciaId +
        "_IS" +
        IdentificadoId +
        "." +
        ext;
      data.append("File", file, nombreNuevo);
      //data.append("File", file,nombreNuevo+'_IS'+IdentificadoId.toString() + "." + ext);
      data.append("coincidenciaId", coincidenciaId);
      data.append("documentoId", documentoid);
      data.append("usuarioIngresoId", userf.usuarioId);
      createFileIdentificado(data);
    }
  };

  const createFileIdentificado = async (data) => {
    try {
      setloading(true);

      const res = await axios.post(
        `${config.urlApi}/identificadoSmih/archivo`,
        data,
        configReq
      );
      if (res.status === 202) {
        setloading(false);

        mensajeAlerta(
          "Adjuntar archivo",
          `Se ha adjuntado el archivo  correctamente`,
          "success"
        );
        onAddDoneFile(true);
        setfile();
        setarchivoName("Seleccionar Archivo");
      }
    } catch (error) {
      setloading(false);

      if (error.response.status === 500) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "Adjuntar archivo",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Adjuntar archivo",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Adjuntar archivo",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const onFileHandler = (event) => {
    if (event.target.files.length > 0) {
      setfile(event.target.files[0]);
      setarchivoName(event.target.files[0].name);
    } else {
      setfile();
      setarchivoName("Seleccionar Archivo");
    }
  };
  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, userf.token);

    if (catalogo == "documentoIdentificadoSmih") setcombodocumento(result.data);
    if (catalogo == "repoDoc") setcomborepoDoc(result.data);
  }; 
  useEffect(() => {
 
    fetchCatalogo("repoDoc");
    fetchCatalogo("documentoIdentificadoSmih");

    return () => {};
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <SelectGroup
                  name="repodoc"
                  id="repodoc"
                  value={!(repoDocId === undefined) ? repoDocId : ""}
                  onChange={(e) => {
                    setrepodoc(e.target.value);
                    setdocumentoid("");
                  }}
                >
                  <option key="" value="">
                    ---Seleccione una opcion---
                  </option>
                  {!(comborepoDoc === undefined)
                    ? comborepoDoc.map((fbb) => (
                        <option key={fbb.repoDocId} value={fbb.repoDocId}>
                          {fbb.descripcion}
                        </option>
                      ))
                    : null}
                </SelectGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Documento</Form.Label>
                <SelectGroup
                  name="documentoid"
                  id="documentoid"
                  value={!(documentoid === undefined) ? documentoid : ""}
                  onChange={(e) => {
                    let index = e.nativeEvent.target.selectedIndex;
                    let label = e.nativeEvent.target[index].text;
                    setdocumentoid(e.target.value);
                    setdocumentoText(label);
                  }}
                >
                  <option key="" value="">
                    ---Seleccione una opcion---
                  </option>
                  {!(combodocumento === undefined)
                    ? combodocumento
                        .filter((filt) => filt.repoDocId == repoDocId)
                        .map((fbb) => (
                          <option key={fbb.documentoId} value={fbb.documentoId}>
                            {fbb.descripcion}
                          </option>
                        ))
                    : null}
                </SelectGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Archivo</Form.Label>
                <div className="custom-file">
                  <Form.Control
                    aria-describedby="custom-addons5"
                    type="file"
                    accept={acceptTypes}
                    className="custom-file-input"
                    id="validatedCustomFile1"
                    onChange={onFileHandler}
                  />
                  <Form.Label
                    className="custom-file-label"
                    htmlFor="validatedCustomFile1"
                  >
                    {archivoName}
                  </Form.Label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className=" d-flex justify-content-center">
              {permisoAgregar && loading === false && (
                <Button
                  key="btnSaveEditPerson"
                  name="btnSaveEditPerson"
                  variant="outline-info"
                  size="md"
                  onClick={handleAdd}
                >
                  <i className="feather icon-save" />
                  Agregar archivos
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ArchivosAdd;
