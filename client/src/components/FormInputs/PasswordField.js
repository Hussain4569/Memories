import React, { useState } from 'react'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import {PropaneSharp, Visibility, VisibilityOff } from '@mui/icons-material/';

const PasswordField = (props) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        props.onChange(event);
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

  return (
    <FormControl sx={{ margin: "10px 25px 0" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">{props.label}</InputLabel>
          <OutlinedInput
            fullWidth
            id="filled-adornment-password"
            name={props.name}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
    </FormControl>
  )
}

export default PasswordField