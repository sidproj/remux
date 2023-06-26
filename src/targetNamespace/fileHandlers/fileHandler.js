
module.exports = (io,socket)=>{

    const get_data_from_file_response = (payload)=>{
        // send file data to user
        io.of("/user").to("sidhraj").emit("get_data_from_file_response",payload);
    }

    socket.on("get_data_from_file_response",get_data_from_file_response);
}