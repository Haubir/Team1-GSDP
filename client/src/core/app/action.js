import socketIOClient from "socket.io-client";

// let ws = {}
let socket = {}

// ws.onopen = () => {
//     ws.send("GUI client");
// }

export const appActions = {
    test: () => dispatch => {
        dispatch({
            type: "TEST_ACTION",
            payload: "result ok"
        })
    },
    connectToServer: () => dispatch => {
        // ws = new WebSocket(url.replace(/^http/, 'ws'))
        // ws.onmessage = message => {
        //     if(message.type !== "message") {
        //         console.log("message: ", message);
        //     }
        // }

        socket = socketIOClient("https://server-robot.herokuapp.com/");
        
        // socket.connected(() => { console.log("connected")})
        // socket.on("FromAPI", data => this.setState({ response: data }));
        socket.on('connect', () => {
            // console.log(socket.id); // 'G5p5...'
            socket.emit("join", {from : "user"})
        });

        socket.on("message", data => {
            console.log("msg: ", data)
            dispatch({
                type: "NEW_MESSAGE",
                payload: data.content
            })
        })
    },
    command: (textCmd) => dispatch => {
        socket.emit(textCmd, {message: textCmd});
        console.log("textCmd: ", textCmd)
    }
}