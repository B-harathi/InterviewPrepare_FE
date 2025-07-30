import React from 'react'
import { LuTarget, LuBookOpen, LuUsers } from "react-icons/lu";

const RoleInfoHeader = ({
    role, topicsToFocus, experience, questions, description, lastUpdated
}) => {
    return (
        <div className='bg-gradient-to-r from-purple-600 to-yellow-500 relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>
            
            <div className='container mx-auto px-4 py-12 relative z-10'>
                <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                                <LuTarget className='text-white text-xl' />
                            </div>
                            <div>
                                <h2 className='text-3xl font-bold text-white mb-2'>{role}</h2>
                                <p className='text-white/90 text-lg'>{topicsToFocus}</p>
                            </div>
                        </div>

                        {description && (
                            <p className='text-white/80 text-base mb-6 max-w-2xl'>
                                {description}
                            </p>
                        )}

                        <div className='flex flex-wrap items-center gap-4'>
                            <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
                                <LuUsers className='text-white text-sm' />
                                <span className='text-white text-sm font-medium'>
                                    {experience} {experience == 1 ? "Year" : "Years"} Experience
                                </span>
                            </div>

                            <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
                                <LuBookOpen className='text-white text-sm' />
                                <span className='text-white text-sm font-medium'>
                                    {questions} Questions & Answers
                                </span>
                            </div>

                            <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30'>
                                <LuTarget className='text-white text-sm' />
                                <span className='text-white text-sm font-medium'>
                                    Updated: {lastUpdated}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='lg:flex-shrink-0'>
                        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <LuTarget className='text-white text-2xl' />
                                </div>
                                <h3 className='text-white font-semibold mb-2'>Interview Prep</h3>
                                <p className='text-white/80 text-sm'>Ready to ace your interview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleInfoHeader