module.exports = (io,socket)=>{

    const login_request = (payload)=>{
        const res = {success : false};
        if(payload.username == "sidhraj" && payload.password == "1234"){
            res.success = true;
        }
        socket.emit("login_response",res);
        if(!res.success){
            socket.disconnect();
        }else{
            socket.join("sidhraj");
        }
    }

    const logout_request = (payload) => {

        //  emit event to user that target is logging out,
        io.of("/user").to("sidhraj").emit("target_logout",payload);
        socket.disconnect();
    }

    socket.on("login_request",login_request);
    socket.on("logout_request",logout_request);

}