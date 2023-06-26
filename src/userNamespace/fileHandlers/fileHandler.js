
module.exports = (io,socket)=>{
    
    const get_data_from_file_request = (payload)=>{
        
        // emit an event to target to get file data
        io.of("/target").to("sidhraj").emit("get_data_from_file_request",payload);
    };

    const set_data_to_file_request = (payload)=>{
        
        // emit an event to target to set data of a file
        io.of("/target").to("sidhraj").emit("set_data_to_file_request",payload);
    }

    // assign function to events
    socket.on("get_data_from_file_request",get_data_from_file_request);
    socket.on("set_data_to_file_request",set_data_to_file_request);
}