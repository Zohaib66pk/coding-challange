const app = require("./src/startup/app");
const initApp = require("./src/startup/initApp");

process.on("uncaughException", (err,data)=>{

    if(err){
       console.log("Critical error, yet system keeps running");
       return;
    }
 
 })

initApp.init().then(() => app.listen(3001));

