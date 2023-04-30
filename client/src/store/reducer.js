import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import commonReducer from  "./commonReducer"
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    common : commonReducer,
    customization: customizationReducer
});

export default reducer;
