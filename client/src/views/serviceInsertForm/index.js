import React from "react";
import FormSelect from "./formSelect"
import MainCard from 'ui-component/cards/MainCard';

import {actions, getState} from "store/reducers/serviceInsertReducer"
import { useDispatch, useSelector } from "react-redux";
import Program from "./program"
import Service from "./service"

const ServiceInsertForm = ()=>{

    const dispatch = useDispatch();

    const {type} = useSelector(s=> getState(s))
    return (<>
            <MainCard>
                <FormSelect/>
                {{
                    "serviceInsertForm" : <Service/>,
                    "programInsertForm" : <Program/>

                }[type]
                    
                }

            </MainCard>


        </>);

}
export default ServiceInsertForm;