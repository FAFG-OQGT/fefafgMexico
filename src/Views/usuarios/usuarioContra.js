import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Card from "../../App/components/MainCard";
import CambioContrasena from "../../App/components/usuarios/cambioContrasena";
import userContext from "../../context/userContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import MensajeAlerta from "../../App/components/MensajeAlerta/MensajeAlerta";
import Aux from "../../hoc/_Aux/index";
import {apiFetchAccesoXObjeto} from "../../utils/fetchCatalogos";

function UserPassView(props) {
  const sweetConfirmHandler = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Su contraseña ha cambiado!",
      text: "Inicie sesión nuevamente.",
      type: "success",
      showCloseButton: true
    }).then(() => {
      sessionStorage.removeItem("userLogged");
      props.history.push("/auth/login");
    });
  };

  const [accesos, setAccesos] = useState({
    actualizar: false
  });

  const user = useContext(userContext);
  const fetchAccesos = async () => {
    var data = await apiFetchAccesoXObjeto(user.token, user.usuarioId, 5);

    var Raccesos = data[0];
    setAccesos(Raccesos.accesos);
  };

  const [onCambioCon, setoncambioCon] = useState(false);

  const onCambioConDone = (val) => setoncambioCon(val);

  const onCerrarModalCambio = () => {
    return false;
  };
  useEffect(() => {
    fetchAccesos();
    return () => {};
  }, []);
  useEffect(() => {
    if (onCambioCon) {
      sweetConfirmHandler();
      /*
       */
    }
  }, [onCambioCon]);
  return (
    <Aux>
      <Row>
        <Col>
          <Card title={`Bienvenido ${user.username}`} isOption>
            <Col xl={12}>
              <Row>
                <Col>
                  <CambioContrasena
                    usuario={{usuarioId: user.usuarioId}}
                    onCambioConDone={onCambioConDone}
                    onCerrarModalCambio={onCerrarModalCambio}
                    mensajeAlerta={MensajeAlerta}
                    actualizar={accesos.actualizar}
                  />
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
}

export default UserPassView;
