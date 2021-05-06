import React, {useState, useEffect} from "react";

//Components
import {Row, Col, Button} from "react-bootstrap";
import Aux from "../../../../hoc/_Aux";
import MainCard from "../../../../App/components/MainCard";
import {Link} from "react-router-dom";
import IdentificadosEditOsteologico from "../../../../App/components/Identificados/osteologico/IdentificadosEditOsteologico";

function IdentificadosEdit(props) {
  //VIEW OR PAGE STATES

  const [titulo, setTitulo] = useState("");
  const [dataTemp, setdataTemp] = useState(
    props.location.query ? props.location.query.dataCaso : null
  );

  useEffect(() => {
    if (!(props.location.query === undefined)) {
      setdataTemp(props.location.query.dataCaso);
      setTitulo(
        `Identificado [${props.location.query.dataCaso.identificadoOstId
          .toString()
          .padStart(5, "0")}]`
      );
    }

    return () => {};
  }, []);

  const onEditDone = (valor) => {
    if (valor == true) {
      props.history.push("/identificadosOsteologico");
    }
  };
  useEffect(() => {
    if (dataTemp === null) props.history.push("/identificadosOsteologico");

    return () => {};
  }, [dataTemp]);
  return (
    <div className="animated fadeIn" id="containerIdentificados">
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
                          : "/identificadosOsteologico"
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
                  {/*
                  <IdentificadosEditGeneral data={dataTemp}></IdentificadosEditGeneral>  
                  <IdentificadosEditOsteologica data={dataTemp}></IdentificadosEditOsteologica> 
             */}
                  {!(dataTemp == null) && (
                    <IdentificadosEditOsteologico
                      onEditDone={onEditDone}
                      data={dataTemp}
                      mensajeAlerta={props.mensajeAlerta}
                    ></IdentificadosEditOsteologico>
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
export default IdentificadosEdit;
