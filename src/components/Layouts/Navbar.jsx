import React from 'react';
import { Link } from 'react-router-dom';
import { LuTarget, LuBookOpen, LuUsers } from "react-icons/lu";
import ProfileInfoCard from './../Cards/ProfileInfoCard';

const Navbar = () => {
    return (
        <div className='bg-white/80 backdrop-blur-md border-b border-purple-100/50 py-4 px-4 md:px-0 sticky top-0 z-30 shadow-sm'>
            <div className='container mx-auto flex items-center justify-between gap-5'>
                <Link to={'/dashboard'} className='flex items-center gap-3 group'>
                    <div className='w-8 h-8 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                        <LuTarget className='text-white text-sm' />
                    </div>
                    <h2 className='text-xl font-bold text-purple-800 leading-5'>
                        InterviewPrep AI
                    </h2>
                </Link>

                <div className='flex items-center gap-6'>
                    <nav className='hidden md:flex items-center gap-6'>
                        <Link to="/dashboard" className='flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300'>
                            <LuTarget className='text-lg' />
                            <span className='font-medium'>Dashboard</span>
                        </Link>
                        <Link to="/courses" className='flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300'>
                            <LuBookOpen className='text-lg' />
                            <span className='font-medium'>Courses</span>
                        </Link>
                        <Link to="/community" className='flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300'>
                            <LuUsers className='text-lg' />
                            <span className='font-medium'>Community</span>
                        </Link>
                    </nav>
                    <ProfileInfoCard />
                </div>
            </div>
        </div>
    )
}

export default Navbar