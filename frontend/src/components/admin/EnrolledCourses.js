import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserEnrolledCoursesQuery } from '../../store/apis/adminApi'
import loadingIcon from "../../assets/loading.svg"
import Logout from '../authentication/Logout'
import CourseList from '../reusable components/CourseList'
const EnrolledCourses = () => {
    const { userId } = useParams()
    const { data: enrolledCourses, isLoading: isEnrolledCoursesLoading, error: enrolledCoursesError } = useGetUserEnrolledCoursesQuery(userId)
    console.log("enrolledCourses", enrolledCourses)
    console.log("enrolledCoursesError", enrolledCoursesError)
    if (isEnrolledCoursesLoading) {
        return <div className=" flex w-full h-screen justify-center items-center">
            {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
            <img src={loadingIcon} alt="loading"></img>
        </div>
    }
    return (
        <>
            {enrolledCoursesError?.status === 401 ? (
                <>
                <Logout/>
                </>
            ) : (
                <>
                <CourseList courses={enrolledCourses} type="enrolledCourses" userId={userId}/>
                </>
            )}
        </>
    )
}

export default EnrolledCourses