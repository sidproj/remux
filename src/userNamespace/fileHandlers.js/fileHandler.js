
module.exports = (io,socket)=>{
    
    const getFileData = (payload)=>{
        console.log(payload);
        // emit an event to target to get file data
    };

    const setFileData = (payload)=>{
        console.log(payload);
        // emit an event to target to set data of a file
    }

   

    // assign function to events
    socket.on("getFileData",getFileData);
    socket.on("setFileData",setFileData);
}