import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select  from '@mui/material/Select';

const SelectComponent = (props)=>{

    const { id, name, value, items, label, onChange, style} = props;

    return <>
        <FormControl fullWidth size="small" style={style}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select labelId={id} id={`${id}_select`} value={value} label="Age" name={name}onChange={onChange}>
                {items.map((i, idx)=> <MenuItem value={i.value} key={idx}>{i.label}</MenuItem> )}
            </Select>
        </FormControl>
    </>

}
export default SelectComponent;