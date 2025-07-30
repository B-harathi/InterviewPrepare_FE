import React, { useEffect, useState } from 'react';
import { LuPlus, LuTarget, LuBookOpen, LuUsers, LuRefreshCw } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from './../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from "moment";
import Modal from './../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from './../../components/DeleteAlertContent';

const Dashboard = () => {

    const navigate = useNavigate();

    const [openCreateModel, setOpenCreateModel] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [isMigrating, setIsMigrating] = useState(false);

    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        open: false,
        data: null
    })

    const fetchAllSessions = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
            setSessions(response.data);
        } catch (error) {
            console.error(`Error Fetching session data`, error)
        }
    }

    const deleteSession = async (sessionData) => {
        try {
            await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

            toast.success("Session Delete Successfully");

            setOpenDeleteAlert({
                open: false, data: null
            })
            fetchAllSessions()
        } catch (error) {
            console.error("Error deleting session data:", error)
        }
    }

    const runMigration = async () => {
        try {
            setIsMigrating(true);
            await axiosInstance.post('/api/questions/migrate');
            toast.success("Migration completed! Questions now have YouTube links and course recommendations.");
            fetchAllSessions(); // Refresh sessions to show updated data
        } catch (error) {
            console.error("Migration failed:", error);
            toast.error("Migration failed. Please try again.");
        } finally {
            setIsMigrating(false);
        }
    }

    useEffect(() => {
        fetchAllSessions();
    }, [])

    const totalQuestions = sessions.reduce((acc, session) => acc + (session.questions?.length || 0), 0);
    const totalSessions = sessions.length;

    return (
        <DashboardLayout>
            <div className='min-h-screen bg-gradient-to-br from-white via-yellow-50/30 to-purple-50/30'>
                <div className='container mx-auto pt-8 pb-20 px-4'>
                    
                    {/* Header Section */}
                    <div className='mb-8'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back!</h1>
                                <p className='text-gray-600'>Continue your interview preparation journey</p>
                            </div>
                            <button 
                                onClick={runMigration}
                                disabled={isMigrating}
                                className='flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                <LuRefreshCw className={`text-sm ${isMigrating ? 'animate-spin' : ''}`} />
                                {isMigrating ? 'Migrating...' : 'Update Questions'}
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-purple-100/50'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center'>
                                    <LuTarget className='text-white text-xl' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-900'>{totalSessions}</div>
                                    <div className='text-sm text-gray-600'>Active Sessions</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-yellow-100/50'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center'>
                                    <LuBookOpen className='text-white text-xl' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-900'>{totalQuestions}</div>
                                    <div className='text-sm text-gray-600'>Total Questions</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-purple-100/50'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center'>
                                    <LuUsers className='text-white text-xl' />
                                </div>
                                <div>
                                    <div className='text-2xl font-bold text-gray-900'>100%</div>
                                    <div className='text-sm text-gray-600'>Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sessions Grid */}
                    <div className='mb-8'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Your Interview Sessions</h2>
                        
                        {sessions.length === 0 ? (
                            <div className='text-center py-16'>
                                <div className='w-24 h-24 bg-gradient-to-r from-purple-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <LuTarget className='text-3xl text-purple-600' />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-900 mb-2'>No sessions yet</h3>
                                <p className='text-gray-600 mb-6'>Create your first interview preparation session to get started</p>
                                <button 
                                    className='bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-semibold px-8 py-3 rounded-full hover:from-purple-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl'
                                    onClick={() => setOpenCreateModel(true)}
                                >
                                    Create First Session
                                </button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {
                                    sessions?.map((data, index) => (
                                        <SummaryCard
                                            key={data?.id}
                                            colors={CARD_BG[index % CARD_BG.length]}
                                            role={data?.role}
                                            topicsToFocus={data?.topicsToFocus || ""}
                                            experience={data?.experience || "-"}
                                            questions={data?.questions.length || "-"}
                                            description={data?.description || ""}
                                            lastUpdated={
                                                data?.updatedAt
                                                    ? moment(data.updatedAt).format("DD MM YYYY")
                                                    : ""
                                            }
                                            onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                                            onDelete={() => setOpenDeleteAlert({ open: true, data })}
                                        />
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    className='fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-yellow-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center'
                    onClick={() => setOpenCreateModel(true)}>
                    <LuPlus className='text-2xl' />
                </button>
            </div>

            <Modal
                isOpen={openCreateModel}
                onClose={() => {
                    setOpenCreateModel(false)
                }}
                hideHeader
            >
                <div>
                    <CreateSessionForm />
                </div>
            </Modal>

            <Modal
                isOpen={openDeleteAlert?.open}
                onClose={() => {
                    setOpenDeleteAlert({ open: false, data: null })
                }}
                title="Delete Alert"
            >
                <div className="w-[30vw]">
                    <DeleteAlertContent
                        content="Are you sure you want to delete this session detail?"
                        onDelete={() => deleteSession(openDeleteAlert.data)}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    )
}

export default Dashboard