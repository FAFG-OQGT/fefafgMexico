import React, { useState, useContext, useEffect } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import userContext from "../../../../context/userContext";
import config from "../../../../config";
import { apiCatalogo } from "../../../../utils/fetchCatalogos";
import Loader from "../../Loader/Loader";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";

function FioUpdate({ CoincidenciaId, oncerrarModal, mensajeAlerta }) {
  //CONTEXT LOAD
  const user = useContext(userContext);
  const configReq = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  //DEFINICION DE ESTADOS
  const [loading, setloading] = useState(false);
  const [nombreVictima, setnombreVictima] = useState();
  const [codigoAM, setcodigoAM] = useState();
  const [codigoPM, setcodigoPM] = useState();
  const [edadAM, setedadAM] = useState();
  const [edadPM, setedadPM] = useState();
  const [estaturaAM, setestaturaAM] = useState();
  const [estaturaPM, setestaturaPM] = useState();
  const [enfermedadAM, setenfermedadAM] = useState();
  const [enfermedadPM, setenfermedadPM] = useState();
  const [denticionAM, setdenticionAM] = useState();
  const [denticionPM, setdenticionPM] = useState();
  const [formaEntierroAM, setformaEntierroAM] = useState();
  const [formaEntierroPM, setformaEntierroPM] = useState();
  const [elementosIndividAM, setelementosIndividAM] = useState();
  const [elementosIndividPM, setelementosIndividPM] = useState();
  const [adnAM, setadnAM] = useState();
  const [adnPM, setadnPM] = useState();
  const [nombreEntrevistado, setnombreEntrevistado] = useState();
  const [nombreReconocio, setnombreReconocio] = useState();
  const [coincidencia, setcoincidencia] = useState();
  const [reconocimientoCampo, setreconocimientoCampo] = useState();
  const [identificacionFinal, setidentificacionFinal] = useState();
  const [indiceFiliacion, setindiceFiliacion] = useState();
  const [apriori, setapriori] = useState();
  const [posterior, setposterior] = useState();
  const [fechaEvento, setfechaEvento] = useState();
  const [lugarEvento, setlugarEvento] = useState();
  const [fechaExhumacion, setfechaExhumacion] = useState();
  const [fechaAnalisis, setfechaAnalisis] = useState();
  const [fechaCoincidencia, setfechaCoincidencia] = useState();
  const [fechaConfirmacion, setfechaConfirmacion] = useState();
  const [observaciones, setobservaciones] = useState();
  const [contextoIdentificacion, setcontextoIdentificacion] = useState();
  const [tipoEvento, settipoEvento] = useState();
  const [fechaFio, setfechaFio] = useState();
  const [observacionesTrauma, setobservacionesTrauma] = useState();
  const [observacionesEstatura, setobservacionesEstatura] = useState();


  const [sexoAM, setsexoAM] = useState();
  const [sexoPM, setsexoPM] = useState();
  const [comboSexoId, setcomboSexoId] = useState();

  const [traumaCircAM, settraumaCircAM] = useState();
  const [traumaCircPM, settraumaCircPM] = useState();
  const [traumaAntAM, settraumaAntAM] = useState();
  const [traumaAntPM, settraumaAntPM] = useState();
  const [comboTrauma, setcomboTrauma] = useState();

  const [causaMuerteAM, setcausaMuerteAM] = useState();
  const [causaMuertePM, setcausaMuertePM] = useState();
  const [combocausaMuerte, setcombocausaMuerte] = useState();

  const [grupoEtnolinguisticoId, setgrupoEtnolinguisticoId] = useState();
  const [combogrupoEtnolinguistico, setcombogrupoEtnolinguistico] = useState();

  const handleCloseEdit = (e) => {
    e.preventDefault();
    oncerrarModal(false);
  };

  const getFio = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${config.urlApi}/Coincidencia/dataFIO/${CoincidenciaId}`,
        configReq
      );
      if (res.status === 200) {
        setloading(false);
        setnombreVictima(res.data.data.nombreVictima);
        setcodigoAM(res.data.data.codigoAM);
        setcodigoPM(res.data.data.codigoPM);
        setsexoAM(res.data.data.sexoAM);
        setsexoPM(res.data.data.sexoPM);
        setedadAM(res.data.data.enfermedadAM);
        setedadPM(res.data.data.edadPM);
        setestaturaAM(res.data.data.estaturaAM);
        setestaturaPM(res.data.data.estaturaPM);
        settraumaAntAM(res.data.data.traumaAntAM);
        settraumaAntPM(res.data.data.traumaAntPM);
        setenfermedadAM(res.data.data.enfermedadAM);
        setenfermedadPM(res.data.data.enfermedadPM);
        setdenticionAM(res.data.data.denticionAM);
        setdenticionPM(res.data.data.denticionPM);
        setformaEntierroAM(res.data.data.formaEntierroAM);
        setformaEntierroPM(res.data.data.formaEntierroPM);
        setelementosIndividAM(res.data.data.elementosIndividAM);
        setelementosIndividPM(res.data.data.elementosIndividPM);
        setadnAM(res.data.data.adnAM);
        setadnPM(res.data.data.adnPM);
        setnombreEntrevistado(res.data.data.nombreEntrevistado);
        setnombreReconocio(res.data.data.nombreReconocio);
        setcoincidencia(res.data.data.coincidencia);
        setreconocimientoCampo(res.data.data.reconocimientoCampo);
        setidentificacionFinal(res.data.data.identificacionFinal);
        setindiceFiliacion(res.data.data.indiceFiliacion);
        setapriori(res.data.data.apriori);
        setposterior(res.data.data.posterior);
        setfechaEvento(res.data.data.fechaEvento);
        setlugarEvento(res.data.data.lugarEvento);
        setfechaExhumacion(res.data.data.fechaExhumacion);
        setfechaAnalisis(res.data.data.fechaAnalisis);
        setfechaCoincidencia(res.data.data.fechaCoincidencia);
        setfechaConfirmacion(res.data.data.fechaConfirmacion);
        setobservaciones(res.data.data.observaciones);
        setcontextoIdentificacion(res.data.data.contextoIdentificacion);
        settipoEvento(res.data.data.tipoEvento);
        setfechaFio(res.data.data.fechaFio);
        settraumaCircAM(res.data.data.traumaCircAM);
        settraumaCircPM(res.data.data.traumaCircPM);
        setcausaMuerteAM(res.data.data.causaMuerteAM);
        setcausaMuerteAM(res.data.data.causaMuerteAM);
        setcausaMuertePM(res.data.data.causaMuertePM);
        setgrupoEtnolinguisticoId(res.data.data.grupoEtnolinguisticoId);
        setobservacionesTrauma(res.data.data.observacionesTrauma);
        setobservacionesEstatura(res.data.data.observacionesEstatura);
      }
    } catch (error) {
      setloading(false);
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "No se puede obtener informacion de FIO",
            `${dataError}`,

            "error"
          );
        } else {
          mensajeAlerta(
            "No se puede obtener informacion de FIO",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "No se puede obtener informacion de FIO",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const update = async () => {
    try {
      var data = {
        sexoAM: sexoAM,
        sexoPM: sexoPM,
        edadAMIni: edadAM,
        edadPM: edadPM,
        estaturaAM: estaturaAM,
        estaturaPM: estaturaPM,
        traumaAntAM: traumaAntAM,
        traumaAntPM: traumaAntPM,
        enfermedadAM: enfermedadAM,
        enfermedadPM: enfermedadPM,
        denticionAM: denticionAM,
        denticionPM: denticionPM,
        formaEntierroAM: formaEntierroAM,
        formaEntierroPM: formaEntierroPM,
        elementosIndividAM: elementosIndividAM,
        elementosIndividPM: elementosIndividPM,
        adnAM: adnAM,
        adnPM: adnPM,
        nombreEntrevistado: nombreEntrevistado,
        nombreReconocio: nombreReconocio,
        coincidencia: coincidencia,
        reconocimientoCampo: reconocimientoCampo,
        identificacionFinal: identificacionFinal,
        indiceFiliacion: indiceFiliacion,
        apriori: apriori,
        posterior: posterior,
        fechaEvento: fechaEvento,
        lugarEvento: lugarEvento,
        fechaExhumacion: fechaExhumacion,
        fechaAnalisis: fechaAnalisis,
        fechaCoincidencia: fechaCoincidencia,
        fechaConfirmacion: fechaConfirmacion,
        observaciones: observaciones,
        contextoIdentificacion: contextoIdentificacion,
        tipoEvento: tipoEvento,
        fechaFio: fechaFio,
        traumaCircAM: traumaCircAM,
        traumaCircPM: traumaCircPM,
        causaMuerteAM: causaMuerteAM,
        causaMuertePM: causaMuertePM,
        grupoEtnolinguisticoId: grupoEtnolinguisticoId,
        observacionesTrauma: observacionesTrauma,
        observacionesEstatura: observacionesEstatura,
      };
      const res = await axios.put(
        `${config.urlApi}/Coincidencia/Fio/${CoincidenciaId}`,
        data,
        configReq
      );

      if (res.status === 201) {
        mensajeAlerta("Actualizacion FIO", res.data.data, "success");
        oncerrarModal(false);
      }
    } catch (error) {
      if (error.response.status === 500) {
        if (error.response.data.error) {
          const dataError = error.response.data.data;
          mensajeAlerta(
            "Actualizacion Fio",
            `No se ha actualizado la victima :${dataError}`,

            "error"
          );
        } else {
          mensajeAlerta(
            "Actualizacion Fio",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Actualizacion Fio",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);

    if (catalogo === "traumaCirc") setcomboTrauma(result.data);
    if (catalogo === "causaMuerte") setcombocausaMuerte(result.data);
    if (catalogo === "grupoEtnolinguistico")
      setcombogrupoEtnolinguistico(result.data);
    if (catalogo === "genero") setcomboSexoId(result.data);
  };
  useEffect(() => {
    fetchCatalogo("traumaCirc");
    fetchCatalogo("genero");
    fetchCatalogo("causaMuerte");
    fetchCatalogo("grupoEtnolinguistico");
    getFio();
    return () => { };
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    update();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        {loading ? (
          <Col className="d-flex justify-content-center">
            <Loader></Loader>
          </Col>
        ) : (
          <Col xs="12" sm="12">
            <Card>
              <Card.Body>
                <ValidationForm
                  onSubmit={handleEdit}
                  setFocusOnError={true}
                  defaultErrorMessage={{
                    required: "El campo es requerido.",
                    minLength: "Ingresar por lo menos {minLength} caracteres",
                  }}
                >
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Victima</Form.Label>
                      <TextInput
                        type="text"
                        id="nombreVictima"
                        name="nombreVictima"
                        placeholder="Ingresar nombre de victima"
                        value={nombreVictima}
                        readonly
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Codigo AM</Form.Label>
                      <TextInput
                        type="text"
                        id="codigoAM"
                        name="codigoAM"
                        placeholder="Ingresar codigo AM"
                        value={codigoAM}
                        readonly
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Codigo PM</Form.Label>
                      <TextInput
                        type="text"
                        id="codigoPM"
                        name="codigoPM"
                        placeholder="Ingresar codigo PM"
                        value={codigoPM}
                        readonly
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Sexo AM</Form.Label>
                      <SelectGroup
                        name="sexoAM"
                        id="sexoAM"
                        value={!(sexoAM === undefined) ? sexoAM : ""}
                        onChange={(e) => {
                          setsexoAM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboSexoId === undefined)
                          ? comboSexoId.map((fbb) => (
                            <option key={fbb.generoId} value={fbb.generoId}>
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Sexo PM</Form.Label>
                      <SelectGroup
                        name="sexoPM"
                        id="sexoPM"
                        value={!(sexoPM === undefined) ? sexoPM : ""}
                        onChange={(e) => {
                          setsexoPM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboSexoId === undefined)
                          ? comboSexoId.map((fbb) => (
                            <option key={fbb.generoId} value={fbb.generoId}>
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Edad AM </Form.Label>
                      <TextInput
                        type="text"
                        id="edadAM"
                        name="edadAM"
                        placeholder="Ingresar Edad AM "
                        value={edadAM}
                        onChange={(e) => {
                          setedadAM(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Edad PM</Form.Label>
                      <TextInput
                        type="text"
                        id="edadPM"
                        name="edadPM"
                        placeholder="Ingresar Edad PM"
                        value={edadPM}
                        onChange={(e) => {
                          setedadPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Estatura AM </Form.Label>
                      <TextInput
                        type="text"
                        id="estaturaAM"
                        name="estaturaAM"
                        placeholder="Ingresar Estatura AM "
                        value={estaturaAM}
                        onChange={(e) => {
                          setestaturaAM(e.target.value);
                        }}
                      />
                    </Form.Group>



                    <Form.Group as={Col} md="4">
                      <Form.Label>Estatura PM</Form.Label>
                      <TextInput
                        type="text"
                        id="estaturaPM"
                        name="estaturaPM"
                        placeholder="Ingresar Estatura PM"
                        value={estaturaPM}
                        onChange={(e) => {
                          setestaturaPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">

                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Enfermedad AM </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="enfermedadAM"
                        name="enfermedadAM"
                        placeholder="Ingresar Enfermedad AM "
                        value={enfermedadAM}
                        onChange={(e) => setenfermedadAM(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">

                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Enfermedad PM</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="enfermedadPM"
                        name="enfermedadPM"
                        placeholder="Ingresar Enfermedad PM"
                        value={enfermedadPM}
                        onChange={(e) => {
                          setenfermedadPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Denticion AM </Form.Label>

                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="denticionAM"
                        name="denticionAM"
                        placeholder="Ingresar Enfermedad AM Inicial"
                        value={denticionAM}
                        onChange={(e) => {
                          setdenticionAM(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">

                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Denticion PM</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="denticionPM"
                        name="denticionPM"
                        placeholder="Ingresar Enfermedad PM"
                        value={denticionPM}
                        onChange={(e) => {
                          setdenticionPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Entierro AM </Form.Label>
                      <TextInput
                        type="text"
                        id="formaEntierroAM"
                        name="formaEntierroAM"
                        placeholder="Ingresar Entierro AM "
                        value={formaEntierroAM}
                        onChange={(e) => {
                          setformaEntierroAM(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <Form.Label>Entierro PM</Form.Label>
                      <TextInput
                        type="text"
                        id="formaEntierroPM"
                        name="formaEntierroPM"
                        placeholder="Ingresar Entierro PM"
                        value={formaEntierroPM}
                        onChange={(e) => {
                          setformaEntierroPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>El. Individuales AM </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="elementosIndividAM"
                        name="elementosIndividAM"
                        placeholder="Ingresar Elementos individuales AM "
                        value={elementosIndividAM}
                        onChange={(e) => {
                          setelementosIndividAM(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <Form.Label>El. Individuales PM</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="elementosIndividPM"
                        name="elementosIndividPM"
                        placeholder="Ingresar  Elementos individuales PM"
                        value={elementosIndividPM}
                        onChange={(e) => {
                          setelementosIndividPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>ADN AM </Form.Label>

                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="adnAM"
                        name="adnAM"
                        placeholder="Ingresar ADN AM "
                        value={adnAM}
                        onChange={(e) => {
                          setadnAM(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>ADN PM</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        id="adnPM"
                        name="adnPM"
                        placeholder="Ingresar  ADN PM"
                        value={adnPM}
                        onChange={(e) => {
                          setadnPM(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Nombre Entrevistado </Form.Label>
                      <TextInput
                        type="text"
                        id="nombreEntrevistado"
                        name="nombreEntrevistado"
                        placeholder="Ingresar ADN AM "
                        value={nombreEntrevistado}
                        onChange={(e) => {
                          setnombreEntrevistado(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Reconocido por</Form.Label>
                      <TextInput
                        type="text"
                        id="nombreReconocio"
                        name="nombreReconocio"
                        placeholder="Ingrese valor"
                        value={nombreReconocio}
                        onChange={(e) => {
                          setnombreReconocio(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Reconocido como</Form.Label>
                      <TextInput
                        type="text"
                        id="reconocimientoCampo"
                        name="reconocimientoCampo"
                        placeholder="Ingrese valor"
                        value={reconocimientoCampo}
                        onChange={(e) => {
                          setreconocimientoCampo(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Coincidencia </Form.Label>
                      <TextInput
                        type="text"
                        id="coincidencia"
                        name="coincidencia"
                        placeholder="Ingresar coincidencia "
                        value={coincidencia}
                        onChange={(e) => {
                          setcoincidencia(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">

                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Identificacion Final</Form.Label>
                      <TextInput
                        type="text"
                        id="identificacionFinal"
                        name="identificacionFinal"
                        placeholder="Ingrese Identificacion Final"
                        value={identificacionFinal}
                        onChange={(e) => {
                          setidentificacionFinal(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Observaciones </Form.Label>
                      <TextInput
                        type="text"
                        id="observaciones"
                        name="observaciones"
                        placeholder="Ingresar observaciones "
                        value={observaciones}
                        onChange={(e) => {
                          setobservaciones(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Contexto identificacion </Form.Label>
                      <TextInput
                        type="text"
                        id="contextoIdentificacion"
                        name="contextoIdentificacion"
                        placeholder="Ingresar contexto identificacion "
                        value={contextoIdentificacion}
                        onChange={(e) => {
                          setcontextoIdentificacion(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <Form.Label>Tipo Evento </Form.Label>
                      <TextInput
                        type="text"
                        id="tipoEvento"
                        name="tipoEvento"
                        placeholder="Ingresar tipo evento "
                        value={tipoEvento}
                        onChange={(e) => {
                          settipoEvento(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Indice Filiacion </Form.Label>
                      <TextInput
                        type="text"
                        id="indiceFiliacion"
                        name="indiceFiliacion"
                        placeholder="Ingresar Indice Filiacion "
                        value={indiceFiliacion}
                        onChange={(e) => {
                          setindiceFiliacion(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Apriori</Form.Label>
                      <TextInput
                        type="text"
                        id="apriori"
                        name="apriori"
                        placeholder="Ingrese Apriori"
                        value={apriori}
                        onChange={(e) => {
                          setapriori(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Posterior</Form.Label>
                      <TextInput
                        type="text"
                        id="posterior"
                        name="posterior"
                        placeholder="Ingrese Posterior"
                        value={posterior}
                        onChange={(e) => {
                          setposterior(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Causa Muerte AM</Form.Label>
                      <SelectGroup
                        name="causaMuerteAM"
                        id="causaMuerteAM"
                        value={
                          !(causaMuerteAM === undefined) ? causaMuerteAM : ""
                        }
                        onChange={(e) => {
                          setcausaMuerteAM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combocausaMuerte === undefined)
                          ? combocausaMuerte.map((fbb) => (
                            <option
                              key={fbb.causaMuerteId}
                              value={fbb.causaMuerteId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Causa Muerte PM</Form.Label>
                      <SelectGroup
                        name="causaMuertePM"
                        id="causaMuertePM"
                        value={
                          !(causaMuertePM === undefined) ? causaMuertePM : ""
                        }
                        onChange={(e) => {
                          setcausaMuertePM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combocausaMuerte === undefined)
                          ? combocausaMuerte.map((fbb) => (
                            <option
                              key={fbb.causaMuerteId}
                              value={fbb.causaMuerteId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                      <Form.Label>Grupo Etnolinguistico</Form.Label>
                      <SelectGroup
                        name="grupoEtnolinguisticoId"
                        id="grupoEtnolinguisticoId"
                        value={
                          !(grupoEtnolinguisticoId === undefined)
                            ? grupoEtnolinguisticoId
                            : ""
                        }
                        onChange={(e) => {
                          setgrupoEtnolinguisticoId(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(combogrupoEtnolinguistico === undefined)
                          ? combogrupoEtnolinguistico.map((fbb) => (
                            <option
                              key={fbb.grupoEtnolinguisticoId}
                              value={fbb.grupoEtnolinguisticoId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="3">
                      <Form.Label>Trauma Circ AM</Form.Label>
                      <SelectGroup
                        name="traumaCircAM"
                        id="traumaCircAM"
                        value={
                          !(traumaCircAM === undefined) ? traumaCircAM : ""
                        }
                        onChange={(e) => {
                          settraumaCircAM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboTrauma === undefined)
                          ? comboTrauma.map((fbb) => (
                            <option
                              key={fbb.traumaCircId}
                              value={fbb.traumaCircId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <Form.Label>Trauma Circ PM</Form.Label>
                      <SelectGroup
                        name="traumaCircPM"
                        id="traumaCircPM"
                        value={
                          !(traumaCircPM === undefined) ? traumaCircPM : ""
                        }
                        onChange={(e) => {
                          settraumaCircPM(e.target.value);
                        }}
                      >
                        <option key="" value="">
                          ---Seleccione una opcion---
                        </option>
                        {!(comboTrauma === undefined)
                          ? comboTrauma.map((fbb) => (
                            <option
                              key={fbb.traumaCircId}
                              value={fbb.traumaCircId}
                            >
                              {fbb.descripcion}
                            </option>
                          ))
                          : null}
                      </SelectGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <Form.Label>Trauma Ant AM</Form.Label>
                      <TextInput
                        type="text"
                        id="traumaAntAM"
                        name="traumaAntAM"
                        placeholder="Ingresar Trauma Ant AM"
                        value={traumaAntAM}
                        onChange={(e) => {
                          settraumaAntAM(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <Form.Label>Trauma Ant PM</Form.Label>
                      <TextInput
                        type="text"
                        id="traumaAntPM"
                        name="traumaAntPM"
                        placeholder="Ingresar Trauma Ant PM"
                        value={traumaAntPM}
                        onChange={(e) => {
                          settraumaAntPM(e.target.value);
                        }}
                      />

                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Observaciones Trauma </Form.Label>
                      <TextInput
                        type="text"
                        id="observacionesTrauma"
                        name="observacionesTrauma"
                        placeholder="Ingresar observaciones "
                        value={observacionesTrauma}
                        onChange={(e) => {
                          setobservacionesTrauma(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Observaciones Estatura </Form.Label>
                      <TextInput
                        type="text"
                        id="observacionesEstatura"
                        name="observacionesEstatura"
                        placeholder="Ingresar observaciones "
                        value={observacionesEstatura}
                        onChange={(e) => {
                          setobservacionesEstatura(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Col className=" d-flex justify-content-center">
                      <Button
                        key="btnSaveEditPerson"
                        name="btnSaveEditPerson"
                        type="submit"
                        variant="outline-primary"
                        size="md"
                      >
                        <i className="feather icon-save" />
                        Guardar
                      </Button>

                      <Button
                        key="btnCancelEditPerson"
                        name="btnCancelEditPerson"
                        onClick={handleCloseEdit}
                        variant="outline-danger"
                        size="md"
                      >
                        <i className="feather icon-close" />
                        Cancelar
                      </Button>
                    </Col>
                  </Form.Row>
                </ValidationForm>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default FioUpdate;
