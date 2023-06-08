import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Toaster = () => {
  return (
    <ToastContainer autoClose={1000} className="mt-12"/>
  )
}

export default Toaster