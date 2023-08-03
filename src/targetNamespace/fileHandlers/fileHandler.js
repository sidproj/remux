
module.exports = (io,socket)=>{

    const get_data_from_file_response = (payload)=>{
        // send file data to user
        io.of("/user").to(socket.user.id).emit("get_data_from_file_response",payload);
    }

    const non_text_file_response = (payload)=>{
        console.log("send non text file data to user");
        io.of("/user").to(socket.user.id).emit("non_text_file_response",payload);
    }

    socket.on("get_data_from_file_response",get_data_from_file_response);
    socket.on("non_text_file_response",non_text_file_response);
}