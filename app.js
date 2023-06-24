const app = require('express')();

const http = require("http").Server(app);

const io = require("socket.io")(http,{
    cors:{
            origins:['10.200.2.40:5000'],
        },
    },
);

const port = 5000;

app.get("/",(req,res)=>{
    res.send("Hello world");
});
//everything above is boiler plater code

const registerAuthHandlers = require("./src/userNamespace/authHandlers/authHandlers");
const registerFolderHandlers = require("./src/userNamespace/folderHandlers/folderHandler");

// namespaces for target machines and users
const targetIO = io.of("/target");
const userIO = io.of("/user");


//
targetIO.on("connection",(socket)=>{
    console.log(`A target machine of id ${socket.id} has connected`);

    socket.join("sidhraj");
    
    socket.emit("testing",{type:"Inital message",message:{username:"Sidhraj Mori",phone:"9106790978"}});

    socket.on("send_user_msg",(data)=>{
        console.log(data);
    });

})

userIO.on("connection",(socket)=>{
    console.log(`A user of id ${socket.id} has connected`);

    socket.join("sidhraj");

    //emit e message asking for creadentials

    socket.emit("askcredentials",{message:"send login credentials"});

    registerAuthHandlers(io,socket);
    registerFolderHandlers(io,socket);
    
    // socket.on("loginRequest",(data)=>{
    //     const res = {success:false};
    //     if(data.username == "sidhraj" && data.password == "1234"){
    //         res.success=true;
    //     }
    //     socket.emit("loginResponse",res);
    //     if(!res.success){
    //         socket.disconnect();
    //     }
    // });

    // socket.on("iconListRequest",(data)=>{
    //     console.log(data);
    //     const response = {
    //         folders:["Music","Movies","Games"],
    //         files:["remux.py","remux.js","remux.jsx"],
    //     };
    //     socket.emit("iconListResponse",response);
    // });



    // socket.on("send_target_msg",(data)=>{
    //     if(data.to){

    //         console.log("sending to target machine");
    //         io.of("/target").to(data.to).emit("send_target_msg",data);
            
    //     }
    //     console.log(data);
    // });

    // socket.on("delete_file",(data)=>{
    //     if(data.to){
    //         console.log("sending delete file req to target");
    //         io.of("/target").to(data.to).emit("delete_file",data);
    //     }
    //     console.log(data);
    // });

    // socket.on("create_file",(data)=>{
    //     if(data.to){
    //         console.log("sending create file req to target");
    //         io.of("/target").to(data.to).emit("create_file",data);
    //     }
    //     console.log(data);
    // })

    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });

})

io.on('connection', (socket)=>{
    console.log(`A user connected ${socket.id}`);
    
    socket.emit("testing",{username:"Sidhraj Mori",phone:"9106790978"});

    // socket.emit("disconnect_self",{message:"leaving now"})

    

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(port,()=>{
    console.log(`Listening on port ${port} ...`);
});