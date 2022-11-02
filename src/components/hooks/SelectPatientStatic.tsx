import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('10');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box >
      <FormControl sx={{minWidth:"40%"}}>
        <InputLabel id="demo-simple-select-label">Select Patient</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Hospital"
          onChange={handleChange}
        >
          <MenuItem value={10}>Patient1</MenuItem>
          <MenuItem value={20}>Patient2</MenuItem>
          <MenuItem value={30}>Patient3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}