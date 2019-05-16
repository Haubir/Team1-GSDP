import Immutable from 'seamless-immutable'

const initialState = Immutable({
    message: "",
    status: false
})

export const appReducer = ( state = initialState, action) => {
    switch(action.type) {

        case "TEST_ACTION":
            return state.set('message', action.payload)
        
        default:
            return state
    }
}