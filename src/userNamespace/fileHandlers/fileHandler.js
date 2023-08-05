const Logger = require("../../logger");

module.exports = (io,socket)=>{
    
    const get_data_from_file_request = (payload)=>{
        
        // emit an event to target to get file data

        Logger(socket.user.id,`User requesting to get data from file ${payload.path}.`);

        io.of("/target").to(socket.user.id).emit("get_data_from_file_request",payload);
    };

    const set_data_to_file_request = (payload)=>{
        
        // emit an event to target to set data of a file

        Logger(socket.user.id,`User requesting to set data to file ${payload.path}.`);

        io.of("/target").to(socket.user.id).emit("set_data_to_file_request",payload);
    }

    const non_text_file_request = (payload)=>{

        Logger(socket.user.id,`User requesting data from not text file ${payload.path}.`);

        io.of("/target").to(socket.user.id).emit("non_text_file_request",payload);
    }

    // assign function to events
    socket.on("get_data_from_file_request",get_data_from_file_request);
    socket.on("set_data_to_file_request",set_data_to_file_request);
    socket.on("non_text_file_request",non_text_file_request);
}