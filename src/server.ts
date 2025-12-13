import { app } from "./app";
import config from "./config";




app.listen(config.port,()=>{
    console.log(`example app is listening on port ${config.port}`)
});