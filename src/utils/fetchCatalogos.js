import axios from "axios";
import config from "../config";

const configReq = (token) => {
  return {headers: {Authorization: `Bearer ${token}`}};
};

const apiFetchPersonas = async (token) => {
  try {
    const res = await axios.get(
      `${config.urlApi}/persona/combo/0`,
      configReq(token)
    );

    var roots = res.data.data.map(function (row) {
      return {
        value: row.personaId,
        label: "[" + row.personaId + "] " + row.nombre,
      };
    });
    return roots;
  } catch (error) {
    return {value: "", label: "[0] - -"};
  }
};


const apiFetchVictimas = async (token) => {
  try {
    const res = await axios.get(
      `${config.urlApi}/victima`,
      configReq(token)
    );
    
    var roots = res.data.data.rows.map(function (row) {
      return {
        value: row.victimaId,
        label: "[" + row.codigoVictima + "] " + row.nombreVictima,
        data: row
      };
    });
    return roots;
  } catch (error) {
    return {value: "", label: "[0] - -"};
  }
};



const apiFetchOsamentas= async (token) => {
  try {
    const res = await axios.get(
      `${config.urlApi}/osamenta`,
      configReq(token)
    );
    
    var roots = res.data.data.rows.map(function (row) {
      return {
        value: row.osamentaId,
        label: `[${row.osamentaId}] FAFG-${row.casoId}-${row.fosaDet}-${row.osamentaDet}`,
        data: row
      };
    });
    return roots;
  } catch (error) {
    return {value: "", label: "[0] - -"};
  }
};


//catalogos
const apiCatalogo = async (catalogo, token) => {
  try {
    const res = await axios.get(
      `${config.urlApi}/catalogo/${catalogo}`,
      configReq(token)
    );
      
    return res.data;
  } catch (error) {
    return error;
  }
};

export {apiFetchPersonas, apiCatalogo,apiFetchVictimas,apiFetchOsamentas};
