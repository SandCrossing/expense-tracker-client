export default (state, action) => {
    // action.type is the different actions that can be taken by our transaction
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                notLoading: false,
                transactions: action.payload
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter((transaction) => 
                transaction.id !== action.payload)
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}