import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectForm({label, options,value,name,onChange,onBlur}) {
  const id = `select-${name}`;

  return (
      <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          label={label}
          value = {value}
          name = {name}
          onChange = {onChange}
          onBlur={onBlur}
        >

          {
            options.map((option) =>(
                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            ))
          }
          
        </Select>
      </FormControl>
  );
}