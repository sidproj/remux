
module.exports = (io,socket)=>{

    const execute_command_request = (payload)=>{
        console.log(payload);
        io.of("/target").to("sidhraj").emit("execute_command_request",payload);
        // send event to target to execute command
    }

    // assign function to events
    socket.on("execute_command_request",execute_command_request);
}