import React, { useMemo } from 'react';
import { FormControl, OutlinedInput, InputLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const PositiveNumberInput = ({ label, value, onChange,name,  ...props }) => {
  const id = useMemo(() => uuidv4(), []);

  const handleChange = (event) => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9.]/g, '');

    if (numericValue === '') {
      onChange(name, '');
    } else {
      onChange(name, parseFloat(numericValue));
    }
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...props}
        type="text"
        value={value}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default PositiveNumberInput;
