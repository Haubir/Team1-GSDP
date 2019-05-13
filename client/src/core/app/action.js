let ws = {}

ws.onopen = () => {
    ws.send("GUI client");
}

export const appActions = {
    test: () => dispatch => {
        dispatch({
            type: "TEST_ACTION",
            payload: "result ok"
        })
    },
    connectToServer: (url) => dispatch => {
        ws = new WebSocket(url.replace(/^http/, 'ws'))
        ws.onmessage = message => {
            if(message.type !== "message") {
                console.log("message: ", message);
            }
        }
    },
    command: (textCmd) => dispatch => {
        ws.send(textCmd);
    }
}