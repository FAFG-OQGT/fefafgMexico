import React, {useEffect, useState, useContext} from "react";
import {Button, Form, Row, Col} from "react-bootstrap";
import userContext from "../../../../context/userContext";
import config from "../../../../config";
import axios from "axios";
import validator from "validator";
import {
  ValidationForm,
  TextInput,
  SelectGroup,
} from "react-bootstrap4-form-validation";
import {apiCatalogo} from "../../../../utils/fetchCatalogos";

function DonantesListEdit({
  CoincidenciaId,
  DonanteCoincidencia,
  onEditDone,
  mensajeAlerta,
}) {
  const [combodonante, setcombodonante] = useState();
  const [donanteId, setdonanteId] = useState(0);
  const [cantidadDonantes, setcantidadDonantes] = useState(0);

  const [EditcantidadDonantes, setEditcantidadDonantes] = useState(0);
  const [EditDonanteId, setEditDonanteId] = useState(0);

  const [data, setData] = useState(0);

  useEffect(() => {
    setData(DonanteCoincidencia);
    fetchCatalogo("donante");

    return () => {};
  }, []);
  const user = useContext(userContext);
  const configReq = {
    headers: {Authorization: `Bearer ${user.token}`},
  };
  const update = async () => {
    try {
      var data = {
        cantidadDonantes: EditcantidadDonantes,
      };
      const res = await axios.put(
        `${config.urlApi}/Coincidencia/donante/${EditDonanteId}`,
        data,
        configReq
      );

      if (res.status === 201) {
        mensajeAlerta(
          "Actualizacion donante",
          "Se ha actualizado el donante con id [" + EditDonanteId + "]",
          "success"
        );
        onEditDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          mensajeAlerta(
            "Actualizacion del donante",
            `Se ha actualizado el donante :[${data.personaId}]`,

            "error"
          );
        } else {
          mensajeAlerta(
            "Actualizacion del dontante",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Actualizacion del donante",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };
  const onUpdateSet = (id, value) => {
    try {
      setEditDonanteId(id);
      setEditcantidadDonantes(parseInt(value));
    } catch {
      setEditDonanteId(0);
      setEditcantidadDonantes(parseInt(0));
    }
  };

  const onUpdate = (id) => {
    if (id === EditDonanteId) {
      if (EditcantidadDonantes >= 0) update();
      else {
        mensajeAlerta(
          "Creacion de donante",
          `No se edito el donante, seleccione cantidad mayor o igual a 0.`,
          "error"
        );
      }
    } else {
    }
  };
  function donanteExistente(elemento) {
    var array = [];
    DonanteCoincidencia.map(function (item) {
      return array.push(item.donanteId);
    });
    var n = array.includes(elemento.donanteId);
    return !n;
  }

  const fetchCatalogo = async (catalogo) => {
    const result = await apiCatalogo(catalogo, user.token);
    var filtered = result.data.filter(donanteExistente);
    if (catalogo === "donante") {
      setcombodonante(filtered);
    }
  };
  const createDonante = async (pDonanteId, pCantidadDonantes) => {
    try {
      var data = {
        coincidenciaId: CoincidenciaId,
        donanteId: pDonanteId,
        cantidadDonantes: pCantidadDonantes,
        estadoId: 1,
        usuarioIngresoId: user.usuarioId,
      };
      const res = await axios.post(
        `${config.urlApi}/coincidencia/donante`,
        data,
        configReq
      );
      if (res.status === 202) {
        mensajeAlerta(
          "Creacion Donante",
          `Se ha creado el  donante correctamente`,
          "success"
        );
        onEditDone(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.error) {
          const dataError = error.response.data;
          mensajeAlerta(
            "Creacion de donante",
            `[${dataError.codigo}] - ${dataError.data}`,
            "error"
          );
        } else {
          mensajeAlerta(
            "Creacion de donante",
            `[${error.response.status}] - ${error.response.statusText}`,
            "error"
          );
        }
      } else {
        mensajeAlerta(
          "Creacion de donante",
          `[${error.response.status}] - ${error.response.statusText}`,
          "error"
        );
      }
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (cantidadDonantes > 0)
      createDonante(parseInt(donanteId), parseInt(cantidadDonantes));
    else
      mensajeAlerta(
        "Creacion de donante",
        `No se creo el donante, seleccione parentezco o ingrese valor valido en cantidades.`,
        "error"
      );
  };

  return (
    <div>
      <Row xs="12">
        <ValidationForm onSubmit={handleAdd}>
          <Col>
            <table>
              <thead>
                <tr>
                  <td>Parentesco</td>
                  <td>Cantidad</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <SelectGroup
                      name="donanteId"
                      id="donanteId"
                      required
                      value={!(donanteId === undefined) ? donanteId : ""}
                      onChange={(e) => {
                        setdonanteId(e.target.value);
                      }}
                    >
                      <option key="" value="">
                        ---Seleccione una opcion---
                      </option>
                      {!(combodonante === undefined)
                        ? combodonante.map((fbb) => (
                            <option key={fbb.donanteId} value={fbb.donanteId}>
                              {fbb.descripcion}
                            </option>
                          ))
                        : null}
                    </SelectGroup>
                  </td>
                  <td>
                    {" "}
                    <TextInput
                      type="number"
                      id="cantidadDonantes"
                      className="form-control text-center"
                      validator={(val) => (val > 0 ? true : false)}
                      errorMessage={{
                        validator: "Ingrese una cantidad mayor a 0.",
                      }}
                      name="cantidadDonantes"
                      placeholder="Ingresar codigo de victima"
                      value={cantidadDonantes}
                      onChange={(e) => {
                        setcantidadDonantes(e.target.value);
                      }}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              type="submit"
              key="btnCancelEditPerson"
              name="btnCancelEditPerson"
              variant="outline-primary"
              size="sm"
            >
              Agregar
            </Button>
          </Col>
        </ValidationForm>
        <br></br>
      </Row>

      <Row>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <td>Parentesco</td>
              <td>Cantidad</td>
              <td>-</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((fbb) => (
                <tr key={fbb.donanteCoincidenciaId}>
                  <td>{fbb.Donante.descripcion}</td>
                  <td>
                    <Form.Control
                      type="number"
                      className="text-center"
                      defaultValue={fbb.cantidadDonantes}
                      onChange={(e) =>
                        onUpdateSet(fbb.donanteCoincidenciaId, e.target.value)
                      }
                    ></Form.Control>
                  </td>
                  <td>
                    <Button
                      className="btn btn-sm"
                      onClick={() => onUpdate(fbb.donanteCoincidenciaId)}
                    >
                      <i className="feather icon-save" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </Row>
    </div>
  );
}

export default DonantesListEdit;
