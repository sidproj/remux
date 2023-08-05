const User = require("./models/user");

module.exports = async (userid,log)=>{
    await User.findOneAndUpdate(
        { _id: userid }, 
        { $push: { logs: log } },
    );
}