import React, { useEffect, useState } from "react";
import { GetDataCoincidencia } from "../../../../../utils/getDataCoincidencia";
import { types } from "../../../../../utils/types";
import { Row, Col, Card, Form, Table } from "react-bootstrap";
import BarBasicChart from "../../allCharts/BarBasicChart";
import PieChart from "../../allCharts/PieChart";
import LineInterpolationChart from "../../allCharts/LineInterpolationChart";
import Map2 from "../../maps/Map2";

export const GraficaGenerica = ({
  titulo,
  data,
  id,
  tipoReporte,
  isPie=false,
  isMap = false,
  getOptions
}) => {
  const [tipoChart, settipoChart] = useState(true);
  const [dataMap, setdataMap] = useState([]);
  const [total, setTotal] = useState(0);
  const getData = (canvas) => {
    if (tipoChart) {
      let [info,total]=GetDataCoincidencia(tipoReporte, data, types.chartBar, canvas);
      setTotal(total);
      return info;
    } else {
      if (isPie) {
        let [info,total]=GetDataCoincidencia(tipoReporte, data, types.chartPie, canvas);
        setTotal(total);
        return info;
      } else {
        let [info,total]= GetDataCoincidencia(tipoReporte, data, types.charLine, canvas);
        setTotal(total);
        return info;
      }
    }
  };
  const getDataMap = () => {
    let dataAux = GetDataCoincidencia(tipoReporte, data, types.charMap, {});
    setdataMap(dataAux);
  };

  useEffect(() => {
    if (isMap === true) {
      getDataMap();
    }
  }, []);

  return (
    <Col sm={4} md={4} xl={4}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">{titulo}</h5>
            </Col>
            <Col md={4}>
              <Form.Group className="pull-right">
                <div className="switch d-inline m-r-10">
                  <Form.Control
                    type="checkbox"
                    id={`checked-g${id}`}
                    defaultChecked={tipoChart}
                    onChange={() => settipoChart(!tipoChart)}
                  />
                  <Form.Label htmlFor={`checked-g${id}`} className="cr" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center h-100">
            {
              isMap === true ?
              dataMap &&
                <Col>
                  {
                    tipoChart ?
                      <Map2
                        selectItem={false}
                        refId={id}
                        data={dataMap}
                      ></Map2>
                      : <Table
                        id={id}
                        className="table-columned table-sm table-condensed table-wrapper-scroll-x cssTable"
                        responsive
                        hover
                      >
                        <thead style={{ width: "100%" }}>
                          <tr>
                            <th>Estado</th>
                            <th>Cantidad</th>
                            <th>Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody>{
                          dataMap.map(({ cantidad, categoria, id, porcentaje }) => (
                            <tr key={id}>
                              <td>{categoria}</td>
                              <td>{cantidad}</td>
                              <td>{porcentaje}</td>
                            </tr>
                          ))
                        }
                        </tbody>
                      </Table>
                  }

                </Col>
                :
                <Col>
                  {
                    tipoChart ? (
                      <BarBasicChart id={id} data={getData} options={getOptions("bar", `${titulo} Total: ${total}`)} />
                    ) : (
                        isPie ?
                          <PieChart id={id} data={getData} options={getOptions("pie", `${titulo} Total: ${total}`)} />
                          : <LineInterpolationChart
                            data={getData}
                            options={getOptions("pie", `${titulo} Total: ${total}`)}
                            height={200}
                          />
                      )
                  }
                </Col>
            }
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
