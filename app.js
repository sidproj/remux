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
//everything above is boiler plate code

// user handlers
const registerUserAuthHandlers = require("./src/userNamespace/authHandlers/authHandlers");
const registerUserFolderHandlers = require("./src/userNamespace/folderHandlers/folderHandler");
const regusterUserFileHandlers = require("./src/userNamespace/fileHandlers/fileHandler");
const registerUserTerminalHandlers = require("./src/userNamespace/terminalHandler/terminalHandler");

// terget mamchine handlers
const registerTargetAuthHandlers = require("./src/targetNamespace/authHandlers/authHandler");
const registerTargetFolderHandlers = require("./src/targetNamespace/folderHandlers/folderHandler");
const registerTargetFileHandlers = require("./src/targetNamespace/fileHandlers/fileHandler");
const registerTargetTreminalHandlers = require("./src/targetNamespace/terminalHandlers/terminalHandler");

// namespaces for target machines and users
const targetIO = io.of("/target");
const userIO = io.of("/user");


// handlers and emiters for target
targetIO.on("connection",(socket)=>{
    console.log(`A target machine of id ${socket.id} has connected`);

    
    socket.emit("ask_credentials",{message:"send login credentials"});

    registerTargetAuthHandlers(io,socket);
    registerTargetFolderHandlers(io,socket);
    registerTargetFileHandlers(io,socket);
    registerTargetTreminalHandlers(io,socket);

    // on disconnect
    socket.on('disconnect', function () {
        console.log('A target machine disconnected');
     });

})

// handlers and emiters for user
userIO.on("connection",(socket)=>{
    console.log(`A user of id ${socket.id} has connected`);

    //emit e message asking for creadentials

    socket.emit("askcredentials",{message:"send login credentials"});

    registerUserAuthHandlers(io,socket);
    registerUserFolderHandlers(io,socket);
    regusterUserFileHandlers(io,socket);
    registerUserTerminalHandlers(io,socket);

    // on disconnect
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });

})

http.listen(port,()=>{
    console.log(`Listening on port ${port} ...`);
});