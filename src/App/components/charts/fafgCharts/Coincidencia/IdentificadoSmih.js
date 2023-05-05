import React from "react";
import { Row } from "react-bootstrap";
import "chartjs-plugin-datalabels";
import { GraficaGenerica } from "./GraficaGenerica";
import { types } from "../../../../../utils/types";
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

export const IdentificadoSmih = ({ data }) => {
    return (
        <>
            {data && (
                <>
                    <Exportar
                        subTitulo="Variables más utilizadas en Identificado Smih"
                        descripcion="Gráficas de Identificado Smih"
                    />
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Causa de Muerte"
                            id="graficaCausaDeMuerte"
                            tipoReporte={types.smihCausaDeMuerte}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Base de datos poblacional"
                            id="graficaGrupoEtnicoLinguistico"
                            tipoReporte={types.smihGrupoEtnicoLinguistico}
                            isPie={true}
                            getOptions={getOptions}
                        />
{/* 
                        <GraficaGenerica
                            data={data}
                            titulo="Trauma Circunmortem"
                            id="graficaTraumaCirc"
                            tipoReporte={types.smihTraumaCirc}
                            isPie={true}
                            getOptions={getOptions}
                        /> */}
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Datos Odontológicos"
                            id="graficaDatosOdontologicos"
                            tipoReporte={types.smihDatosOdontologicos}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Region Anatómica"
                            id="graficaRegionAnatomica"
                            tipoReporte={types.smihRegionAnatomica}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Sexo"
                            id="graficaSexo"
                            tipoReporte={types.smihSexo}
                            isPie={true}
                            getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Grupo Etario"
                            id="graficaGrupoEtario"
                            tipoReporte={types.smihGrupoEtario}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Tipo de Caso"
                            id="graficaTipoCasoDid"
                            tipoReporte={types.smihTipoCasoDid}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Estado Desaparición"
                            id="graficaDepartamentoDesaparicion"
                            tipoReporte={types.smihDepartamentoDesaparicion}
                           isMap={true}
                           getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>

                        {/* <GraficaGenerica
                            data={data}
                            titulo="Municipio Desaparicion"
                            id="graficaMunicipioDesaparicion"
                            tipoReporte={types.smihMunicipioDesaparicion}
                            isPie={true}
                        /> */}


                        <GraficaGenerica
                            data={data}
                            titulo="Año Entrevista AM"
                            id="graficaAnioEntrevistaAm"
                            tipoReporte={types.smihAnioEntrevistaAm}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Edad Ante Morten"
                            id="graficaSmihEdadAnteMorten"
                            tipoReporte={types.smihEdadAnteMorten}
                            isPie={true}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="Año de desaparición"
                            id="graficaAnioDesaparicion"
                            tipoReporte={types.smihAnioDesaparicion}
                            getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Año de Confirmación"
                            id="graficaAnioConfirmacion"
                            tipoReporte={types.smihAnioConfirmacion}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="Año Exhumación"
                            id="graficaAnioExhumacion"
                            tipoReporte={types.smihAnioExhumacion}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="Año Análisis Osteológico"
                            id="graficaAnioAnalisisOsteologico"
                            tipoReporte={types.smihanioAnalisisOst}
                            getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Año que se Informó a Familia"
                            id="graficaAnioInfoFamilia"
                            tipoReporte={types.smihAnioInfoFamilia}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="Año Dictamen"
                            id="graficaAnioDictamen"
                            tipoReporte={types.smihAnioDictamen}
                            getOptions={getOptions}
                        />
                    </Row>
                </>
            )}
        </>
    );
};
