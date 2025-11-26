import React from 'react'
import { ButtonPage } from '../components/ButtonPage.jsx'

export const Front = () => {
  return (
    
      <div className='bg-amber-600 flex flex-col items-center justify-center min-h-screen text-white'>
        <main className="p-4 border border-white rounded-lg shadow-lg bg-amber-400 text-center">
        <h1 >Selamat datang pemain basket indonesia terjago</h1>
        <p className="mt-2">Aplikasi Booking Lapangan Basket Kampus</p>
        <img src="https://i.pinimg.com/564x/b8/0a/63/b80a63e6cd3225f74dbe76038f69af6d.jpg" alt="Basketball Logo" class="w-64 h-64 mx-auto mt-4 "/>

        <div>
          <ButtonPage text="Login"page="/login"/>
          <ButtonPage text="Register"page="/register"/>
        </div>
        </main>
        

      </div>
    
  )
}
