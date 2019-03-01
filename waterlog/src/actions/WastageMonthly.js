import {
    FETCH_WASTAGE_MONTHLY_BEGIN,
    FETCH_WASTAGE_MONTHLY_FAILURE,
    FETCH_WASTAGE_MONTHLY_SUCCESS,
    handleErrors
} from "./Types";

export const fetchhWastageMonthlyBegin = () => ({
    type: FETCH_WASTAGE_MONTHLY_BEGIN
});

export const fetchWastageMonthlySuccess = (monthlyWaste) => ({
    type: FETCH_WASTAGE_MONTHLY_SUCCESS,
    payload: { monthlyWaste },
    loading: false
});

export const fetchWastageMonthlyFailure = (error) => ({
    type: FETCH_WASTAGE_MONTHLY_FAILURE,
    payload: { error },
    loading: false
});

export const fetchWastageMonthly = () => (dispatch) => {
    dispatch(fetchhWastageMonthlyBegin())
    fetch(process.env.REACT_APP_API_URL + '/api/segmentevents/monthlywastage')
        .then(handleErrors)
        .then(res => res.json())
        .then(monthlyWaste => {
            dispatch(fetchWastageMonthlySuccess(monthlyWaste));
        })
        .catch((error) => {
            dispatch(fetchWastageMonthlyFailure(error));
        });
}; 
