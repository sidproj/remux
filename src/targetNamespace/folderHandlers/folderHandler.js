const Logger = require("../../logger");

module.exports = (io,socket)=>{

    const load_desktop_response = (payload)=>{
        
        console.log("target responded with desktop items");
        console.log(payload.data.FILES);

        Logger(socket.user.id,`Target responding to desktop request.`);

        io.of("/user").to(socket.user.id).emit("load_desktop_response",payload);
    }

    const load_dir_response = (payload)=>{

        console.log(`target responded with ${payload.path} items`);
        console.log(payload);

        Logger(socket.user.id,`Target responding to file data request of file ${payload.path}.`);

        io.of("/user").to(socket.user.id).emit("load_dir_response",payload);

    }

    const properties_of_path_response = (payload)=>{
        console.log(`target responded with properties for ${payload.path}`);

        Logger(socket.user.id,`Target responding to file properties request of file ${payload.path}.`);
        
        io.of("/user").to(socket.user.id).emit("properties_of_path_response",payload);
        
    }

    socket.on("load_desktop_response",load_desktop_response);
    socket.on("load_dir_response",load_dir_response);
    socket.on("properties_of_path_response",properties_of_path_response);
}