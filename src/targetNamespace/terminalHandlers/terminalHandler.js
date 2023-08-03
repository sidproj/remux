module.exports = (io,socket)=>{
    const execute_command_response = (payload)=>{
        console.log(payload);
        // send event user for response of the command
        io.of("/user").to(socket.user.id).emit("execute_command_response",payload);

    }

    socket.on("execute_command_response",execute_command_response);
}