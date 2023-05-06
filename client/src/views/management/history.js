import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actions, getState} from "store/reducers/managementReducer"
import MainCard from 'ui-component/cards/MainCard';
import DataGrid from 'ui-component/dataGrid';

const Code = ()=>{
    // Dispatch
    const dispatch = useDispatch();

    const history = useSelector(s=> getState(s).history);
    useEffect(()=>{
        // 조회 
        dispatch(actions.getAllHistories());

        return ()=>{
            dispatch(actions.initState())
        }
    },[])


    const columns = [
            { name: "SEQ", label: "번호",},
            { name: "REG_ID", label: "이름"},
            { name: "DATE", label: "날짜"},
            { name: "DESCRIPTION", label: "사용이력", filter : false, }
        ];


    return <>
        <MainCard>
            <DataGrid title="사용자이용기록" data={history} columns={columns} />
        </MainCard>
    </>;

}
export default Code;