import { Connection } from "mongoose"  // import the Connection type from mongoose

declare global{ // declare a global variable named mongoose with the specified type
    var mongoose: {
        conn : Connection | null
        promise: Promise<Connection> | null
    }
}

export{}; 
 
