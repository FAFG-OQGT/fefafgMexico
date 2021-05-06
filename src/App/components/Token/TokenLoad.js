import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Form, Card, Button} from "react-bootstrap";
import userContext from "../../../context/userContext";
import config from "../../../config";
import Swal from "sweetalert2";
import axios from "axios";
import OtpInput from "react-otp-input";
import "./TokenLoad.css"

function TokenLoad({onTokenSet}) {
  const user = useContext(userContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    onTokenSet(token)
    return () => {};
  }, [token]);

  
  return (
                <OtpInput
                  value={token}
                  onChange={(e) => {
                    setToken(e);
                  }}
                  containerStyle=""
                  inputStyle="inputStyle"
                  isInputNum = {true}
                  numInputs={6}
                  separator={<span>-</span>}
                />
  );
}

export default TokenLoad;
