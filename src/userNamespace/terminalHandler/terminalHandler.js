
module.exports = (io,socket)=>{

    const executeCommand = (payload)=>{
        console.log(payload);
        // send event to target to execute command
    }

    // assign function to events
    socket.on("executeCommand",executeCommand);
}