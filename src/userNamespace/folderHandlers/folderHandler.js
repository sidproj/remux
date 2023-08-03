
module.exports = (io,socket)=>{
    
    /*
    schema for request payload of the function below:-
    {
        path:""
    } 
    */

    const load_desktop_request = (payload)=>{
        console.log("user requested for desktop items");
        io.of("/target").to(socket.user.id).emit("load_desktop_request",payload);
    }

    const load_dir_request = (payload)=>{

        console.log(`user requested for ${payload.path} items`);
        // emit event to target machine to produce list of items in a dir
        io.of("/target").to(socket.user.id).emit("load_dir_request",payload);
    }

    /*
    schema for request payload of the function below:-
    {
        path:"path",
        isFile:boolean,
        name:"name"
    }
    schema for response payload of the function below:-
    */
    const add_item_to_path_request = (payload)=>{

        console.log(payload);

        // emit event to target machine to produce list of items in a dir
        io.of("/target").to(socket.user.id).emit("add_item_to_path_request",payload);
    };

    const rename_item_request = (payload)=>{
        console.log(payload);

        io.of("/target").to(socket.user.id).emit("rename_item_request",payload);
    }

    const remove_item_from_path_request = (payload) =>{
        
        console.log(`user requested to remove ${payload.path}`);
        
        // emit event to target machine to produce list of items in a dir
        io.of("/target").to(socket.user.id).emit("remove_item_from_path_request",payload);
    }

    const properties_of_path_request = (payload)=>{
        console.log(payload);

        io.of("/target").to(socket.user.id).emit("properties_of_path_request",payload)
    }

    // assign function to events
    socket.on("load_desktop_request",load_desktop_request);
    socket.on("load_dir_request",load_dir_request);
    socket.on("add_item_to_path_request",add_item_to_path_request);
    socket.on("rename_item_request",rename_item_request);
    socket.on("remove_item_from_path_request",remove_item_from_path_request);
    socket.on("properties_of_path_request",properties_of_path_request);
}