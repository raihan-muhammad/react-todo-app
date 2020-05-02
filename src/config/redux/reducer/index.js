const initialState = {
    isLoading: false,
    isError: '',
    isLogin: false,
    task: []
}

const reducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_ISLOADING') {
        return {
            ...state,
            isLoading: action.value
        }
    }
    if (action.type === 'ERROR_MESSAGE') {
        return {
            ...state,
            isError: action.value
        }
    }
    if (action.type === 'CHANGE_LOGIN') {
        return {
            ...state,
            isLogin: action.value
        }
    }
    if (action.type === 'GET_TASK') {
        return {
            ...state,
            task: action.value
        }
    }
    return state
}

export default reducer;

