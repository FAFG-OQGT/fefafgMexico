import React, {useContext, useEffect, useState} from "react";
import Aux from "../../../../../../hoc/_Aux";
import config from "../../../../../../config";
import axios from "axios";
import userContext from "../../../../../../context/userContext";
import {Link, withRouter} from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  ProgressBar
} from "react-bootstrap";
function NavSearch() {
  const user = useContext(userContext);

  const [isSearch, setSearch] = useState(false);
  const [dataSmih, setdataSmih] = useState([]);
  const [dataOsteologico, setdataOsteologico] = useState([]);
  const [dataCoincidencia, setdataCoincidencia] = useState([]);
  const [dataVictima, setdataVictima] = useState([]);
  const [textToSearch, settextToSearch] = useState();
  const searchSyle = isSearch ? "block" : "none";

  const fetchIdentificadosSmih = (pageSize, pageIndex, searchValue, token) => {
    const configReq = {
      headers: {Authorization: `Bearer ${user.token}`}
    };

    const res = axios
      .get(
        `${config.urlApi}/identificadoSmih?pagina=${pageIndex}&limite=${pageSize}&filtro=${searchValue}`,
        configReq
      )
      .then((response) => {
        setdataSmih(response.data.data.rows);
      });
  };
  const fetchIdentificadosOsteologico = (
    pageSize,
    pageIndex,
    searchValue,
    token
  ) => {
    const configReq = {
      headers: {Authorization: `Bearer ${user.token}`}
    };

    const res = axios
      .get(
        `${config.urlApi}/IdentificadoOst?pagina=${pageIndex}&limite=${pageSize}&filtro=${searchValue}`,
        configReq
      )
      .then((response) => {
        setdataOsteologico(response.data.data.rows);
      });
  };
  const fetchCoincidencia = (pageSize, pageIndex, searchValue, token) => {
    const configReq = {
      headers: {Authorization: `Bearer ${user.token}`}
    };

    const res = axios
      .get(
        `${config.urlApi}/coincidencia?pagina=${pageIndex}&limite=${pageSize}&filtro=${searchValue}`,
        configReq
      )
      .then((response) => {
        setdataCoincidencia(response.data.data.rows);
      });
  };
  const fetchVictima = (pageSize, pageIndex, searchValue, token) => {
    const configReq = {
      headers: {Authorization: `Bearer ${user.token}`}
    };

    const res = axios
      .get(
        `${config.urlApi}/victima?pagina=${pageIndex}&limite=${pageSize}&filtro=${searchValue}`,
        configReq
      )
      .then((response) => {
        console.log(response.data.data.rows);
        setdataVictima(response.data.data.rows);
      });
  };
  useEffect(() => {
    if (textToSearch === "") {
      setdataSmih([]);
      setdataCoincidencia([]);
      setdataVictima([]);
      setdataOsteologico([]);
    } else {
      fetchIdentificadosSmih(3, 0, textToSearch, user.token);
      fetchCoincidencia(3, 0, textToSearch, user.token);
      fetchVictima(3, 0, textToSearch, user.token);
      fetchIdentificadosOsteologico(3, 0, textToSearch, user.token);
    }
    return () => {};
  }, [textToSearch]);
  return (
    <Aux>
      <a
        href={"#"}
        className="pop-search"
        onClick={(e) => setSearch(!isSearch)}
      >
        <i className="feather icon-search" />
      </a>
      <div className="search-bar" style={{display: searchSyle}}>
        <div className="search-bar-content">
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Buscar"
            value={textToSearch}
            onChange={(e) => settextToSearch(e.target.value)}
          />
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={(e) => setSearch(!isSearch)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="search-bar-result">
          <ul className="search-bar-resultList">
            {dataVictima.length > 0 && (
              <li className="search-bar-subtittle">Victimas</li>
            )}
            {dataVictima.length > 0 &&
              dataVictima.map((item) => (
                <li key={`searchVictima${item.codigoVictima}`}>
                  <p>
                    {` ${item.nombreVictima}`}
                    <Link
                      to={{
                        pathname: config.baseApp + "/victimas"
                      }}
                      onClick={(e) => setSearch(!isSearch)}
                    >
                      <Badge className="badgeSearch" variant={"primary"}>
                        {item.codigoVictima.toString().padStart(5, "0")}
                      </Badge>
                    </Link>
                  </p>
                </li>
              ))}
            {dataCoincidencia.length > 0 && (
              <li className="search-bar-subtittle">Coincidencia</li>
            )}
            {dataCoincidencia.length > 0 &&
              dataCoincidencia.map((item) => (
                <li key={`searchCoincidencia${item.coincidenciaId}`}>
                  <p>
                    {` ${item.Victima.nombreVictima}`}
                    <Link
                      to={{
                        pathname: config.baseApp + "/coincidenciasCaso",
                        query: {
                          backUrl: config.baseApp + "/coincidencias",
                          dataCaso: item
                        }
                      }}
                      onClick={(e) => setSearch(!isSearch)}
                    >
                      <Badge className="badgeSearch" variant={"primary"}>
                        {item.coincidenciaId.toString().padStart(5, "0")}
                      </Badge>
                    </Link>
                  </p>
                </li>
              ))}
            {dataSmih.length > 0 && (
              <li className="search-bar-subtittle">Identificado Smih</li>
            )}
            {dataSmih.length > 0 &&
              dataSmih.map((item) => (
                <li key={`searchSmih${item.identificadoSmihId}`}>
                  <p>
                    {` ${item.Victima.nombreVictima}`}
                    <Link
                      to={{
                        pathname: config.baseApp + "/identificadosSmIhEdit",
                        query: {
                          backUrl: config.baseApp + "/identificadosSmIh",
                          dataCaso: item
                        }
                      }}
                      onClick={(e) => setSearch(!isSearch)}
                    >
                      <Badge className="badgeSearch" variant={"primary"}>
                        {item.identificadoSmihId.toString().padStart(5, "0")}
                      </Badge>
                    </Link>
                  </p>
                </li>
              ))}

            {dataOsteologico.length > 0 && (
              <li className="search-bar-subtittle">Identificado Osteologico</li>
            )}
            {dataOsteologico.length > 0 &&
              dataOsteologico.map((item) => (
                <li key={`searchSmih${item.identificadoOstId}`}>
                  <p>
                    {` ${item.Victima.nombreVictima}`}
                    <Link
                      to={{
                        pathname:
                          config.baseApp + "/identificadosOsteologicoEdit",
                        query: {
                          backUrl: config.baseApp + "/home",
                          dataCaso: item
                        }
                      }}
                      onClick={(e) => setSearch(!isSearch)}
                    >
                      <Badge className="badgeSearch" variant={"primary"}>
                        {item.identificadoOstId.toString().padStart(5, "0")}
                      </Badge>
                    </Link>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Aux>
  );
}

export default withRouter(NavSearch);
