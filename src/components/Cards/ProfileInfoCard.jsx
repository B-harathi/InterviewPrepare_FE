import React, { useContext } from 'react'
import { UserContext } from './../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { LuLogOut, LuUser } from "react-icons/lu";

const ProfileInfoCard = () => {

    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/")
    }

    return user && (
        <div className='flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-purple-100/50 hover:bg-white/80 transition-all duration-300 group'>
            <div className='relative'>
                <img src={user.profileImageUrl} alt="" className='w-10 h-10 bg-gradient-to-r from-purple-100 to-yellow-100 rounded-full border-2 border-purple-200' />
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
            </div>
            <div className='flex flex-col'>
                <div className='text-sm font-semibold text-gray-800 leading-tight'>
                    {user.name || "User"}
                </div>
                <button 
                    className='text-purple-600 text-xs font-medium cursor-pointer hover:text-purple-700 transition-colors flex items-center gap-1 group-hover:underline' 
                    onClick={handleLogout}
                >
                    <LuLogOut className='text-xs' />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfoCard