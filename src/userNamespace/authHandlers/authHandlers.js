module.exports = (io,socket)=>{

    const loginRequest = (payload)=>{
        const res = {success:false};
        if(payload.username == "sidhraj" && payload.password == "1234"){
            res.success=true;
        }
        socket.emit("loginResponse",res);
        if(!res.success){
            socket.disconnect();
        }
    }

    const registerRequest = (payload)=>{
        const res = {success:false};
        if(payload.username == "sidhraj" && payload.password == "1234"){
            res.success=true;
        }
        socket.emit("registerResponse",res);
        socket.disconnect();
    }

    socket.on("loginRequest",loginRequest);
    socket.on("registerRequest",registerRequest);
}