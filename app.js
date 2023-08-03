const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = require('express')();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    maxHttpBufferSize:1e8,
    cors:{
            origins:['10.200.2.40'],
        },
    },
);

// importing user modal
const User = require("./src/models/user");


// user handlers
const registerUserAuthHandlers = require("./src/userNamespace/authHandlers/authHandlers");
const registerUserFolderHandlers = require("./src/userNamespace/folderHandlers/folderHandler");
const regusterUserFileHandlers = require("./src/userNamespace/fileHandlers/fileHandler");
const registerUserTerminalHandlers = require("./src/userNamespace/terminalHandler/terminalHandler");

// target mamchine handlers
const registerTargetAuthHandlers = require("./src/targetNamespace/authHandlers/authHandler");
const registerTargetFolderHandlers = require("./src/targetNamespace/folderHandlers/folderHandler");
const registerTargetFileHandlers = require("./src/targetNamespace/fileHandlers/fileHandler");
const registerTargetTreminalHandlers = require("./src/targetNamespace/terminalHandlers/terminalHandler");

dotenv.config();


mongoose.connect(process.env.MONGO_URI).then(()=>{

    console.log("Connected to database");
    const PORT = process.env.PORT || 5000;
    http.listen(PORT,()=>{
        console.log(`Listening on port ${PORT} ...`);
    });
}).catch((err)=>{
    console.log("Error while connecting to mongoose!");
    console.log(err);
})


// middlerwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

corsOptions = {
    origin: [
      "http://localhost:3000",
    ],
};


// allowing crossorigin request
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.post("/register",async (req,res)=>{

    try{
        console.log(req.body);

        const user = new User({
            email:req.body.email,
            password:req.body.password,
        });

        user.password = await User.hashPassword(user.password);

        await user.save();

        const data = {message:"hello"};
        res.send(data);
    }
    catch(error){
        switch(error.code){
            case 11000:res.send({error:"Duplcate Email",target:"EMAIL"});break;
            default: res.send({error:"Unexpected Error"});
        }
    }
});
// everything above is boiler plate code


// namespaces for target machines and users
const targetIO = io.of("/target");
const userIO = io.of("/user");


// handlers and emiters for target
targetIO.on("connection",(socket)=>{
    console.log(`A target machine of id ${socket.id} has connected`);

    setTimeout(()=>{
        if(!socket.user){
            console.log(`Unauthorized: Disconnecting target machine : ${socket.id}`);
        }
    },10000);
    
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

    setTimeout(()=>{
        if(!socket.user){
            console.log(`Unauthorized: Disconnecting user : ${socket.id}`);
        }
    },10000);

    registerUserAuthHandlers(io,socket);
    registerUserFolderHandlers(io,socket);
    regusterUserFileHandlers(io,socket);
    registerUserTerminalHandlers(io,socket);

    // on disconnect
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });

})


