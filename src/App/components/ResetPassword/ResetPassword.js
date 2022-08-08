import React, { useState } from 'react'
import logoDark from '../../../assets/images/auth/auth-logo-dark.png'
import authLogo from "../../../assets/images/fafg2.jpeg";
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Link } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import Loader from '../Loader/Loader';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import Aux from '../../../hoc/_Aux';
export const ResetPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await callApi('resetpass', {
            method: 'POST',
            body: JSON.stringify({ email })
        });

        if (response) {
            alert_exitoso(response);
            setEmail('');
            history.replace("/auth/login");
        }
        setLoading(false);
    }
    const handleCancelar = () => {
        history.replace("/auth/login");
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    return (
        <Aux>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center text-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    {
                                        loading === true ?
                                        <Loader />
                                        : <>
                                        <h4 className="mb-3 f-w-400">Restablecer Contraseña</h4>
                                                <img src={authLogo} alt="" className="img-fluid mb-4" />
                                                <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} md="12">
                                                            <TextInput
                                                                name="email"
                                                                id="email"
                                                                required
                                                                errorMessage={{ required: "Por favor ingrese el correo electrónico registrado", type: "El correo electrónico no es válido" }}
                                                                value={email}
                                                                onChange={({ target: { value } }) => { setEmail(value) }}
                                                                placeholder="Correo electrónico registrado"
                                                                autoComplete="off"
                                                                type="email"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="6">
                                                            <button className="btn btn-block btn-danger mb-4" onClick={handleCancelar}>Cancelar</button>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="6">
                                                            <button className="btn btn-block btn-primary mb-4">Restablecer</button>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </ValidationForm>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux >
    )
}
