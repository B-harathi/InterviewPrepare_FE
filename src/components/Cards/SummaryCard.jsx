import React from 'react'
import { LuTrash2, LuTarget, LuBookOpen } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
    colors, role, topicsToFocus, experience, questions, description, lastUpdated, onSelect, onDelete
}) => {
    return (
        <div className='bg-white border border-purple-100/50 rounded-2xl p-6 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 group hover:scale-105'
            onClick={onSelect}>
            
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-xl flex items-center justify-center'>
                        <span className='text-lg font-bold text-white'>
                            {getInitials(role)}
                        </span>
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold text-gray-900 mb-1'>{role}</h2>
                        <p className='text-sm text-gray-600'>{topicsToFocus}</p>
                    </div>
                </div>

                <button className='opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100 hover:border-red-200 hover:bg-red-100 cursor-pointer transition-all duration-300'
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete()
                    }}>
                    <LuTrash2 className='text-sm' />
                    Delete
                </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3 mb-4'>
                <div className='text-center p-3 bg-purple-50 rounded-lg border border-purple-100/50'>
                    <div className='flex items-center justify-center mb-1'>
                        <LuTarget className='text-purple-600 text-sm' />
                    </div>
                    <div className='text-xs font-medium text-purple-700'>{experience} {experience == 1 ? "Year" : "Years"}</div>
                </div>

                <div className='text-center p-3 bg-yellow-50 rounded-lg border border-yellow-100/50'>
                    <div className='flex items-center justify-center mb-1'>
                        <LuBookOpen className='text-yellow-600 text-sm' />
                    </div>
                    <div className='text-xs font-medium text-yellow-700'>{questions} Q&A</div>
                </div>

                <div className='text-center p-3 bg-blue-50 rounded-lg border border-blue-100/50'>
                    <div className='flex items-center justify-center mb-1'>
                        <LuTarget className='text-blue-600 text-sm' />
                    </div>
                    <div className='text-xs font-medium text-blue-700'>{lastUpdated}</div>
                </div>
            </div>

            {/* Description */}
            {description && (
                <div className='bg-gray-50 rounded-lg p-3 border border-gray-100/50'>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {description}
                    </p>
                </div>
            )}

            {/* Hover effect indicator */}
            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
        </div>
    )
}

export default SummaryCard;