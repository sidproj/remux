const User = require("../../models/user");

module.exports = (io,socket)=>{

    const login_request = async(payload)=>{

        console.log(payload);

        try{

            const email = payload.email;
            const password = payload.password;

            const user = await User.login(email,password);
            socket.user = user;

            socket.join(socket.user.id);
            
            socket.emit("loginResponse",{success:true});

        }catch(error){
            console.log(error);
            socket.emit("loginResponse",{success:false,message:error.message});
            socket.disconnect();
        }
    }

    const logout_request = (payload) => {

        //  emit event to user that target is logging out,
        io.of("/user").to(socket.user.id).emit("target_logout",payload);
        socket.disconnect();
    }

    socket.on("login_request",login_request);
    socket.on("logout_request",logout_request);

}