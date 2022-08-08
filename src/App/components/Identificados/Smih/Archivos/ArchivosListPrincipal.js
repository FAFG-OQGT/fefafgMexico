import React, {useEffect, useState, useContext, useRef} from "react";
import {Row, Card, Button, Col, Image} from "react-bootstrap";
import userContext from "../../../../../context/userContext";
import config from "../../../../../config";
import moment from "moment";
import axios from "axios";
import TreeView from "deni-react-treeview";
import "./ArchivosList.css";
import RecontraMiniLoader from "../../../Loader/RecontraMiniLoader";
import fileDownload from "js-file-download";
import PreviewRptPdf from "../../../ReportePdf/PreviewRptPdf";

function ArchivosListPrincipal({
  IdentificadoId,
  coincidenciaId,
  reset,
  setreset,
  mensajeAlerta,
  descargaArchivo = false,
  eliminarArchivo = false
}) {
  const treeviewRef = useRef(null);

  const userf = useContext(userContext);
  const [data, setData] = useState({});
  const [dataRefresh, setdataRefresh] = useState(false);

  const [bytesDataFile, setbytesDataFile] = useState();
  const [imagePrev, setimagePrev] = useState();
  const [pdfPrev, setpdfPrev] = useState();
  const [bytesAtt, setbytesAtt] = useState();
  const [imageParentAtt, setimageParentAtt] = useState();

  const [loadingDownload, setloadingDownload] = useState(false);
  const [dataFiles, setdataFiles] = useState([]);
  const configReq = {
    headers: {Authorization: `Bearer ${userf.token}`}
  };

  const fetchFileDownload = async (urlPath, fileName) => {
    try {
      const res = await axios.get(
        `${config.urlApi}/identificadoSmih/archivo/?key=${urlPath}`,

        configReq
      );
      var blob = new Blob([
        Uint8Array.from(Buffer.from(res.data.data.Body.data))
      ]);
      fileDownload(blob, fileName);
    } catch (error) {}

    setloadingDownload(false);
  };
  const fetchFileDelete = async (urlPath, coincidencia) => {
    try {
      var data = {
        key: urlPath,
        coincidenciaId: coincidencia
      };
      const res = await axios.post(
        `${config.urlApi}/identificadoSmih/deleteArchivo`,
        data,
        configReq
      );
      if (res.status === 201) {
        setloadingDownload(false);

        setdataRefresh(true);
        mensajeAlerta(
          "Eliminar archivo",
          `Se ha eliminado el archivo  correctamente`,
          "success"
        );
      }
    } catch (error) {
      setloadingDownload(false);
      if (error.response.status === 500) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "Eliminar archivo",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Eliminar archivo",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Eliminar archivo",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }

    setloadingDownload(false);
  };

  const fetchFile = async (urlPath, fileName) => {
    try {
      const res = await axios.get(
        `${config.urlApi}/identificadoSmih/archivo/?key=${urlPath}`,

        configReq
      );

      setbytesDataFile(res.data.data.Body.data);
    } catch (error) {}

    setloadingDownload(false);
  };

  const fetchArchivos = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/identificadoSmih/documento/${coincidenciaId}`,

        configReq
      );
      setData(res.data.data);
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          console.log(`${dataError.codigo} - ${dataError.data}`);
        } else {
          console.log(
            `${error.response.status} - ${error.response.statusText}`
          );
        }
      } else {
        console.log(`${error.response.status} - ${error.response.statusText}`);
      }
    }
  };

  useEffect(() => {
    fetchArchivos();
    return () => {};
  }, []);
  useEffect(() => {
    if (dataRefresh === true) {
      setdataFiles(null);
      setData(null);
      fetchArchivos();
      setdataRefresh(false);
    }
    return () => {};
  }, [dataRefresh]);

  const list_to_tree = (list) => {
    var padres = [],
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      let padrePath = list[i].padrePath;
      if (padres.filter((item) => item.padrePath === padrePath).length === 0)
        padres.push({
          id: list[i].id,
          padreDescripcion: list[i].padreDescripcion,
          padrePath: list[i].padrePath
        });
    }
    padres.forEach((element) => {
      let childrens = [];
      list.forEach((elementList, index) => {
        if (elementList.padrePath === element.padrePath)
          childrens.push({
            id: elementList.id * 10 + index,
            text: elementList.urlDocumento.split("/")[1],
            isLeaf: true,
            identificadoDocumentoId: elementList.identificadoDocumentoId,
            tipoDocumento: elementList.tipoDocumento,
            urlDocumento: elementList.urlDocumento,
            mimetype: elementList.mimetype
          });
      });
      roots.push({
        id: element.id,
        padreDescripcion: element.padreDescripcion,
        padrePath: element.padrePath,
        expanded: true,
        text: element.padreDescripcion,

        children: childrens
      });
    });

    return roots;
  };

  useEffect(() => {
    var treeD = [];
    var contador = 0;
    if (data !== null) {
      if (data !== undefined) {
        if (data.length > 0) {
          data.map(function (d) {
            contador = contador + 1;
            treeD.push({
              id: contador,
              identificadoDocumentoId: d.identificadoDocumentoId,
              padreDescripcion: d.Documento.RepoDoc.descripcion,
              padrePath: d.Documento.RepoDoc.path,
              tipoDocumento: d.Documento.descripcion,
              urlDocumento: d.urlDocumento,
              mimetype: d.mimetype
            });
          });
        }
        setdataFiles(list_to_tree(treeD));
      }
    }
    return () => {};
  }, [data]);

  const onSelectItemHandler = (item) => {
    const api = treeviewRef.current?.api;
    const parent = api.getParentNode(item);
  };

  const onActionButtonClick = (item, actionButton) => {
    const buttonName = actionButton.props.name;
    setbytesDataFile();
    setimagePrev();
    setpdfPrev();
    setimageParentAtt();
    setbytesAtt();
    switch (buttonName) {
      case "download":
        setloadingDownload(true);
        fetchFileDownload(item.urlDocumento, item.text);
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(item.text)[1];
        var nombreNuevo = item.tipoDocumento.replace(/\s/g, "");
        nombreNuevo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        nombreNuevo =
          nombreNuevo +
          "_C" +
          coincidenciaId +
          "_IS" +
          IdentificadoId +
          "." +
          ext;
        fetchFileDownload(item.urlDocumento, nombreNuevo);
        break;
      case "delete":
        setloadingDownload(true);
        fetchFileDelete(item.urlDocumento, coincidenciaId);
        break;
      case "preview":
        setbytesAtt(item);
        setloadingDownload(true);
        const api = treeviewRef.current?.api;
        const parent = api.getParentNode(item);

        setimageParentAtt(parent);
        if (
          item.mimetype === "image/jpeg" ||
          item.mimetype === "image/jpg" ||
          item.mimetype === "image/png"
        ) {
          setimageParentAtt(parent);
          fetchFile(item.urlDocumento);
        } else if (item.mimetype === "application/pdf") {
          setimageParentAtt(parent);
          fetchFile(item.urlDocumento);
        } else {
          setloadingDownload(false);
          mensajeAlerta(
            "Archivo",
            `Solo archivos tipo imagen tienen preview.`,
            "error"
          );
        }
      default:
        break;
    }
  };

  useEffect(() => {
    if (!(bytesDataFile === undefined)) {
      if (bytesAtt.mimetype === "application/pdf") {
        setpdfPrev(bytesDataFile);
      } else {
        var arrayBufferView = new Uint8Array(Buffer.from(bytesDataFile));
        var blob = new Blob([arrayBufferView], {type: bytesAtt.mimetype});
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        setimagePrev(imageUrl);
      }
    }
    return () => {};
  }, [bytesDataFile]);
  const actionButtons = [
    descargaArchivo === true && (
    <Button
      type="button"
      name="download"
      className="btn-icon-files"
      variant="outline-primary"
      size="sm"
    >
      <i className="feather icon-download" />
    </Button>
    ),
    <Button
      type="button"
      name="preview"
      className="btn-icon-files"
      variant="outline-success"
      size="sm"
    >
      <i className="feather icon-eye" />
    </Button>,
    eliminarArchivo === true && (
    <Button
      type="button"
      name="delete"
      className="btn-icon-files"
      variant="outline-danger"
      size="sm"
    >
      <i className="feather icon-x" />
    </Button>
    )
  ];

  const NoActionButtons = [<RecontraMiniLoader></RecontraMiniLoader>];

  useEffect(() => {
    if (reset === true) {
      setData();
      setdataFiles([]);
      fetchArchivos();
      setreset(false);
    }
    return () => {};
  }, [reset]);

  return (
    <div>
      <Row>
        <Col>
          {dataFiles !== null && dataFiles.length > 0 && (
            <TreeView
              ref={treeviewRef}
              className="customizable-tree"
              items={dataFiles}
              showRoot={true}
              showCheckbox={false}
              marginItems="40"
              onSelectItem={onSelectItemHandler}
              selectRow={true}
              actionButtons={loadingDownload ? NoActionButtons : actionButtons}
              onActionButtonClick={onActionButtonClick}
              theme="silver"
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <br></br>
            <br></br>
            {bytesDataFile != undefined && (
              <Card className="border border-primary">
                <Card.Body>
                  {imagePrev && (
                    <center>
                      <img src={imagePrev} alt="" className="img-fluid" />
                    </center>
                  )}
                  {pdfPrev && (
                    <PreviewRptPdf
                      mensajeAlerta={mensajeAlerta}
                      dataFile={pdfPrev}
                    ></PreviewRptPdf>
                  )}
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ArchivosListPrincipal;
