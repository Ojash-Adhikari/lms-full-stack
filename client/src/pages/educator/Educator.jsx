import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/Navigation/SideBar'
import Navbar from '../../components/Navigation/Navbar'

const Educator = () => {
    return (
        <div className="text-default min-h-screen bg-white">
            <Navbar />
            <div className='flex'>
                <SideBar />
                <div className='flex-1'>
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default Educator