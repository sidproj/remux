
module.exports = (io,socket)=>{
    
    const iconListRequest = (payload)=>{
        const response = {
            folders:["Music","Movies","Games"],
            files:["remux.py","remux.js","remux.jsx"],
        };
        // sending response to client -- temperary
        socket.emit("iconListResponse",response);

        // emit event to target machine to produce list of items in a dir
    }

    const addItemRequest = (payload)=>{
        console.log(payload);
        //emmit event to target machine to add an item;
    };

    const deleteItemRequest = (payload) =>{
        console.log(payload);
        //emit event to target machine to delete an item;
    }

    // assign function to events
    socket.on("iconListRequest",iconListRequest);
    socket.on("addItemRequest",addItemRequest);
    socket.on("deleteItemRequest",deleteItemRequest);
}