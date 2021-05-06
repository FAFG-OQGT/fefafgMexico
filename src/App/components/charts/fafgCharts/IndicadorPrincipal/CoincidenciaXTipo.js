import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Card, Form} from "react-bootstrap";
import BarBasicChart from "../../allCharts/BarBasicChart";
import PieChart from "../../allCharts/PieChart";
import themeColors from "../themeColors";
import userContext from "../../../../../context/userContext";
import {apiFetch} from "../../../../../utils/fetchGraphs";

function CoincicenciaXTipo(props) {
  const [tipoChart, settipoChart] = useState(true);
  const [datag2, setdatag2] = useState();
  const [totalData, settotalData] = useState(0);
  const userf = useContext(userContext);

  const fetchData = async () => {
    const result = await apiFetch("graph/estadoCoincidencia", userf.token);
    setdatag2(result);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const dataBar = (canvas) => {
    var arrColors = themeColors(canvas);
    var datasets = [];
    datag2.map((data, index) => {
      datasets.push({
        label: data.categoria,
        data: [data.cantidad],
        borderColor:
          data.categoria === "No Asignado" || data.categoria === "No Asignada"
            ? arrColors.themes[2]
            : data.categoria === "Confirmada"
            ? arrColors.themes[0]
            : data.categoria === "Excluida"
            ? arrColors.themes[7]
            : arrColors.themes[index],
        backgroundColor:
          data.categoria === "No Asignado" || data.categoria === "No Asignada"
            ? arrColors.themes[2]
            : data.categoria === "Confirmada"
            ? arrColors.themes[0]
            : data.categoria === "Excluida"
            ? arrColors.themes[7]
            : arrColors.themes[index],
        hoverBorderColor:
          data.categoria === "No Asignado" || data.categoria === "No Asignada"
            ? arrColors.themes[2]
            : data.categoria === "Confirmada"
            ? arrColors.themes[0]
            : data.categoria === "Excluida"
            ? arrColors.themes[7]
            : arrColors.themes[index],
        hoverBackgroundColor:
          data.categoria === "No Asignado" || data.categoria === "No Asignada"
            ? arrColors.themes[2]
            : data.categoria === "Confirmada"
            ? arrColors.themes[0]
            : data.categoria === "Excluida"
            ? arrColors.themes[7]
            : arrColors.themes[index],
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
    datag2.map((data, index) => {
      categories.push(data.categoria);
      values.push(data.cantidad);
      colors.push(
        data.categoria === "No Asignado"
          ? arrColors.themes[2]
          : data.categoria === "Confirmada"
          ? arrColors.themes[0]
          : data.categoria === "Excluida"
          ? arrColors.themes[7]
          : arrColors.themes[index]
      );
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
    if (datag2) {
      var total = 0;

      datag2.map((data) => {
        total = total + data.cantidad;
      });
      settotalData(total);
    }
    return () => {};
  }, [datag2]);
  return (
    <Col sm={4} md={4} xl={4}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">Coincidencias</h5>
            </Col>
            <Col md={4}>
              <Form.Group className="pull-right">
                <div className="switch d-inline m-r-10">
                  <Form.Control
                    type="checkbox"
                    id="checked-g2"
                    defaultChecked={tipoChart}
                    onChange={() => settipoChart(!tipoChart)}
                  />
                  <Form.Label htmlFor="checked-g2" className="cr" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center h-100">
            <Col>
              {tipoChart && datag2 !== undefined && (
                <BarBasicChart data={dataBar} options={optionsBar} />
              )}{" "}
              {!tipoChart && datag2 !== undefined && (
                <PieChart data={dataPie} options={optionsPie} />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CoincicenciaXTipo;
