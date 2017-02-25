import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, help, error, ...props }) => {
  const validationState = error ? 'error' : null;
  help = error;

  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
};

export default FieldGroup;
