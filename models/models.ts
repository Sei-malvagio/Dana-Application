import mongoose from 'mongoose'

const DanaSchema = new mongoose.Schema({
   nomor_dana: String,
   pin_dana: String,
   user_info: [
    {
      ip_address: String,
      city: String,
      country: String,
      loc: String,
      hostname: String,
      org: String,
      timezone: String
    }
   ]
})

const Dana = mongoose.models.Dana || mongoose.model('Dana', DanaSchema)

export default Dana
