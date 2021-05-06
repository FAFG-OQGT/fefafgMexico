import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Button, Modal} from "react-bootstrap";
import Card from "../../App/components/MainCard";
import CambioContrasena from "../../App/components/usuarios/cambioContrasena";
import userContext from "../../context/userContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

 import MensajeAlerta from "../../App/components/MensajeAlerta/MensajeAlerta"
import Aux from "../../hoc/_Aux/index";
 
function UserPassView(props) {
  const sweetConfirmHandler = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Su contraseña ha cambiado!",
      text: "Inicie sesión nuevamente.",
      type: "success",
      showCloseButton: true,
    }).then(() => {
      localStorage.removeItem("userLogged");
      props.history.push("/auth/login");
    });
  };

  const user = useContext(userContext);
  const [onCambioCon, setoncambioCon] = useState(false);

  const onCambioConDone = (val) => setoncambioCon(val);

  const onCerrarModalCambio = () => {
    return false;
  };

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
          <Card title={`Bienvenido ${user.nombre}`} isOption>
            <Col xl={12}>
              <Row>
                <Col>
                  <CambioContrasena
                    usuario={{usuarioId: user.usuarioId}}
                    onCambioConDone={onCambioConDone}
                    onCerrarModalCambio={onCerrarModalCambio}
                    mensajeAlerta={MensajeAlerta}
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
