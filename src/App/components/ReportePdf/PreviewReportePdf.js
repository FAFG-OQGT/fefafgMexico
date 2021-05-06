import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config"; 
import Loader from "../Loader/Loader";
import PDFViewer from "pdf-viewer-reactjs";
import CustomNavigation from "../PdfViewer/Navigation";
import fileDownload from "js-file-download";
import blobToBase64 from "blob-to-base64";
import configRepos from "./configReportes"; 
function PreviewReportePdf({Id, mensajeAlerta,reporte}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };
  //DEFINICION DE ESTADOS
  const [loading, setloading] = useState(false);
  const [pdfData, setpdfData] = useState();
  const [pdfPrev, setpdfPrev] = useState();

 
  const handleDownload =(e) => {
    fileDownload(pdfData, `archivo${reporte}_${Id}.pdf`);
  }

  const getPrint = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${config.urlApi}/${configRepos[reporte]}/${Id}`,
        configReq
      );
      if (res.status === 200) {

        var arrayBufferView = new Uint8Array(res.data.data.Body.data);
        var blob = new Blob([arrayBufferView], {type: "application/pdf"});
        setpdfData(blob);

        blobToBase64(blob, function (error, base64) {
          if (!error) {
            setpdfPrev(base64.replace("data:application/pdf;base64,", ""));
            setloading(false);
          }
        });
      }
    } catch (error) {
      setloading(false);
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "No se puede obtener informacion del reporte",
            `${dataError}`,

            "error"
          );
        } else {
          mensajeAlerta(
            "No se puede obtener informacion del reporte",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "No se puede obtener informacion de FIO",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  useEffect(() => { 
    getPrint();
 
    return () => {};
  }, []);

  return (
    <div className="animated fadeIn">
      {loading ? (
        <Row>
          <Col className="d-flex justify-content-center">
            <Loader></Loader>
          </Col>
        </Row>
      ) : (
        <div>
          <Row> 
         
              <div className="col-sm">
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination d-flex flex-row-reverse">
                    <li className="page-item">
                      <Button
                        className="page-link btn-outline-primary"
                        onClick={handleDownload}
                      >
                        <i className="feather icon-download"> Descargar</i>
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
          
          </Row>
          <Row>
            <Col>
              <PDFViewer
                document={{
                  base64: pdfPrev,
                }}
                navigation={CustomNavigation}
                scale={1.8}
                css={"align-self-center"}
                canvasCss={""}
                scaleStep={0.5}
                navbarOnTop={true}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default PreviewReportePdf;
