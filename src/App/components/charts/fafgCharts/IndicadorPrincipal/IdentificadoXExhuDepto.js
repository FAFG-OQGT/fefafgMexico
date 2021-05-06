import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Card, Form, Table} from "react-bootstrap";
import Map2 from "../../maps/Map2";
import themeColors from "../themeColors";
import userContext from "../../../../../context/userContext";
import {apiFetch} from "../../../../../utils/fetchGraphs";
import axios from "axios";

function IdentificadoXExhuDepto(props) {
  const [datag3, setdatag3] = useState();
  const userf = useContext(userContext);

  const fetchData = async () => {
    const result = await apiFetch("graph/deptoExhuIdent", userf.token);
    let hijos = result.filter((i) => i.padre === props.tipo);
    setdatag3(hijos);
  };

  const renderTableData = () => {
    let sum = 0;
    let sumPor = 0;
    let rows = datag3.map((dat, index) => {
      const {cantidad, categoria, id, porcentaje, padre} = dat; //destructuring
      sum = sum + cantidad;
      sumPor = sumPor + porcentaje;
      return (
        <tr key={id}>
          <td>{categoria}</td>
          <td>{cantidad}</td>
          <td>{porcentaje}</td>
        </tr>
      );
    });
    rows.push(
      <tr>
        <td>Total</td>
        <td>{sum}</td>
        <td>{sumPor}</td>
      </tr>
    );
    return rows;
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <Col sm={12} md={12} xl={12}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">{props.titulo}</h5>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className={"align-items-top h-100"}>
            <Col sm={6}>
              {datag3 !== undefined && (
                <Map2
                  selectItem={false}
                  refId={`MAPEXHU${props.tipo}`}
                  data={datag3}
                ></Map2>
              )}
            </Col>
            <Col sm={6}>
              {datag3 !== undefined && (
                <Table
                  id={`TB-gmapa${props.tipo}`}
                  className="table-columned table-sm table-condensed table-wrapper-scroll-x cssTable"
                  responsive
                  hover
                >
                  <thead style={{width: "100%"}}>
                    <tr>
                      <td>Estado</td>
                      <td>Cantidad</td>
                      <td>Porcentaje</td>
                    </tr>
                  </thead>
                  <tbody>{renderTableData()}</tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default IdentificadoXExhuDepto;
