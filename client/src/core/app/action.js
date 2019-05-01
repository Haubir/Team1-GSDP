export const appActions = {
    test: () => dispatch => {
        dispatch({
            type: "TEST_ACTION",
            payload: "result ok"
        })
    }
}