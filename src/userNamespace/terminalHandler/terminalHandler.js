const Logger = require("../../logger");

module.exports = (io,socket)=>{

    const execute_command_request = (payload)=>{

        Logger(socket.user.id,`User requesting to execute command ${payload.command}.`);

        io.of("/target").to(socket.user.id).emit("execute_command_request",payload);
        // send event to target to execute command
    }

    // assign function to events
    socket.on("execute_command_request",execute_command_request);
}