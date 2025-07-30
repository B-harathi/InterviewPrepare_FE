import React, { useContext, useState } from 'react';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles, LuTarget, LuBookOpen, LuUsers } from "react-icons/lu";
import hero_img from "../assets/hero_img.png";
import Signup from './Auth/Signup';
import Modal from './../components/Modal';
import Login from './Auth/Login';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from './../components/Cards/ProfileInfoCard';

const LandingPage = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModel] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModel(true)
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <>
            <div className='w-full min-h-screen bg-gradient-to-br from-white via-yellow-50 to-purple-50'>
                {/* Background decorative elements */}
                <div className='absolute top-0 left-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl'></div>
                <div className='absolute top-1/2 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl'></div>

                <div className='container mx-auto px-4 pt-6 pb-20 relative z-10'>
                    {/* Header */}
                    <header className='flex justify-between items-center mb-16'>
                        <div className='text-2xl text-purple-800 font-bold flex items-center gap-2'>
                            <div className='w-8 h-8 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-lg flex items-center justify-center'>
                                <LuTarget className='text-white text-sm' />
                            </div>
                            InterviewPrep AI
                        </div>
                        {
                            user ? (
                                <ProfileInfoCard />
                            ) : (
                                <button className='bg-gradient-to-r from-purple-600 to-yellow-500 text-sm font-semibold text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer'
                                    onClick={() => setOpenAuthModel(true)}>Get Started</button>
                            )
                        }
                    </header>

                    {/* Hero Content */}
                    <div className='flex flex-col lg:flex-row items-center gap-12 mb-20'>
                        <div className='w-full lg:w-1/2'>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='flex items-center gap-2 text-sm text-purple-700 font-semibold bg-purple-100 px-4 py-2 rounded-full border border-purple-200'>
                                    <LuSparkles className='text-yellow-500' />
                                    AI-Powered Learning
                                </div>
                            </div>

                            <h1 className='text-5xl lg:text-6xl text-gray-900 font-bold mb-6 leading-tight'>
                                Master Your
                                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-yellow-500'>
                                    Interview Skills
                                </span>
                                with AI
                            </h1>

                            <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                                Get personalized interview questions, detailed explanations, video tutorials, 
                                and free course recommendations. Your complete interview preparation toolkit 
                                powered by artificial intelligence.
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4'>
                                <button 
                                    className='bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-semibold px-8 py-4 rounded-full hover:from-purple-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                                    onClick={handleCTA}>
                                    <LuTarget className='text-lg' />
                                    Start Learning
                                </button>
                                <button className='border-2 border-purple-200 text-purple-700 font-semibold px-8 py-4 rounded-full hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2'>
                                    <LuBookOpen className='text-lg' />
                                    View Courses
                                </button>
                            </div>

                            {/* Stats */}
                            <div className='flex gap-8 mt-12'>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-purple-600'>500+</div>
                                    <div className='text-sm text-gray-600'>Questions</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-yellow-600'>50+</div>
                                    <div className='text-sm text-gray-600'>Video Tutorials</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-purple-600'>100+</div>
                                    <div className='text-sm text-gray-600'>Free Courses</div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full lg:w-1/2'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-gradient-to-r from-purple-200/50 to-yellow-200/50 rounded-3xl blur-xl'></div>
                                <div className='relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100/50'>
                                    <div className='flex items-center justify-center mb-6'>
                                        <div className='w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-full flex items-center justify-center'>
                                            <LuUsers className='text-white text-2xl' />
                                        </div>
                                    </div>
                                    <h3 className='text-xl font-semibold text-gray-800 text-center mb-4'>
                                        Interactive Learning Experience
                                    </h3>
                                    <p className='text-gray-600 text-center mb-6'>
                                        Practice with real interview questions, get instant feedback, 
                                        and access curated learning resources.
                                    </p>
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-3 text-sm text-gray-700'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                            AI-Generated Questions & Answers
                                        </div>
                                        <div className='flex items-center gap-3 text-sm text-gray-700'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                            YouTube Video Tutorials
                                        </div>
                                        <div className='flex items-center gap-3 text-sm text-gray-700'>
                                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                            Free Course Recommendations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className='w-full bg-white py-20'>
                    <div className='container mx-auto px-4'>
                        <div className='text-center mb-16'>
                            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                                Everything You Need to Succeed
                            </h2>
                            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                                Our comprehensive platform provides all the tools and resources 
                                you need to ace your technical interviews.
                            </p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {APP_FEATURES.map((feature, index) => (
                                <div key={feature.id}
                                    className='bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100/50 group hover:scale-105'>
                                    <div className='w-12 h-12 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                                        <LuTarget className='text-white text-xl' />
                                    </div>
                                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className='w-full bg-gradient-to-r from-purple-600 to-yellow-500 py-20'>
                    <div className='container mx-auto px-4 text-center'>
                        <h2 className='text-4xl font-bold text-white mb-6'>
                            Ready to Ace Your Interview?
                        </h2>
                        <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
                            Join thousands of developers who have successfully prepared 
                            for their technical interviews with our AI-powered platform.
                        </p>
                        <button 
                            className='bg-white text-purple-600 font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl'
                            onClick={handleCTA}>
                            Start Your Journey Today
                        </button>
                    </div>
                </div>

                <div className='text-sm bg-gray-50 text-gray-600 text-center p-6'>
                    Made with ❤️ for developers worldwide
                </div>
            </div>

            <Modal
                isOpen={openAuthModal} onClose={() => {
                    setOpenAuthModel(false);
                    setCurrentPage("login")
                }} hideHeader >
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "signup" && (
                        <Signup setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </>
    )
}

export default LandingPage