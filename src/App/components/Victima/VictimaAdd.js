import React, {useState, useContext, useEffect} from "react";
import {Card, Form, Col, Row, Button} from "react-bootstrap";
import axios from "axios";
import userContext from "../../../context/userContext";
import config from "../../../config";
import {apiCatalogo} from "../../../utils/fetchCatalogos";
import moment from "moment";

import Datetime from "react-datetime";
import {renderInputFecha, validDate} from "../Utils/fechas";

import {
  ValidationForm,
  TextInput,
  SelectGroup
} from "react-bootstrap4-form-validation";

import "./VictimaEdit.css";

function VictimaAdd({
  onAddDone,
  oncerrarModal,
  mensajeAlerta,
  agregar = false
}) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`}
  };
  //DEFINICION DE ESTADOS
  const [comboDepto, setcomboDepto] = useState();
  const [comboMunicipio, setcomboMunicipio] = useState();
  const [comboTipodocumento, setcomboTipodocumento] = useState();

  //GENERALES
  const [codigoVictima, setcodigoVictima] = useState("");
  const [nombreVictima, setnombreVictima] = useState("");
  const [noDocumento, setnoDocumento] = useState("");
  const [estadoId, setestadoId] = useState(1);
  const [tipoDocumentoId, settipoDocumentoId] = useState("");

  const [residenciaAldea, setresidenciaAldea] = useState("");
  const [residenciaDeptoId, setresidenciaDeptoId] = useState("");
  const [residenciaMuniId, setresidenciaMuniId] = useState("");

  //DATOS DEL HECHO
  const [diaHecho, setdiaHecho] = useState(null);
  const [mesHecho, setmesHecho] = useState(null);
  const [anioHecho, setanioHecho] = useState(null);
  const [lugarHechoAldea, setlugarHechoAldea] = useState("");
  const [lugarHechoDeptoId, setlugarHechoDeptoId] = useState("");
  const [lugarHechoMuniId, setlugarHechoMuniId] = useState("");
  const [fechaNacimientoVictima, setfechaNacimientoVictima] = useState("");

  const handleCloseAdd = (e) => {
    e.preventDefault();
    oncerrarModal(false);
  };
  const update = async () => {
    try {
      var data = {
        codigoVictima: codigoVictima,
        nombreVictima: nombreVictima,
        residenciaAldea: residenciaAldea,
        residenciaMuniId: residenciaMuniId === "" ? null : residenciaMuniId,
        residenciaDeptoId: residenciaDeptoId === "" ? null : residenciaDeptoId,
        lugarHechoAldea: lugarHechoAldea,
        lugarHechoMuniId: lugarHechoMuniId === "" ? null : lugarHechoMuniId,
        lugarHechoDeptoId: lugarHechoDeptoId === "" ? null : lugarHechoDeptoId,
        fechaNacimientoVictima: !(fechaNacimientoVictima === "")
          ? moment(fechaNacimientoVictima).format("YYYY-MM-DD")
          : null,
        diaHecho: diaHecho,
        mesHecho: mesHecho,
        anioHecho: anioHecho,

        estadoId: estadoId,

        noDocumento: noDocumento,
        tipoDocumentoId: tipoDocumentoId === "" ? null : tipoDocumentoId,

        usuarioIngresoId: user.usuarioId
      };
      const res = await axios.post(`${config.urlApi}/victima`, data, configReq);

      if (res.status === 202) {
        mensajeAlerta(
          "Creacion victima",
          "Se ha creado la victima con id [" + data.codigoVictima + "]",
          "success"
        );
        onAddDone(true);
      }
    } catch (error) {
      if (error.response.status === 500) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "Creacion Victima",
            `Error con la creacion de victima : ${dataError}`,

            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion Victima",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Creacion Victima",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);

    if (catalogo === "departamento") {
      setcomboDepto(result.data);
    }
    if (catalogo === "municipio") {
      setcomboMunicipio(result.data);
    }

    if (catalogo === "tipoDocumento") {
      setcomboTipodocumento(result.data);
    }
  };

  useEffect(() => {
    fetchCatalogo("departamento");
    fetchCatalogo("municipio");
    fetchCatalogo("tipoDocumento");
    return () => {};
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    update();
  };
  const validaAnio = (value) => {
    if (value === undefined || value === null || value === "") {
      return true;
    } else {
      if (value.length === 4) {
        if (parseInt(value) > 1500 && parseInt(value) < 2060) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  const validaMes = (value) => {
    if (value === undefined || value === null || value === "") {
      return true;
    } else {
      if (value.length >= 1 || value.length <= 2) {
        if (parseInt(value) >= 1 && parseInt(value) <= 12) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  const validaDia = (value) => {
    if (value === undefined || value === null || value === "") {
      return true;
    } else {
      if (value.length >= 1 || value.length <= 2) {
        if (parseInt(value) >= 1 && parseInt(value) <= 31) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <Card.Body>
              <ValidationForm
                onSubmit={handleAdd}
                setFocusOnError={true}
                defaultErrorMessage={{
                  required: "El campo es requerido.",
                  minLength: "Ingresar por lo menos {minLength} caracteres"
                }}
              >
                <Row>
                  <Col className="borderRadSolid">
                    <h5>Datos Generales</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Codigo AM</Form.Label>
                      <TextInput
                        type="text"
                        id="codigoVictima"
                        name="codigoVictima"
                        placeholder="Ingresar codigo de victima"
                        value={codigoVictima}
                        onChange={(e) => {
                          setcodigoVictima(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <TextInput
                        type="text"
                        id="nombreVictima"
                        name="nombreVictima"
                        placeholder="Nombre victima"
                        value={nombreVictima}
                        onChange={(e) => {
                          setnombreVictima(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Tipo documento</Form.Label>
                      <SelectGroup
                        name="tipoDocumentoId"
                        id="tipoDocumentoId"
                        value={
                          !(tipoDocumentoId === undefined)
                            ? tipoDocumentoId
                            : ""
                        }
                        onChange={(e) => {
                          settipoDocumentoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboTipodocumento === undefined)
                          ? comboTipodocumento.map((fbb) => (
                              <option
                                key={fbb.tipoDocumentoId}
                                value={fbb.tipoDocumentoId}
                              >
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Documento</Form.Label>
                      <TextInput
                        type="text"
                        id="noDocumento"
                        name="noDocumento"
                        placeholder="Documento"
                        value={noDocumento}
                        onChange={(e) => {
                          setnoDocumento(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Fecha Nacimiento</Form.Label>
                      <Datetime
                        id="fechaNacimientoVictima"
                        name="fechaNacimientoVictima"
                        defaultValue=""
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Fecha nacimiento"
                        }}
                        value={fechaNacimientoVictima}
                        onChange={(e) => {
                          setfechaNacimientoVictima(e);
                        }}
                        isValidDate={validDate}
                        renderInput={renderInputFecha}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Label>Lugar Resi.</Form.Label>
                      <TextInput
                        type="text"
                        id="residenciaAldea"
                        name="residenciaAldea"
                        placeholder="Lugar"
                        value={residenciaAldea}
                        onChange={(e) => {
                          setresidenciaAldea(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Estado Resi.</Form.Label>
                      <SelectGroup
                        name="residenciaDeptoId"
                        id="residenciaDeptoId"
                        value={
                          !(residenciaDeptoId === undefined)
                            ? residenciaDeptoId
                            : ""
                        }
                        onChange={(e) => {
                          setresidenciaDeptoId(e.target.value);
                          setresidenciaMuniId("");
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboDepto === undefined)
                          ? comboDepto.map((fbb) => (
                              <option
                                key={fbb.departamentoId}
                                value={fbb.departamentoId}
                              >
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Municipio Resi.</Form.Label>
                      <SelectGroup
                        name="residenciaMuniId"
                        id="residenciaMuniId"
                        value={
                          !(residenciaMuniId === undefined)
                            ? residenciaMuniId
                            : ""
                        }
                        onChange={(e) => {
                          setresidenciaMuniId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboMunicipio === undefined)
                          ? comboMunicipio
                              .filter(
                                (filt) =>
                                  filt.departamentoId == residenciaDeptoId
                              )
                              .map((fbb) => (
                                <option
                                  key={fbb.municipioId}
                                  value={fbb.municipioId}
                                >
                                  {fbb.descripcion}
                                </option>
                              ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="borderRadSolid">
                    <h5>Datos del hecho</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Dia</Form.Label>
                      <TextInput
                        type="number"
                        id="diaHecho"
                        className="form-control text-center"
                        name="diaHecho"
                        placeholder="Dia"
                        value={diaHecho}
                        validator={validaDia}
                        errorMessage={{validator: "Ingrese dia correcto."}}
                        onChange={(e) => {
                          setdiaHecho(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Mes</Form.Label>
                      <SelectGroup
                        name="mesHecho"
                        id="mesHecho"
                        value={!(mesHecho === undefined) ? mesHecho : ""}
                        onChange={(e) => {
                          setmesHecho(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        <option key="1" value="1">
                          Enero
                        </option>
                        <option key="2" value="2">
                          Febrero
                        </option>
                        <option key="3" value="3">
                          Marzo
                        </option>
                        <option key="4" value="4">
                          Abril
                        </option>
                        <option key="5" value="5">
                          Mayo
                        </option>
                        <option key="6" value="6">
                          Junio
                        </option>
                        <option key="7" value="7">
                          Julio
                        </option>
                        <option key="8" value="8">
                          Agosto
                        </option>
                        <option key="9" value="9">
                          Septiembre
                        </option>
                        <option key="10" value="10">
                          Octubre
                        </option>
                        <option key="11" value="11">
                          Noviembre
                        </option>
                        <option key="12" value="12">
                          Diciembre
                        </option>
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Año</Form.Label>
                      <TextInput
                        type="number"
                        id="anioHecho"
                        name="anioHecho"
                        placeholder="Año"
                        className="form-control text-center"
                        validator={validaAnio}
                        errorMessage={{validator: "Ingrese año correcto(####)"}}
                        value={anioHecho}
                        onChange={(e) => {
                          setanioHecho(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Lugar</Form.Label>
                      <TextInput
                        type="text"
                        id="lugarHechoAldea"
                        name="lugarHechoAldea"
                        placeholder="Lugar del hecho"
                        value={lugarHechoAldea}
                        onChange={(e) => {
                          setlugarHechoAldea(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <SelectGroup
                        name="lugarHechoDeptoId"
                        id="lugarHechoDeptoId"
                        value={
                          !(lugarHechoDeptoId === undefined)
                            ? lugarHechoDeptoId
                            : ""
                        }
                        onChange={(e) => {
                          setlugarHechoDeptoId(e.target.value);
                          setlugarHechoMuniId("");
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboDepto === undefined)
                          ? comboDepto.map((fbb) => (
                              <option
                                key={fbb.departamentoId}
                                value={fbb.departamentoId}
                              >
                                {fbb.descripcion}
                              </option>
                            ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Municipio</Form.Label>
                      <SelectGroup
                        name="lugarHechoMuniId"
                        id="lugarHechoMuniId"
                        value={
                          !(lugarHechoMuniId === undefined)
                            ? lugarHechoMuniId
                            : ""
                        }
                        onChange={(e) => {
                          setlugarHechoMuniId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboMunicipio === undefined)
                          ? comboMunicipio
                              .filter(
                                (filt) =>
                                  filt.departamentoId == lugarHechoDeptoId
                              )
                              .map((fbb) => (
                                <option
                                  key={fbb.municipioId}
                                  value={fbb.municipioId}
                                >
                                  {fbb.descripcion}
                                </option>
                              ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className=" d-flex justify-content-center">
                    {agregar === true && (
                      <Button
                        key="btnSave"
                        name="btnSave"
                        type="submit"
                        variant="outline-primary"
                        size="md"
                      >
                        <i className="feather icon-save" />
                        Guardar
                      </Button>
                    )}
                    <Button
                      key="btnCancel"
                      name="btnCancel"
                      onClick={handleCloseAdd}
                      variant="outline-danger"
                      size="md"
                    >
                      <i className="feather icon-close" />
                      Cancelar
                    </Button>
                  </Col>
                </Row>
              </ValidationForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VictimaAdd;
