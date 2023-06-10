import React, { useEffect } from 'react'
import useAuth from '../custom hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Toaster from './Toaster';
import clsx from 'clsx';
import { useEnrollUserMutation, useUnEnrollUserMutation } from '../../store/apis/adminApi';
import { normalToaster } from '../../utils/helpers';
import loadingIcon from "../../assets/loading.svg"
// import Logout from '../authentication/Logout';


const CourseList = ({ courses, type, userId }) => {
    const navigate = useNavigate();
    const { role } = useAuth();
    const [enrollUser, { data: enrolledUserData, isLoading: isEnrolling,  }] = useEnrollUserMutation()
    const [unEnrollUser, { data: unEnrollUserData, isLoading: isUnEnrolling,  }] = useUnEnrollUserMutation()
    ///// useEffect

    useEffect(() => {
        if (enrolledUserData) {
            if (enrolledUserData.message) {
                normalToaster(enrolledUserData.message)
            }
        }
        else if (unEnrollUserData) {
            if (unEnrollUserData.message) {
                normalToaster(unEnrollUserData.message)
            }
        }
    }, [enrolledUserData, unEnrollUserData])

    const handleUserEnroll = (courseId) => {
        enrollUser({ userId, courseId })
    }
    const handleUserUnEnroll = (courseId) => {
        console.log(userId, courseId)
        unEnrollUser({ userId, courseId })
    }
    console.log("enrolledUserData", enrolledUserData)
    console.log("unenrolledUserData", unEnrollUserData)
    if (isEnrolling || isUnEnrolling) {
        return <div className=" flex w-full h-screen justify-center items-center">
            {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
            <img src={loadingIcon} alt="loading"></img>
        </div>
    }
    return (
        // <>
        //     {(enrollError?.status === 401 || unEnrollError?.status === 401) ? (
        //         <Logout />
        //     ) : (
        //         <>
                    <div className=" py-10 flex flex-row flex-wrap gap-10 justify-center items-center">
                        <Toaster />
                        {courses?.map((course) => {
                            const { title, description, price, imageUrl, _id, enrolled } = course;
                            return (
                                <div
                                    key={_id}
                                    className="w-80 bg-white flex flex-col gap-1 shadow-lg border border-black border-solid rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={imageUrl}
                                        className=" w-full h-48"
                                    ></img>
                                    <div className="p-2 flex flex-col gap-y-2">
                                        <p className="text-bold text-red-300 text-xl">
                                            {title}
                                        </p>
                                        <p className="text-base text-bold">{description}</p>
                                        <p className="text-xl text-bold text-blue-400">
                                            Price:{price}/RS
                                        </p>
                                        <div className="flex flex-row justify-center items-center w-full flex-wrap gap-2">
                                            {type === "enrolledCourses" ? (
                                                role === "admin" && (
                                                    <>
                                                        <button onClick={() => { handleUserEnroll(_id) }} disabled={enrolled} className={clsx('shawdow-lg self-stretch w-20 rounded-lg bg-blue-300 border border-black border-solid', { "opacity-30": enrolled })} >Enroll</button>
                                                        <button onClick={() => { handleUserUnEnroll(_id) }} disabled={!enrolled} className={clsx('shawdow-lg self-stretch w-20 rounded-lg bg-blue-300 border border-black border-solid', { "opacity-30": !enrolled })} >UnEnroll</button>
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/course/${_id}/lectures`);
                                                        }}
                                                        className="shawdow-lg self-stretch w-20 rounded-lg bg-blue-300 border border-black border-solid"
                                                    >
                                                        View
                                                    </button>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
        //         </>
        //     )}

        // </>

    )
}

export default CourseList