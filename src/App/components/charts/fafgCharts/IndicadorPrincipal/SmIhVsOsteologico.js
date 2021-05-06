import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Card, Form} from "react-bootstrap";
import PieChart from "../../allCharts/PieChart";
import BarBasicChart from "../../allCharts/BarBasicChart";
import themeColors from "../themeColors";
import userContext from "../../../../../context/userContext";
import {apiFetch} from "../../../../../utils/fetchGraphs";

function SmIhVsOsteologico(props) {
  const [tipoChart, settipoChart] = useState(false);
  const [dataI1, setdataI1] = useState({valor: 0, porcentaje: 0});
  const [dataI2, setdataI2] = useState({valor: 0, porcentaje: 0}); 
  const userf = useContext(userContext);

  
  useEffect(() => {
    (async () => {
      let result = await apiFetch("graph/identSmih", userf.token);
      setdataI1(result);

      let result2 = await apiFetch("graph/identOst", userf.token);
      setdataI2(result2);
 
    })();

    return () => {};
  }, []);


  const dataBar = (canvas) => {
    var arrColors = themeColors(canvas);

    return {
      datasets: [
        {
          label: "SmIh",
          data: [dataI1.valor],
          borderColor: arrColors.themes[0],
          backgroundColor: arrColors.themes[0],
          hoverBorderColor: arrColors.themes[0],
          hoverBackgroundColor: arrColors.themes[1],
        },
        {
          label: "Osteologico",
          data: [dataI2.valor],
          borderColor: arrColors.themes[1],
          backgroundColor: arrColors.themes[1],
          hoverBorderColor: arrColors.themes[1],
          hoverBackgroundColor: arrColors.themes[1],
        },
       
      ],
      labels: ["-"],
    };
  };

  const dataPie = (canvas) => {
    var arrColors = themeColors(canvas);
    var values = [];
    values.push(dataI1.valor)
    values.push(dataI2.valor)
   
    return {
      labels: [ "SmIh","Osteologico"],
      datasets: [
        {
          data: values,
          backgroundColor: [arrColors.themes[0], arrColors.themes[1]],
          hoverBackgroundColor: [arrColors.themes[0], arrColors.themes[1]],
        },
      ],
    };
  };


  
  const optionsPie = {
    title: {
      display: true,
      text: "Total: " + (dataI1.valor+dataI2.valor),
      position: "bottom",
    },
    aspectRatio: 1,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    plugins: {
      datalabels: {
        display: (ctx) => {
          return true;
        },
        color: "white",
      },
    },
  };
  const optionsBar = {
    title: {
      display: true,
      text: "Total: " + (dataI1.valor+dataI2.valor),
      position: "bottom",
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        display: (ctx) => {
          return true;
        },
        color: "white",
      },
    },
  };
  return (
    <Col sm={4} md={4} xl={4}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">SmIh - Osteologico</h5>
            </Col>
            <Col md={4}>
              <Form.Group className="pull-right">
                <div className="switch d-inline m-r-10">
                  <Form.Control
                    type="checkbox"
                    id="checked-g1"
                    defaultChecked={tipoChart}
                    onChange={() => settipoChart(!tipoChart)}
                  />
                  <Form.Label htmlFor="checked-g1" className="cr" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center h-100">
            <Col>
              {tipoChart && (
                <BarBasicChart data={dataBar} options={optionsBar} />
              )}{" "}
              {!tipoChart && <PieChart data={dataPie} options={optionsPie} />}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SmIhVsOsteologico;
