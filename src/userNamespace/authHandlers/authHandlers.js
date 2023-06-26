module.exports = (io,socket)=>{

    const login_request = (payload)=>{
        const res = {success:false};
        if(payload.username == "sidhraj" && payload.password == "1234"){
            res.success=true;
        }
        socket.emit("loginResponse",res);
        if(!res.success){
            socket.disconnect();
        }else{ // join a room if valid credentails
            socket.join("sidhraj");
        }
    }

    const logout_request = (payload)=>{
        io.of("/target").to("sidhraj").emit("user_logout",payload);
        socket.disconnect();
    }

    const register_request = (payload)=>{
        const res = {success:false};
        if(payload.username == "sidhraj" && payload.password == "1234"){
            res.success=true;
        }
        socket.emit("registerResponse",res);
        socket.disconnect();
    }

    socket.on("login_request",login_request);
    socket.on("logout_request",logout_request);
    socket.on("register_request",register_request);
}