import React, { useEffect, useState } from 'react'
import { GetDataCoincidencia } from '../../../../../utils/getDataCoincidencia'
import { types } from '../../../../../utils/types'
import {Row, Col, Card, Form} from "react-bootstrap";
import BarBasicChart from '../../allCharts/BarBasicChart';
import PieChart from '../../allCharts/PieChart';

export const TipoCaso = ({ titulo,data,id="graficaTipodeCaso",optionsBar,optionsPie }) => {
    const [tipoChart, settipoChart] = useState(true);
    const getData =(canvas) => {
        if(tipoChart){
            return GetDataCoincidencia(types.tipoCaso, data, types.chartBar,canvas);
        }else{
            return GetDataCoincidencia(types.tipoCaso, data, types.chartPie,canvas);
        }
    }
  
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
                                        id={`checked-g3${id}`}
                                        defaultChecked={tipoChart}
                                        onChange={() => settipoChart(!tipoChart)}
                                    />
                                    <Form.Label htmlFor={`checked-g3${id}`} className="cr" />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center h-100">
                    <Col>
                        {
                            tipoChart ?
                            <BarBasicChart data={getData} options={optionsBar} />
                            : <PieChart data={getData} options={optionsPie} />
                        }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}
