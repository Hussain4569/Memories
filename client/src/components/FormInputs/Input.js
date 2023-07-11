import React from 'react'
import { TextField, Grid} from '@mui/material'

const Input = ({half, name, onChange, label, autoFocus, type}) => {

    const normal = {margin: "0 10px", paddingTop: '10px'};
    const fName = {margin: "0 5px 0 0", paddingTop: '10px'};
    const lName = {margin: "0 0 0 5px", paddingTop: '10px'};
  return (
    <Grid item xs={12} sm={half ? 6 : 12} sx={name!=="firstName" && name!=="lastName" ? normal :
        name === "fistName" ? fName : lName}>

        <TextField
          name={name}
          onChange={onChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          autoFocus
          type={type}
        />

    </Grid>
  )
}

export default Input;

// endAdornment={
//     <InputAdornment position="end">
//       <IconButton
//         aria-label="toggle password visibility"
//         onClick={handleClickShowPassword}
//         onMouseDown={handleMouseDownPassword}
//         edge="end"
//       >
//         {values.showPassword ? <VisibilityOff /> : <Visibility />}
//       </IconButton>
//     </InputAdornment>
//   }