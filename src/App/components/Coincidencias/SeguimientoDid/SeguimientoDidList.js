import React, {useEffect, useState, useContext} from "react";
import {Card} from "react-bootstrap";
import userContext from "../../../../context/userContext";
import config from "../../../../config";
import moment from "moment";
import axios from "axios";
import "./SeguimientoDid.css";


function SeguimientoDidAdd({CoincidenciaId}) {
  const userf = useContext(userContext);
  const [data, setData] = useState({});
  const configReq = {
    headers: {Authorization: `Bearer ${userf.token}`},
  };

  const fetchNotas = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/coincidencia/solSeguimiento/${CoincidenciaId}`,

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
    fetchNotas();
    return () => {};
  }, []);

  return (
    <div>
      <Card className="table-card review-card">
        <Card.Body>
          {data.length > 0 ? (
            data.map((fbb) => (
            <div key={fbb.solicitudSeguimientoId} className="review-block">
                <div className="row">
                  <div className="col">
                    <h6 className="m-b-15 text-uppercase">
                      {fbb.Usuario.usuario}
                      <span className="float-right f-13 text-muted">
                        {" "}
                        {moment(fbb.fechaHoraIngreso)
                          .utc()
                          .format("DD-MM-YYYY HH:mm:ss")}
                      </span>
                    </h6>
                    <p className="m-t-15 m-b-15 text-muted">
                      {fbb.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeguimientoDidAdd;
