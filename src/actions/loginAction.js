import * as types from '../constants/loginConstants'
import API from '../utils/fetch'
import history from '../utils/history'

const loginRequest = () => async (dispatch) => {
  try {
    const response = await API.get('/users')
    localStorage.setItem('authentication', JSON.stringify({ ...response.data }))
    dispatch({ type: types.GETALL_SUCCESS, payload: response.data })
    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await API.post('/user/login', { email, password })
    localStorage.setItem('token', data.token)
    dispatch({ type: types.LOGIN_SUCCESS })
    dispatch(loginRequest())
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err.message })
  }
}

export const register = (email, password, name) => async (dispatch) => {
  try {
    await API.post('/user/register', { email, password, name })
    dispatch({ type: types.REGISTER_SUCCESS })
    history.push('/auth/login')
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: err.message })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT })
}
