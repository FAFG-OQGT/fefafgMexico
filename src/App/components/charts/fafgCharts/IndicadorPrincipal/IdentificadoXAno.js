import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Card, Form} from "react-bootstrap";
import BarBasicChart from "../../allCharts/BarBasicChart";
import PieChart from "../../allCharts/PieChart";

import LineInterpolationChart from "../../allCharts/LineInterpolationChart";
import themeColors from "../themeColors";
import userContext from "../../../../../context/userContext";
import {apiFetch} from "../../../../../utils/fetchGraphs";

function IdentificadoXAno(props) {
  const [tipoChart, settipoChart] = useState(true);
  const [datag7, setdatag7] = useState();
  const userf = useContext(userContext);
  const [totalData, settotalData] = useState(0);

  const fetchData = async () => {
    const result = await apiFetch("graph/anioDesaparicion", userf.token);
    let hijos = result.filter((i) => i.padre === props.tipo);
    setdatag7(hijos);
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const dataBar = (canvas) => {
    var arrColors = themeColors(canvas);
    var datasets = [];
    datag7.map((data, index) => {
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
    datag7.map((data, index) => {
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
  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }
  const dataLineInterpolationChart = (canvas) => {
    var arrColors = themeColors(canvas);
    var datasets = [];
    var vdata = [];
    var labels = [];
    var total = 0;
    datag7.sort(compareValues("categoria")).map((data, index) => {
      labels.push(data.categoria);
      vdata.push(data.cantidad);
      total = total + data.cantidad;

    });

    settotalData(total);
    return {
      datasets: [
        {
          label: "Cantidad",
          data: vdata,
          pointRadius: 10,
          pointStyle: "star",
          lineTension: 0,

          fill: true,
          borderWidth: 4,
          borderColor: arrColors.themes[props.color],
          backgroundColor: arrColors.themes[props.color],
        },
      ],
      labels: labels,
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

  const optionsLineInterpolationChart = {
    title: {
      display: true,
      text: "Total: " + totalData,
      position: "bottom",
    },
    aspectRatio: 1,
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
          return false;
        },
        color: "white",
      },
    },
  };

  return (
    <Col sm={props.sm} md={props.md} xl={props.xl}>
      <Card className={"h-100"}>
        <Card.Header>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="d-inline-block mb-0">{props.titulo}</h5>
            </Col>
            <Col md={4}>
              <Form.Group className="pull-right"></Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center h-100">
            <Col>
              {tipoChart && datag7 !== undefined && (
                <LineInterpolationChart
                  data={dataLineInterpolationChart}
                  options={optionsLineInterpolationChart}
                  height={props.height}
                />
              )}{" "}
              {!tipoChart && datag7 !== undefined && <h1>hello</h1>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default IdentificadoXAno;
