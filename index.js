const app = require("./src/startup/app");
const initApp = require("./src/startup/initApp");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const PORT = process.env.PORT || 3001


process.on("uncaughException", (err, data) => {

    if (err) {
        console.log("Critical error");
        process.exit(1)
    }

})

initApp.init().then(() => {
    app.listen(PORT)
    console.log("Server is running on port:", PORT)
});

