import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Card, Form} from "react-bootstrap";
import BarBasicChart from "../../allCharts/BarBasicChart";
import PieChart from "../../allCharts/PieChart";
import themeColors from "../themeColors";
import userContext from "../../../../../context/userContext";
import {apiFetch} from "../../../../../utils/fetchGraphs";
import axios from "axios"; 

function IdentificadoXSexo(props) {
  const [tipoChart, settipoChart] = useState(true);
  const [datag3, setdatag3] = useState();
  const userf = useContext(userContext);
  const [totalData, settotalData] = useState(0);

  const fetchData = async () => {
    const result = await apiFetch("graph/sexoIdentificado", userf.token);
    let hijos = result.filter((i) => i.padre === props.tipo);
    setdatag3(hijos);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const dataBar = (canvas) => {
    var arrColors = themeColors(canvas);
    var datasets = [];
    datag3.map((data, index) => {
      datasets.push({
        label: data.categoria,
        data: [data.cantidad],
        borderColor: arrColors.themes[index],
        backgroundColor: arrColors.themes[index],
        hoverBorderColor: arrColors.themes[index],
        hoverBackgroundColor: arrColors.themes[index],
      });
    });
    return {
      datasets: datasets,
      labels: ["-"],
    };
  };

  const dataPie = (canvas) => {
    var arrColors = themeColors(canvas);
    var categories = [];
    var values = [];
    var colors = [];
    datag3.map((data, index) => {
      categories.push(data.categoria);
      values.push(data.cantidad);
      colors.push(arrColors.themes[index]);
    });

    return {
      labels: categories,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  };
  const optionsBar = {
    title: {
      display: true,
      text: "Total: " + totalData,
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
  const optionsPie = {
    title: {
      display: true,
      text: "Total: " + totalData,
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

  useEffect(() => {
    if(datag3){
    var total = 0;

    datag3.map((data) => {
        total = total + data.cantidad;
      });
      settotalData(total);
    }
    return () => {
    }
  }, [datag3])
  return (
    <Col sm={4} md={4} xl={4}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">{props.titulo}</h5>
            </Col>
            <Col md={4}>
              <Form.Group className="pull-right">
                <div className="switch d-inline m-r-10">
                  <Form.Control
                    type="checkbox"
                    id={`checked-g3${props.tipo}`}
                    defaultChecked={tipoChart}
                    onChange={() => settipoChart(!tipoChart)}
                  />
                  <Form.Label htmlFor={`checked-g3${props.tipo}`} className="cr" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center h-100">
            <Col>
              {tipoChart && datag3 !== undefined && (
                <BarBasicChart data={dataBar} options={optionsBar} />
              )}{" "}
              {!tipoChart && datag3 !== undefined && <PieChart data={dataPie} options={optionsPie} />}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default IdentificadoXSexo;
