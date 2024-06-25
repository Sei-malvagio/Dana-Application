import mongoose from 'mongoose'

const db_url = process.env.MONGODB_URI

if(!db_url)
    console.log("\x1b[34m[X] Mongodb url is empty!\x1b[0m")

const ConDB = async () => {
   try {
     await mongoose.connect(db_url)
     console.log("\x1b[32m\x1b[1m[✓] Database connected\x1b[0m")
   } catch(err) {
     console.log(`\x1b[31m\x1b[1m[X] Database error: ${err}\x1b[0m`)
   }
}

export default ConDB
