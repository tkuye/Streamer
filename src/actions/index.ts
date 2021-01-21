import {SIGN_IN, SIGN_OUT, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAM, FETCH_STREAMS} from './types'
import streams from '../apis/streams'
import { AxiosResponse } from 'axios'
import history from '../history'

export interface sign {
    type: string;
    payload: string | object | number

}

interface axiosData {
    data:object
}
export const signIn = (userID: string) => {
    const In:Partial<sign> = {
        type:SIGN_IN,
        payload:userID

    }
    return In
}

export const signOut = () => {
    const Out:Partial<sign> = {
        type:SIGN_OUT,

    }
    return Out
}

export const createStream = (formValues:object) => {
    return async (dispatch:any, getState:any) => {
        
        const {userID} = getState().auth
        const response:AxiosResponse<axiosData> = await streams.post('/streams', {...formValues, userID})
        
        dispatch({type:CREATE_STREAM, payload:response.data})
        history.push('/')
    }}

export const fetchStreams = () => async (dispatch:(arg0:sign) => void) => {
    const response:AxiosResponse<axiosData> = await streams.get('/streams');

    dispatch({type:FETCH_STREAMS, payload:response.data})
}

export const fetchStream = (id:number) => async (dispatch:(arg0:sign) => void) => {
    const response:AxiosResponse<axiosData> = await streams.get(`/streams/${id}`);

    dispatch({type:FETCH_STREAM, payload:response.data})
}

export const editStream = (id: number, formValues:any) => async (dispatch:(arg0:sign) => void) => {
    const response:AxiosResponse<axiosData> = await streams.patch(`/streams/${id}`, formValues);

    dispatch({type:EDIT_STREAM, payload:response.data})
    history.push('/')
}

export const deleteStream = (id: number) => async (dispatch:(arg0:sign) => void) => {
    await streams.delete(`/streams/${id}`);

    dispatch({type:DELETE_STREAM, payload:id})
    history.push('/')
}

