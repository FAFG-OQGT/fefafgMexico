import validator from "validator";
import React from "react";
import {InputGroup} from "react-bootstrap";

import {TextInputGroup} from "react-bootstrap4-form-validation";
import moment from "moment";

const renderInputFecha = (props, openCalendar, closeCalendar) => {
  function clear() {
    props.onChange({target: {value: ""}});
  }
  const fechaValida = (value) => {
    if (value === "" || value === undefined || value === null) return true;

    if (value && value.length === 10) {
      return moment(value, "DD/MM/YYYY").isBefore(moment());
    } else {
      return false;
    }
  };
  return (
    <div>
      <TextInputGroup
        type="text"
        required={props.requerido ? props.requerido : false}
        validator={fechaValida}
        errorMessage={{validator: "Ingrese una fecha valida."}}
        {...props}
        append={
          <InputGroup.Append>
            <InputGroup.Text onClick={openCalendar} style={{cursor: "pointer"}}>
              <i className="fa fa-calendar text-primary" />
            </InputGroup.Text>
            <InputGroup.Text onClick={clear} style={{cursor: "pointer"}}>
              <i className="fa fa-times text-danger" />
            </InputGroup.Text>
          </InputGroup.Append>
        }
      />
    </div>
  );
};

const validDate = (current) => {
  return current.isBefore(moment());
};
export {renderInputFecha, validDate};
