import React, {useState} from "react";
import {Alert, Modal, Row, Col, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import OtpInput from "react-otp-input";

import "../../App/components/Token/TokenField.css";

import authLogo from "../../assets/images/fafg2.jpeg";
import authLogoDark from "../../assets/images/fafg2movil.jpeg";

import config from "../../config";
const userLogged = {
  username: "",
  nombre: "",
  token: null,
};
function Login(props) {
  const [username, setUserName] = useState();

  const [password, setPassword] = useState();

  const [token, setToken] = useState();

  const [showError, setshowError] = useState("");

  const [varianteMensaje, setvarianteMensaje] = useState("");

  const [showToken, setshowToken] = useState(false);

  const user = JSON.parse(localStorage.getItem("userLogged"));

  if (!(user === null)) {
    if (!(user.token == null)) {
      return <Redirect push to="/home" />;
    }
  }
  const handleSubmitLogin = (e) => {
    setshowError("");
    e.preventDefault();

    if (!showToken) {
      if (
        (username === undefined && password === undefined) ||
        (username === "" && password === "")
      ) {
        setvarianteMensaje("danger");
        setshowError("Ingrese valores de usuario y contraseña");
        return;
      }
      fetch(`${config.urlApi}/auth/loginFirst`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          password: password,
        }),
      })
        .then((response) =>
          Promise.all([response.ok, response.json(), response.status])
        )
        .then(([responseOk, body, status]) => {
          if (responseOk) {
            setvarianteMensaje("success");
            setshowError(body.data);
            setshowToken(true);
          } else {
            setvarianteMensaje("danger");
            setshowError(body.data);
          }
        })
        .catch((err) => {
          setvarianteMensaje("danger");
          setshowError(
            "Error con la comunicacion, comuniquese con el administrador."
          );
        });
    } else {
      fetch(`${config.urlApi}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          token: token,
        }),
      })
        .then((response) =>
          Promise.all([response.ok, response.json(), response.status])
        )
        .then(([responseOk, body, status]) => {
          if (responseOk) {
            userLogged.username = body.data.usuario;
            userLogged.nombre = body.data.nombre;
            userLogged.token = body.data.token;
            userLogged.menu = body.data.items;
            userLogged.usuarioId = body.data.usuarioId;
            setshowToken(false);
            localStorage.setItem("userLogged", JSON.stringify(userLogged));
            props.history.push("/home");
          } else {
            setvarianteMensaje("danger");
            setshowError(body.data);
          }
        })
        .catch((err) => {
          setvarianteMensaje("danger");
          setshowError(
            "Error con la comunicacion, comuniquese con el administrador."
          );
        });
    }
  };

  return (
    <Aux>
      <form onSubmit={handleSubmitLogin}>
        <div className="auth-wrapper align-items-stretch aut-bg-img">
          <div className="flex-grow-1">
            <div className="h-100 d-md-flex align-items-center auth-side-img">
              <div className="col-sm-12 auth-content w-auto justify-content-center auth-side-center-img">
                <center>
                  <img
                    src={authLogo}
                    alt=""
                    className="img-fluid"
                    width="35%"
                  />
                </center>
                <h1 className="text-white my-4 text-center title-auth">
                  Sistema DID CRIH - Coahuila
                </h1>
              </div>
            </div>

            <div className="auth-side-form">
              <div className=" auth-content">
                <center>
                  <img
                    src={authLogoDark}
                    alt=""
                    className="img-fluid mb-4 d-block d-xl-none d-lg-none"
                  />
                </center>
                <h3 className="mb-4 f-w-400 text-center ">Inicia sesión</h3>

                {!showToken ? (
                  <div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Usuario"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <OtpInput
                      value={token}
                      onChange={(e) => {
                        setToken(e);
                      }}
                      containerStyle=""
                      inputStyle="inputStyleFafg"
                      isInputNum={true}
                      numInputs={6}
                    />
                  </div>
                )}

                <div className="form-group text-left mt-2"></div>
                <button className="btn btn-block btn-primary mb-0">
                  {!showToken ? "Ingresar" : "Enviar"}
                </button>

                {showError.length > 0 ? (
                  <Alert variant={varianteMensaje}>{showError}</Alert>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Aux>
  );
}

export default connect(null, {userLogged})(Login);
