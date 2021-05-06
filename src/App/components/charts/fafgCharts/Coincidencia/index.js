import React from "react";
import { Row } from "react-bootstrap";
import "chartjs-plugin-datalabels";
import { AnioConfirmacion } from "./AnioConfirmacion";
import { GraficaGenerica } from "./GraficaGenerica";
import { types } from "../../../../../utils/types";

import { AnioExhumacion } from "./AnioExhumacion";
import { BasedeDatos } from "./BasedeDatos";
import { IdentificadosCalidadPerfil } from "./CalidadPerfil";
import { DepartamentodeEcho } from "./DepartamentodeEcho";
import { DepartamentoExHumacion } from "./DepartamentoExHumacion";
import { EstadoCoincidencia } from "./EstadoCoincidencia";
import { EstadoInvestigacion } from "./EstadoInvestigacion";
import { GeneroOsamenta } from "./GeneroOsamenta";
import { TipoCaso } from "./TipoCaso";
import { Exportar } from "../Exportar";

const optionsBar = {
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
  aspectRatio: 1,
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        var total = meta.total;
        var currentValue = dataset.data[tooltipItem.index];
        var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
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

const optionsLine = {
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

const getOptions = (tipo, titulo) => {
  if (tipo === "bar") {
    return {
      ...optionsBar,
      ["title"]: { display: true, text: titulo, fontSize: 12, position: "bottom" },
    };
  } else if (tipo === "pie") {
    return {
      ...optionsPie,
      ["title"]: { display: true, text: titulo, fontSize: 12, position: "bottom", },
    };
  } else if (tipo === "line") {
    return {
      ...optionsLine,
      ["title"]: { display: true, text: titulo, fontSize: 12, position: "bottom", },
    };
  }
};

export const GraficasCoincidencia = ({ data }) => {
  return (
    <>
      {data && (
        <>
          <Exportar
            subTitulo="Variables más utilizadas en Indicencias"
            descripcion="Gráficas de incidencias"
          />
          <Row>
            <GraficaGenerica
              data={data}
              titulo="Calidad de Perfil"
              id="graficaCalidadPerfil"
              tipoReporte={types.calidadPerfil}
              isPie={true}
              getOptions={getOptions}
            />

            <>
            <GraficaGenerica
              data={data}
              titulo="Estado de Coincidencia"
              id="graficaEstadoCoincidencia"
              tipoReporte={types.estadoCoincidencia}
              isPie={true}
              getOptions={getOptions}
            />

            <GraficaGenerica
              data={data}
              titulo="Año de Confirmación"
              id="graficaAnioConfirmacion"
              tipoReporte={types.anioConfirmacion}
              isPie={true}
              getOptions={getOptions}
            />
            </>

          </Row>
              <br></br>
              <Row>
                <GraficaGenerica
                  data={data}
                  titulo="Estado de Investigación"
                  id="graficaEstadoInvestigacion"
                  tipoReporte={types.estadoInvestigacion}
                  isPie={true}
                  getOptions={getOptions}
                />

                <GraficaGenerica
                  data={data}
                  titulo="Tipo de Caso"
                  id="graficaTipodeCaso"
                  tipoReporte={types.TipoCasoDid}
                  isPie={true}
                  getOptions={getOptions}
                />

                <GraficaGenerica
                  data={data}
                  titulo="Base de Datos"
                  id="graficaBasedeDatos"
                  tipoReporte={types.baseInfo}
                  isPie={true}
                  getOptions={getOptions}
                />
              </Row>
              <br></br>
              <Row>
                <GraficaGenerica
                  data={data}
                  titulo="Estado de Hecho"
                  id="graficaDepartamentoEcho"
                  tipoReporte={types.victimaDeptodeEcho}
                  isMap={true}
                />

                <GraficaGenerica
                  data={data}
                  titulo="Género de Osamenta"
                  id="graficaGeneroOsamenta"
                  tipoReporte={types.osamentaGenero}
                  isPie={true}
                  getOptions={getOptions}
                />

                <GraficaGenerica
                  data={data}
                  titulo="Estado de Exhumación"
                  id="graficaDepartamentoExhumacion"
                  tipoReporte={types.osamentaDeptoExhumacion}
                  isMap={true}
                />
              </Row>
              <br></br>
              <Row>
                <GraficaGenerica
                  data={data}
                  titulo="Año de Exhumación"
                  id="graficaAnioExhumacion"
                  tipoReporte={types.osamentaAnioExhumacion}
                  getOptions={getOptions}
                />
              </Row>
        </>
      )}
    </>
  );
};
