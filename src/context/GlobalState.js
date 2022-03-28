import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import res from 'express/lib/response';

// Initial state
const initialState = {
    transactions: [],
    error: null,
    notLoading: true
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
        try {
            const response = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch(error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    } 

    function deleteTransaction(id) {
        dispatch({ 
            type: 'DELETE_TRANSACTION',
            payload: id,
        });
    }

    function addTransaction(transaction) {
        dispatch({ 
            type: 'ADD_TRANSACTION',
            payload: transaction,
        });
    }

    // Returning the provider, which has wrapped the children prop (which are our components in app.js)
    return (<GlobalContext.Provider value={{
        // Using this, the transactions can be accessed from any component in our children prop that would request it
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
    }}>
        {children}
    </GlobalContext.Provider>);
};