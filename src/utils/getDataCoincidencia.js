import themeColors from "../App/components/charts/fafgCharts/themeColors";
import {types} from "./types";

export const GetDataCoincidencia = (
  tipoReporte,
  data = [],
  tipoChart,
  canvas
) => {
  switch (tipoReporte) {
    case types.calidadPerfil:
      return CalidadPerfil(data, tipoChart, canvas);
    case types.estadoCoincidencia:
      return EstadoCoincidencia(data, tipoChart, canvas);
    case types.anioConfirmacion:
      return AnioConfirmacionCoin(data, tipoChart, canvas);
    case types.estadoInvestigacion:
      return EstadoInvestigacion(data, tipoChart, canvas);
    case types.TipoCasoDid:
      return TipoCasoDid(data, tipoChart, canvas);
    case types.baseInfo:
      return BaseInfo(data, tipoChart, canvas);
    case types.victimaDeptodeEcho:
      return DepartamentoEcho(data, tipoChart, canvas);
    case types.osamentaGenero:
      return OsamentaGenero(data, tipoChart, canvas);
    case types.osamentaDeptoExhumacion:
      return DepartamentoExhumacion(data, tipoChart, canvas);
    case types.osamentaAnioExhumacion:
      return AnioExhumacion(data, tipoChart, canvas);
    case types.smihCausaDeMuerte:
      return CausaMuerte(data, tipoChart, canvas);
    case types.smihGrupoEtnicoLinguistico:
      return GrupoEtnicoLinguistico(data, tipoChart, canvas);
    case types.smihTraumaCirc:
      return TraumaCirc(data, tipoChart, canvas);
    case types.smihDatosOdontologicos:
      return DatosOdontologicos(data, tipoChart, canvas);
    case types.smihRegionAnatomica:
      return RegionAnatomica(data, tipoChart, canvas);
    case types.smihSexo:
      return Sexo(data, tipoChart, canvas);
    case types.smihGrupoEtario:
      return GrupoEtario(data, tipoChart, canvas);
    case types.smihTipoCasoDid:
      return TipoCasoDid(data, tipoChart, canvas);
    case types.smihDepartamentoDesaparicion:
      return DepartamentoDesaparicion(data, tipoChart, canvas);
    case types.smihMunicipioDesaparicion:
      return MunicipioDesaparicion(data, tipoChart, canvas);
    case types.smihEdadAnteMorten:
      return EdadAM(data, tipoChart, canvas);
    case types.smihAnioDesaparicion:
      return AnioDesaparicion(data, tipoChart, canvas);
    case types.smihAnioConfirmacion:
      return AnioConfirmacion(data, tipoChart, canvas);
    case types.smihAnioExhumacion:
      return AnioExhumacion(data, tipoChart, canvas);
    case types.smihanioAnalisisOst:
      return AnioAnalisisOst(data, tipoChart, canvas);
    case types.smihAnioInfoFamilia:
      return AnioInfoFamilia(data, tipoChart, canvas);
    case types.smihAnioDictamen:
      return AnioDictamen(data, tipoChart, canvas);
    case types.smihAnioEntrevistaAm:
      return AnioEntrevistaAnteMorten(data, tipoChart, canvas);
    case types.ostSexo:
      return Sexo(data, tipoChart, canvas);
    case types.ostGrupoEtario:
      return GrupoEtario(data, tipoChart, canvas);
    case types.ostGrupoEtnicoLinguistico:
      return GrupoEtnicoLinguistico(data, tipoChart, canvas);
    case types.ostTipoCasoDid:
      return TipoCasoDidOst(data, tipoChart, canvas);
    case types.ostAnioExhumacion:
      return AnioExhumacion(data, tipoChart, canvas);
    case types.ostDepartamentoDesaparicion:
      return DepartamentoDesaparicion(data, tipoChart, canvas);
    case types.ostMunicipioDesaparicion:
      return MunicipioDesaparicion(data, tipoChart, canvas);
    case types.ostAnioDesaparicion:
      return AnioDesaparicion(data, tipoChart, canvas);
    case types.ostAnioDictamen:
      return AnioDictamen(data, tipoChart, canvas);
    case types.ostAnioInfoFamilia:
      return AnioInfoFamilia(data, tipoChart, canvas);
    case types.ostAnioConfirmacion:
      return AnioConfirmacion(data, tipoChart, canvas);
    default:
      break;
  }
};
const CalidadPerfil = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({CalidadPerfil}) => {
    if (CalidadPerfil) {
      lista.push(CalidadPerfil.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const EstadoCoincidencia = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({EstadoCoincidencia}) => {
    if (EstadoCoincidencia) {
      lista.push(EstadoCoincidencia.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const AnioConfirmacionCoin = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaConfExc}) => {
    if (fechaConfExc) {
      let anio = fechaConfExc.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const EstadoInvestigacion = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({EstadoInvestigacion}) => {
    if (EstadoInvestigacion) {
      lista.push(EstadoInvestigacion.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const TipoCasoDid = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({TipoCasoDid}) => {
    if (TipoCasoDid) {
      lista.push(TipoCasoDid.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const BaseInfo = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({BaseInfo}) => {
    if (BaseInfo) {
      lista.push(BaseInfo.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const DepartamentoEcho = (data, tipoChart, canvas) => {
  const lista = [];
  let total = 0;
  data.map(({Victima}) => {
    if (Victima) {
      const {lugarHechoDeptoId, DeptoLugarHecho} = !!Victima && Victima;
      if (lugarHechoDeptoId) {
        lista.push({
          id: lugarHechoDeptoId,
          categoria: DeptoLugarHecho.descripcion,
        });
        total++;
      }
    }
  });
  return GetDataChart(tipoChart, lista, total);
};
const OsamentaGenero = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({Osamenta}) => {
    if (Osamenta) {
      if (Osamenta.SexoAdn) {
        lista.push(Osamenta.SexoAdn.descripcion);
      } else {
        lista.push("No Asignado");
      }
    } else {
      lista.push("Sin Asignar Osamenta");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const DepartamentoExhumacion = (data, tipoChart, canvas) => {
  const lista = [];
  let total = 0;
  data.map(({Osamenta}) => {
    if (Osamenta) {
      const {exhumacionDeptoId, DeptoExhumacion} = !!Osamenta && Osamenta;
      if (exhumacionDeptoId) {
        lista.push({
          id: exhumacionDeptoId,
          categoria: DeptoExhumacion.descripcion,
        });
        total++;
      }
    }
  });
  return GetDataChart(tipoChart, lista, total); //el tercer argumento puede ser el canvas o el total
};
const AnioExhumacion = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({Osamenta}) => {
    if (Osamenta) {
      if (Osamenta.fechaExhumacion) {
        let anio = Osamenta.fechaExhumacion.split("-")[0];
        lista.push(anio);
      } else {
        lista.push("No Asignado");
      }
    } else {
      lista.push("Sin Asignar Osamenta");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const CausaMuerte = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({CausaMuerte}) => {
    if (CausaMuerte) {
      lista.push(CausaMuerte.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const GrupoEtnicoLinguistico = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({GrupoEtnolinguistico}) => {
    if (GrupoEtnolinguistico) {
      lista.push(GrupoEtnolinguistico.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const TraumaCirc = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({TraumaCirc}) => {
    if (TraumaCirc) {
      lista.push(TraumaCirc.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const DatosOdontologicos = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({DatosOdont}) => {
    if (DatosOdont) {
      lista.push(DatosOdont.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const RegionAnatomica = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({RegionAnatomica}) => {
    if (RegionAnatomica) {
      lista.push(RegionAnatomica.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const Sexo = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({Sexo}) => {
    if (Sexo) {
      lista.push(Sexo.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const GrupoEtario = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({GrupoEtario}) => {
    if (GrupoEtario) {
      lista.push(GrupoEtario.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const DepartamentoDesaparicion = (data, tipoChart, canvas) => {
  const lista = [];
  let total = 0;
  data.map(({desaparicionDeptoId, DeptoDesap}) => {
    if (desaparicionDeptoId) {
      lista.push({
        id: desaparicionDeptoId,
        categoria: DeptoDesap.descripcion,
      });
      total++;
    }
  });
  return GetDataChart(tipoChart, lista, total);
};
const MunicipioDesaparicion = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({MuniDesap}) => {
    if (MuniDesap) {
      lista.push(MuniDesap.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const EdadAM = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({ValorEdadAM}) => {
    if (ValorEdadAM) {
      lista.push(ValorEdadAM.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};
const AnioDesaparicion = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({desaparicionAnio}) => {
    if (desaparicionAnio) {
      lista.push(desaparicionAnio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const AnioConfirmacion = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaConfirmacion}) => {
    if (fechaConfirmacion) {
      let anio = fechaConfirmacion.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const AnioAnalisisOst = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaAnalisisOst}) => {
    if (fechaAnalisisOst) {
      let anio = fechaAnalisisOst.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const AnioInfoFamilia = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaInfoFamilia}) => {
    if (fechaInfoFamilia) {
      let anio = fechaInfoFamilia.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const AnioDictamen = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaDictamen}) => {
    if (fechaDictamen) {
      let anio = fechaDictamen.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const AnioEntrevistaAnteMorten = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({fechaEntrevistaAM}) => {
    if (fechaEntrevistaAM) {
      let anio = fechaEntrevistaAM.split("-")[0];
      lista.push(anio);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista.sort(Ordenar), canvas);
};
const TipoCasoDidOst = (data, tipoChart, canvas) => {
  const lista = [];
  data.map(({TipoCasoDidOst}) => {
    if (TipoCasoDidOst) {
      lista.push(TipoCasoDidOst.descripcion);
    } else {
      lista.push("No Asignado");
    }
  });
  return GetDataChart(tipoChart, lista, canvas);
};

const getDataXTipoChart = (idChart, categoria) => {
  let color;
  if (idChart === "graficaEstadoCoincidencia")
    color =
      categoria === "No Asignada" || categoria === "No Asignado"
        ? 2
        : categoria === "Confirmada"
        ? 0
        : categoria === "Excluida"
        ? 7
        : categoria === "Seguimiento"
        ? 3
        : categoria === "Inconclusa"
        ? 4
        : -1;
  else return -1;
  return color;
};
const GetDataChart = (tipoChart, lista, obj) => {
  //el  tercer argumento puede ser el canvas o el total
  switch (tipoChart) {
    case types.chartBar:
      let datasets = [];
      let titleTotalBar = 0;
      //colores graficaEstadoCoincidencia
      Distintos(lista).map((item, index) => {
        let total = lista.filter((i) => i === item).length;
        titleTotalBar += total;
        let colorS =
          getDataXTipoChart(obj.id, item) !== -1
            ? getDataXTipoChart(obj.id, item)
            : index;
        datasets.push({
          label: item,
          data: [total],
          borderColor: themeColors(obj).themes[colorS],
          backgroundColor: themeColors(obj).themes[colorS],
          hoverBorderColor: themeColors(obj).themes[colorS],
          hoverBackgroundColor: themeColors(obj).themes[colorS],
        });
      });

      return [
        {
          datasets: datasets,
          labels: ["-"],
        },
        titleTotalBar,
      ];
    case types.chartPie:
      let categories = [];
      let values = [];
      let colors = [];
      let titleTotalPie = 0;
      Distintos(lista).map((item, index) => {
        let total = lista.filter((i) => i === item).length;
        let colorS =
          getDataXTipoChart(obj.id, item) !== -1
            ? getDataXTipoChart(obj.id, item)
            : index;
        titleTotalPie += total;
        categories.push(item);
        values.push(total);
        colors.push(themeColors(obj).themes[colorS]);
      });
      return [
        {
          labels: categories,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              hoverBackgroundColor: colors,
            },
          ],
        },
        titleTotalPie,
      ];
    case types.charLine:
      var lineData = [];
      var lineLabels = [];
      let titleTotalLine = 0;
      Distintos(lista).map((item) => {
        let total = lista.filter((i) => i === item).length;
        titleTotalLine += total;
        lineLabels.push(item);
        lineData.push(total);
      });

      return [
        {
          datasets: [
            {
              label: "Cantidad",
              data: lineData,
              pointRadius: 10,
              pointStyle: "star",
              lineTension: 0,

              fill: true,
              borderWidth: 4,
              borderColor: themeColors(obj).themes[4],
              backgroundColor: themeColors(obj).themes[1],
            },
          ],
          labels: lineLabels,
        },
        titleTotalLine,
      ];
    case types.charMap:
      var listMap = [];
      DistintosWithId(lista).map((item) => {
        let total = lista.filter((i) => i.id === item.id).length;
        let auxPorcentaje = (total / obj) * 100;
        let porcentaje = auxPorcentaje.toFixed(2);

        listMap.push({
          id: item.id,
          cantidad: total,
          categoria: item.categoria,
          porcentaje,
        });
      });
      const totalCant = listMap.reduce((prev, cur) => prev + cur.cantidad, 0);
      const totalPorc = listMap.reduce((prev, cur) => prev + cur.porcentaje, 0);

      listMap.push({
        id: "total",
        cantidad: totalCant,
        categoria: "Total",
        porcentaje: totalPorc,
      });

      return listMap;
    default:
      break;
  }
};
const Distintos = (array) => {
  const newList = [];
  const miMapAux = new Map();
  for (const item of array) {
    if (!miMapAux.has(item)) {
      miMapAux.set(item, true);
      newList.push(item);
    }
  }
  return newList;
};
const DistintosWithId = (array) => {
  const newList = [];
  const miMapAux = new Map();
  for (const item of array) {
    if (!miMapAux.has(item.id)) {
      miMapAux.set(item.id, true);
      newList.push(item);
    }
  }
  return newList;
};
const Ordenar = (a, b) => Number(a) - Number(b);
