const subscribereducer = (state = { data: null }, action) =>
{
    switch (action.type) {
        case "POST_SUBSCRIBE":
            return { ...state, data: action?.data }
        case "FETCH_ALL_SUBSCRIBE":
            return { ...state, data: action?.payload }
        default:
            return state
    }
};
export default subscribereducer;