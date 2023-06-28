import React from "react";

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import TableBody from '@mui/material/TableBody';


import DynamicField from "./dynamicField";
import { memo } from "react";

const DynamicTableRow = ({ rows, fields, onCheckChange, onChange }) => {
  return (
    <TableBody style={{minHeight:"500px"}}>
        {rows.map((row, idx) => 
          <TableRow key={row.id}>
            {idx > 0 ? (
              <TableCell style={{ textAlign: "center" }}>
                <Checkbox checked={row.chk} value="" name="chk" onChange={onCheckChange(idx)} />
              </TableCell>
            ) :    
            <TableCell style={{ textAlign: "center" }}></TableCell>}
            {fields.map((field) => (
              <DynamicField
                key={field.name}
                type={field.type}
                label={field.label}
                name={field.name}
                onChange={onChange}
                value={row[field.name]}
                idx={idx}
              />
            ))}
          </TableRow>
      )}
    </TableBody>
  );
};
export default memo(DynamicTableRow);