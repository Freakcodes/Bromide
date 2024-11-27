import React from 'react'
import {Outlet} from "react-router-dom"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const Layout = () => {
  return (
    <div>
        <main className='min-h-screen container mt-2'>
            <Header/>
            <Outlet/>
        </main>
        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Layout