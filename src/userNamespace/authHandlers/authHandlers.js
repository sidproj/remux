const  User = require("../../models/user");
const Logger = require("../../logger");

module.exports = (io,socket)=>{

    const login_request = async (payload)=>{

        console.log(payload);
        try{
            const email = payload.email;
            const password = payload.password;

            const user = await User.login(email,password);

            Logger(user.id,"User logged in from browser.");

            socket.user  = user;

            socket.join(socket.user.id);
            socket.emit("loginResponse",{success:true});
        }catch(error){
            console.log(error.message);
            socket.emit("loginResponse",{success:false,message:error.message});
            socket.disconnect();
        }

    }

    const logout_request = (payload)=>{
        console.log("User disconnecting...");

        Logger(socket.user.id,"User logged out from browser.");

        io.of("/target").to(socket.user.id).emit("logout_request",payload);
        socket.disconnect();
    }

    socket.on("login_request",login_request);
    socket.on("logout_request",logout_request);
}