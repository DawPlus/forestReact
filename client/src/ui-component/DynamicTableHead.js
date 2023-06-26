import React from 'react';
import { generateMergeInfo } from "utils/utils";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function DynamicTableHead({ headerInfo }) {
    const mergeInfo = generateMergeInfo(headerInfo);
    
        const getSpanInfo = (row, col) => {
        for (let merge of mergeInfo) {
            if (merge.s.r <= row && row <= merge.e.r && merge.s.c <= col && col <= merge.e.c) {
            return {
                rowSpan: merge.e.r - merge.s.r + 1,
                colSpan: merge.e.c - merge.s.c + 1,
            };
            }
        }
        return { rowSpan: 1, colSpan: 1 };
        };
    
        const getColSpanForFirstRow = (rowIndex, colIndex) => {
        if (rowIndex !== 0 || headerInfo[0][colIndex] === '') return 1;
        let span = 1;
        while (colIndex + span < headerInfo[0].length && headerInfo[0][colIndex] === headerInfo[0][colIndex + span]) {
            span++;
        }
        return span;
        };
    
        return (
        <TableHead>
            {headerInfo.map((row, rowIndex) => (
            <TableRow key={rowIndex} >
                {row.map((cell, colIndex) => {



                if (cell === '') return null;
                const { rowSpan, colSpan: originalColSpan } = getSpanInfo(rowIndex, colIndex);
                const colSpan = rowIndex === 0 ? getColSpanForFirstRow(rowIndex, colIndex) : originalColSpan;
                if (rowIndex === 0 && colIndex > 0 && headerInfo[0][colIndex] === headerInfo[0][colIndex - 1]) return null;

                return (
                    <TableCell
                        className="table-header"
                        key={colIndex}
                        rowSpan={rowSpan}
                        colSpan={colSpan}
                        align="center"
                    >
                    {cell}
                    </TableCell>
                );
                })}
            </TableRow>
            ))}
        </TableHead>
        );
}