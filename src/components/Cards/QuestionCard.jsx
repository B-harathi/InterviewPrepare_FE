import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuBookOpen } from "react-icons/lu";
import AiResponsePreview from '../../pages/InterviewPrep/components/AiResponsePreview';

const QuestionCard = ({
    question, answer, onLearnMore, isPinned, onTogglePin, youtubeLink, coursePreferences, difficulty
}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 10);
        } else {
            setHeight(0)
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'beginner': return 'bg-green-100 text-green-700';
            case 'intermediate': return 'bg-yellow-100 text-yellow-700';
            case 'advanced': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <>
            <div className='bg-white rounded-xl mb-6 overflow-hidden py-6 px-6 shadow-lg shadow-purple-100/50 border border-purple-100/30 group hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300'>
                <div className='flex items-start justify-between cursor-pointer'>
                    <div className='flex items-start gap-4 flex-1'>
                        <div className='flex-shrink-0'>
                            <span className='text-lg font-bold text-purple-600 bg-purple-50 w-8 h-8 rounded-full flex items-center justify-center'>Q</span>
                        </div>

                        <div className='flex-1'>
                            <h3 className='text-base font-semibold text-gray-800 leading-relaxed mb-2'
                                onClick={toggleExpand}>{question}</h3>
                            
                            {difficulty && (
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center justify-end ml-4 relative'>
                        <div className={`flex gap-2 ${isExpanded ? "flex" : "hidden group-hover:flex"}`}>
                            <button className='flex items-center gap-2 text-xs text-purple-700 font-medium bg-purple-50 px-3 py-2 rounded-lg text-nowrap border border-purple-100 hover:border-purple-200 hover:bg-purple-100 cursor-pointer transition-colors'
                                onClick={onTogglePin}>
                                {
                                    isPinned ? (
                                        <LuPinOff className='text-sm' />
                                    ) : (
                                        <LuPin className='text-sm' />
                                    )
                                }
                                {isPinned ? 'Unpin' : 'Pin'}
                            </button>

                            <button className='flex items-center gap-2 text-xs text-yellow-700 font-medium bg-yellow-50 px-3 py-2 rounded-lg text-nowrap border border-yellow-100 hover:border-yellow-200 hover:bg-yellow-100 cursor-pointer transition-colors'
                                onClick={() => {
                                    setIsExpanded(true);
                                    onLearnMore()
                                }}>
                                <LuSparkles className='text-sm' />
                                Learn More
                            </button>
                        </div>

                        <button className='text-gray-400 hover:text-purple-600 cursor-pointer ml-2 transition-colors'
                            onClick={toggleExpand}>
                            <LuChevronDown
                                size={20}
                                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                </div>

                <div className='overflow-hidden transition-all duration-300 ease-in-out'
                    style={{ maxHeight: `${height}px` }}>
                    <div ref={contentRef} className='mt-6 space-y-6'>
                        
                        {/* Answer Section */}
                        <div className='bg-gradient-to-r from-purple-50 to-yellow-50 px-6 py-4 rounded-xl border border-purple-100/50'>
                            <h4 className='text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2'>
                                <span className='text-lg font-bold text-purple-600 bg-white w-6 h-6 rounded-full flex items-center justify-center'>A</span>
                                Answer
                            </h4>
                            <AiResponsePreview content={answer} />
                        </div>

                        {/* YouTube Link Section */}
                        {youtubeLink && (
                            <div className='bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 rounded-xl border border-red-100/50'>
                                <h4 className='text-sm font-semibold text-red-700 mb-3 flex items-center gap-2'>
                                    <LuBookOpen className='text-lg text-red-600' />
                                    Watch Video Tutorial
                                </h4>
                                <a 
                                    href={youtubeLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className='inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium hover:underline transition-colors'
                                >
                                    <span>Watch on YouTube</span>
                                    <LuBookOpen className='text-sm' />
                                </a>
                            </div>
                        )}

                        {/* Course Preferences Section */}
                        {coursePreferences && coursePreferences.length > 0 && (
                            <div className='bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 rounded-xl border border-blue-100/50'>
                                <h4 className='text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2'>
                                    <LuBookOpen className='text-lg text-blue-600' />
                                    Free Courses & Resources
                                </h4>
                                <div className='space-y-3'>
                                    {coursePreferences.map((course, index) => (
                                        <div key={index} className='bg-white/70 rounded-lg p-3 border border-blue-100/50'>
                                            <h5 className='font-medium text-gray-800 mb-1'>{course.title}</h5>
                                            <p className='text-sm text-gray-600 mb-2'>{course.description}</p>
                                            <a 
                                                href={course.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className='inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors'
                                            >
                                                <span>{course.isFree ? 'Free Course' : 'Course Link'}</span>
                                                <LuBookOpen className='text-xs' />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionCard