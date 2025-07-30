import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from './../../components/Loader/SpinnerLoader';
import { toast } from "react-hot-toast";
import DashboardLayout from './../../components/Layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from './../../components/Cards/QuestionCard';
import AiResponsePreview from './components/AiResponsePreview';
import Drawer from './../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';


const InterviewPrep = () => {

    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);

    const [isLoading, setisLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    //Fetch session data by sessionId
    const fetchSessionDetailsById = async () => {



        try {
            const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

            if (response.data && response.data.session) {
                setSessionData(response.data.session)
            }
        } catch (error) {
            console.error("Error:", error);

        }
    };


    //Generate concept Explanation 
    const generateConceptExplanation = async (question) => {

        try {
            setErrorMsg("")
            setExplanation(null)

            setisLoading(true)
            setOpenLeanMoreDrawer(true)

            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question })

            if (response.data) {
                setExplanation(response.data)
            }
        } catch (error) {
            setExplanation(null)
            setErrorMsg("Failed to generate explanation,Please try again.")
            console.error("Error:-", error)

        } finally {
            setisLoading(false)
        }
    };

    //Pin Question
    const toggleQuestionPinStatus = async (questionId) => {

        try {
            const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
            console.log(response);

            if (response.data && response.data.question) {
                //toast.success("Question Pinned Successfully")
                fetchSessionDetailsById()
            }


        } catch (error) {
            console.error("Error:- ", error)
        }

    };

    //Add more questions to a session
    const uploadMoreQuestions = async () => {

        try {
            setIsUpdateLoader(true)

            //Call AI APi to generate questions
            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                role: sessionData?.role,
                experience: sessionData?.experience,
                topicsToFocus: sessionData?.topicsToFocus,
                numberofQuestions: 10
            });

            //Should be array like [{question,answer}...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
                sessionId, questions: generatedQuestions
            });

            if (response.data) {
                toast.success("Added more Q&A !!")
                fetchSessionDetailsById()
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Something went wrong.Please try again.")
            }
        } finally {
            setIsUpdateLoader(false)
        }
    };

    useEffect(() => {
        if (!sessionId) {
            toast.error("No session ID found in the URL.");
            return;
        }

        fetchSessionDetailsById();
    }, [sessionId]);

    return (
        <DashboardLayout>
            <div className='min-h-screen bg-gradient-to-br from-white via-yellow-50/30 to-purple-50/30'>
                <RoleInfoHeader
                    role={sessionData?.role || ""}
                    topicsToFocus={sessionData?.topicsToFocus || ""}
                    experience={sessionData?.experience || "-"}
                    questions={sessionData?.questions?.length || "-"}
                    description={sessionData?.description || ""}
                    lastUpdated={
                        sessionData?.updatedAt
                            ? moment(sessionData.updatedAt).format("DD MM YYYY")
                            : ""
                    }
                />

                <div className='container mx-auto pt-8 pb-20 px-4'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-3xl font-bold text-gray-900'>Interview Q & A</h2>
                        <div className='text-sm text-gray-600'>
                            {sessionData?.questions?.length || 0} questions available
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-6'>
                        <div className={`col-span-12 ${openLeanMoreDrawer ? "lg:col-span-7" : "lg:col-span-8"}`}>
                            <AnimatePresence>
                                {sessionData?.questions?.map((data, index) => {
                                    return (
                                        <motion.div
                                            key={data._id || index}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.4,
                                                type: "spring",
                                                stiffness: 100,
                                                delay: index * 0.1,
                                                damping: 15
                                            }}
                                            layout
                                            layoutId={`question-${data._id || index}`}>

                                            <>
                                                <QuestionCard
                                                    question={data?.question}
                                                    answer={data?.answer}
                                                    onLearnMore={() =>
                                                        generateConceptExplanation(data.question)
                                                    }
                                                    isPinned={data?.isPinned}
                                                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                                                    youtubeLink={data?.youtubeLink}
                                                    coursePreferences={data?.coursePreferences}
                                                    difficulty={data?.difficulty}
                                                />

                                                {
                                                    !isLoading && sessionData?.questions?.length == index + 1 && (
                                                        <div className='flex items-center justify-center mt-8'>
                                                            <button className='flex items-center gap-3 text-sm text-white font-medium bg-gradient-to-r from-purple-600 to-yellow-500 px-8 py-3 rounded-full hover:from-purple-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer' disabled={isLoading || isUpdateLoader} onClick={uploadMoreQuestions}>
                                                                {
                                                                    isUpdateLoader ? (
                                                                        <SpinnerLoader />
                                                                    ) : (
                                                                        <LuListCollapse className='text-lg' />
                                                                    )
                                                                }{" "}Load More Questions
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        </motion.div>
                                    );
                                })};
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div>
                    <Drawer
                        isOpen={openLeanMoreDrawer}
                        onClose={() => setOpenLeanMoreDrawer(false)}
                        title={!isLoading && explanation?.title}
                    >
                        {
                            errorMsg && (
                                <p className='flex gap-2 text-sm text-red-600 font-medium bg-red-50 p-4 rounded-lg border border-red-100'>
                                    <LuCircleAlert className='mt-1' /> {errorMsg}
                                </p>
                            )
                        }
                        {isLoading && <SkeletonLoader />}
                        {!isLoading && explanation && (
                            <AiResponsePreview 
                                content={explanation?.explanation} 
                                youtubeLink={explanation?.youtubeLink}
                                coursePreferences={explanation?.coursePreferences}
                            />
                        )}
                    </Drawer>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InterviewPrep