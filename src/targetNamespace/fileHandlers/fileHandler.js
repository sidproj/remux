const Logger = require("../../logger");

module.exports = (io,socket)=>{

    const get_data_from_file_response = (payload)=>{
        // send file data to user

        Logger(socket.user.id,`Target responding to file data request of file ${payload.data.path}.`);

        io.of("/user").to(socket.user.id).emit("get_data_from_file_response",payload);
    }

    const non_text_file_response = (payload)=>{
        
        Logger(socket.user.id,`Target responding to non text file request of file ${payload.path}.`);

        io.of("/user").to(socket.user.id).emit("non_text_file_response",payload);
    }

    socket.on("get_data_from_file_response",get_data_from_file_response);
    socket.on("non_text_file_response",non_text_file_response);
}