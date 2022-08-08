import React, {useState, useEffect} from "react";

//Components
import {Row, Col, Button} from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import MainCard from "../../../App/components/MainCard";
import {Link} from "react-router-dom";
import CoincidenciaCasoEdit from "../../../App/components/CoincidenciaCaso/CoincidenciaCasoEdit";

import config from "../../../config";
function CoincidenciasCaso(props) {
  //VIEW OR PAGE STATES

  const [titulo, setTitulo] = useState("");
  const [dataTemp, setdataTemp] = useState(
    props.location.query ? props.location.query.dataCaso : null
  );

  useEffect(() => {
    if (!(props.location.query === undefined)) {
      setdataTemp(props.location.query.dataCaso);
      setTitulo(
        `Coincidencias - Caso [${props.location.query.dataCaso.coincidenciaId
          .toString()
          .padStart(5, "0")}]`
      );
    }

    return () => {};
  }, []);

  const onEditDone = (valor) => {
    if (valor == true) {
      props.history.push(config.baseApp + "/coincidencias");
    }
  };

  useEffect(() => {
    if (dataTemp === null)
      props.history.push(config.baseApp + "/coincidencias");

    return () => {};
  }, [dataTemp]);
  return (
    <div className="animated fadeIn" id="containerCoincidenciaCaso">
      <Aux>
        <Row>
          <Col>
            <MainCard title={titulo} isOption>
              <Col xl={12}>
                <Row>
                  <Col>
                    <Link
                      to={
                        !(props.location.query === undefined)
                          ? props.location.query.backUrl
                          : config.baseApp + "/coincidencias"
                      }
                    >
                      <Button
                        key="btnReturn"
                        variant="outline-secondary"
                        size="sm"
                      >
                        <i className="fa fa-arrow-left" />
                        Regresar
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  {!(dataTemp == null) && (
                    <CoincidenciaCasoEdit
                      onEditDone={onEditDone}
                      dataCaso={dataTemp}
                    ></CoincidenciaCasoEdit>
                  )}
                </Row>
              </Col>
            </MainCard>
          </Col>
        </Row>
      </Aux>
    </div>
  );
}
export default CoincidenciasCaso;
