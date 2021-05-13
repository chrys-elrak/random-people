import React, { createContext, useReducer, useEffect } from "react";
import {io} from "socket.io-client";

import Reducer from './Reducer'

const initialState = {
    socket: null,
    room: '',
    isLoading: false,
    isConnected: true
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
        const socket = io("ws://localhost:5000");
        dispatch({type: 'SET_SOCKET', payload: socket});
        return () => {
        }
    }, []);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;