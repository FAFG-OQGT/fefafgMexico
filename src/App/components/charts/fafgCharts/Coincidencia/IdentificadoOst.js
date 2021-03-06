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

export const IdentificadoOst = ({ data }) => {
    return (
        <>
            {data && (
                <>
                    <Exportar
                        subTitulo="Variables m??s utilizadas en Identificado Ost"
                        descripcion="Gr??ficas de Identificado Ost"
                    />
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Sexo"
                            id="graficaSexo"
                            tipoReporte={types.ostSexo}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Grupo ??tnico Ling??istico"
                            id="graficaGrupoEtnicoLinguistico"
                            tipoReporte={types.ostGrupoEtnicoLinguistico}
                            isPie={true}
                            getOptions={getOptions}
                        />

                        <GraficaGenerica
                            data={data}
                            titulo="Grupo Etario"
                            id="graficaGrupoEtario"
                            tipoReporte={types.ostGrupoEtario}
                            isPie={true}
                            getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="Tipo de Caso"
                            id="graficaTipoCasoDid"
                            tipoReporte={types.ostTipoCasoDid}
                            isPie={true}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="Estado Desaparici??n"
                            id="graficaDepartamentoDesaparicion"
                            tipoReporte={types.ostDepartamentoDesaparicion}
                            isMap={true}
                            getOptions={getOptions}
                        />
                        {/* <GraficaGenerica
                            data={data}
                            titulo="Municipio Desaparicion"
                            id="graficaMunicipioDesaparicion"
                            tipoReporte={types.ostMunicipioDesaparicion}
                            isPie={true}
                        /> */}

                        <GraficaGenerica
                            data={data}
                            titulo="A??o de Confirmaci??n"
                            id="graficaAnioConfirmacion"
                            tipoReporte={types.smihAnioConfirmacion}
                            getOptions={getOptions}
                        />


                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="A??o de desaparici??n"
                            id="graficaAnioDesaparicion"
                            tipoReporte={types.ostAnioDesaparicion}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="A??o Exhumaci??n"
                            id="graficaAnioExhumacion"
                            tipoReporte={types.ostAnioExhumacion}
                            getOptions={getOptions}
                        />
                        <GraficaGenerica
                            data={data}
                            titulo="A??o Dictamen"
                            id="graficaAnioDictamen"
                            tipoReporte={types.ostAnioDictamen}
                            getOptions={getOptions}
                        />
                    </Row>
                    <br></br>
                    <Row>
                        <GraficaGenerica
                            data={data}
                            titulo="A??o que se Inform?? a Familia"
                            id="graficaAnioInfoFamilia"
                            tipoReporte={types.ostAnioInfoFamilia}
                            getOptions={getOptions}
                        />
                    </Row>
                </>
            )}
        </>
    );
};
