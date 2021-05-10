import React, { useState, useEffect, memo } from "react";
import { geoCentroid } from "d3-geo";
import { Row, Col, Card, Form } from "react-bootstrap";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
  Marker,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { Spring, config } from "react-spring";


import geoDeptoLabel from "./data/deptos.json";

import { rgb } from "chroma-js";

import countryStateList from "./data/countryState.json";
import mexico from "./data/mexicoStates.json";

import "./map2.css"


const Map2 = ({ selectItem = false, refId, data }) => {
  const [defaultMap, setdefaultMap] = useState(1);//niel del mapa 0 mundo/pais - 1 estados/departamentos - 2 municipios
  const [center, setCenter] = useState([-99, 24]);
  const [szoom, setsZoom] = useState(.75);
  const [srotate, setrotate] = useState([99, -19, 0]);
  const [sscale, setscale] = useState(1500);
  const [content, setContent] = useState("");
  const [selectedMap, setselectedMap] = useState("geo-102");
  const geoWorld = mexico;
  const [geoUrl, setgeoUrl] = useState(geoWorld);

  const getMapSelected = () => {
    const cur = countryStateList.find(
      (s) => s.GID_0 === selectedMap
    );
    return cur;
  }
  const onClickMap = (geo, proj) => {
    if (defaultMap === 0) {
      setselectedMap(geo.properties.GID_0)
      setdefaultMap(1)
    } else if (defaultMap === 1) {
    }
  }

  useEffect(() => {
    var newMapSelected = getMapSelected();
    if (selectedMap) {
      if (newMapSelected) {
        setgeoUrl(newMapSelected.statesFile)
        setCenter(newMapSelected.center);
        setsZoom(newMapSelected.zoom);
        setrotate(newMapSelected.rotate);
        setscale(newMapSelected.scale);
      }
    }
    return () => {
    }
  }, [selectedMap])
  return (
    <div>
      <Spring
        from={{ zoom: .5 }}
        to={{ zoom: szoom }}
        config={config.default}
        id={`spring${refId}`}
      >
        {(styles) => (
          <ComposableMap
            id={`ComposableM${refId}`}
            data-for={`graph${refId}`}
            height={400}
            data-tip=""
            projectionConfig={{
              rotate: srotate,
              scale: sscale,
            }}

          >
            <ZoomableGroup
              center={center}
              zoom={styles.zoom}
              id={`ZoomableG${refId}`}
            >
              <Geographies
                key={`geographie${refId}`}
                geography={geoUrl}

              >
                {({ geographies }) => (
                  <>
                    {geographies.map((geo, proj) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        projection={proj}
                        onClick={() => { onClickMap(geo, proj) }}
                        onMouseEnter={() => {
                          if (defaultMap === 1) {
                            const cur = geoDeptoLabel.find(
                              (s) => s.val === geo.properties.ID && s.GID_0 === selectedMap
                            );
                            if (cur) {
                              const datCur = data.find((s) => s.id === cur.idBd);
                              if (datCur !== undefined)
                                setContent({
                                  nombre: `${cur.nombre}`,
                                  cantidad: datCur.cantidad,
                                  porcentaje: datCur.porcentaje,
                                });
                              else
                                setContent({
                                  nombre: `${cur.nombre}`,
                                  cantidad: 0,
                                  porcentaje: 0,
                                });
                            } else {

                              setContent("");
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          setContent("");
                        }}
                        style={
                          !(geo.rsmKey === selectedMap)
                            ? {
                              default: {
                                fill: "#0b7d76",
                                outline: "#fff",
                              },
                              hover: {
                                fill: "#122066",
                                stroke: "#000",
                              },
                              focus: {
                                fill: "#f2cd30",
                                outline: "none",
                              },
                            }
                            : {
                              default: {
                                fill: "#f2cd30",
                                outline: "#fff",
                              },
                              hover: {
                                fill: "#f2cd30",
                                stroke: "#000",
                              },
                              focus: {
                                fill: "#122066",
                                outline: "none",
                              },
                            }
                        }
                      />
                    ))}
                    {defaultMap >= 0 &&
                      geographies.map((geo) => {
                        const centroid = geoCentroid(geo);
                        const cur = geoDeptoLabel.find((s) => s.val === geo.properties.ID && s.GID_0 === selectedMap);
                        const datCur = data.find((s) => s.id === cur.idBd);
                        if (cur !== undefined) {
                          return (
                            <Marker
                              coordinates={centroid}
                              key={`marker${refId}${geo.properties.ID}`}
                            >
                              {datCur && (
                                <g
                                  fill="none"
                                  stroke="#ff3333"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  transform="translate(-6, -6)"
                                >
                                  <circle cx="6" cy="6" r="5" fill="none"
                                    stroke="#ff3333" />

                                </g>
                              )}

                              <text
                                y="2"
                                fontSize={4}
                                textAnchor="middle"
                                fill={"#fff"}
                              >
                                {cur.id}
                              </text>
                            </Marker>
                          );
                        }
                      })}
                  </>
                )}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </Spring>
      <ReactTooltip id={`graph${refId}`}>
        {content && (
          <table className="table table-dark tooltip-cih">
            <thead>
              <tr key="trTitulo">
                <td colSpan="2">
                  <center>{content.nombre}</center>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr key="trCantidad">
                <td>Cantidad: </td>
                <td>{content.cantidad}</td>
              </tr>
              <tr key="trPorcentaje">
                <td>Porcentaje: </td>
                <td>{content.porcentaje}%</td>
              </tr>
            </tbody>
          </table>
        )}
      </ReactTooltip>
    </div>
  );
};

export default Map2;
