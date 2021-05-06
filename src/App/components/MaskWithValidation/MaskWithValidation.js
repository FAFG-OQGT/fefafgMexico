import React from "react";
import MaskedInput from "react-text-mask";

import {
   
    BaseFormControl,
  } from "react-bootstrap4-form-validation";
class MaskWithValidation extends BaseFormControl {
    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }
  
    getInputRef() {
      return this.inputRef.current.inputElement;
    }
  
    handleChange = (e) => {
      this.checkError();
      if (this.props.onChange) this.props.onChange(e);
    };
  
    render() {
      return (
        <React.Fragment>
          <MaskedInput
            ref={this.inputRef}
            {...this.filterProps()}
            onChange={this.handleChange}
          />
          {this.displayErrorMessage()}
          {this.displaySuccessMessage()}
        </React.Fragment>
      );
    }
  }

  export default MaskWithValidation;