import { useState } from "react";
import { FaEye } from "react-icons/fa";
import SummaryApi from "../../../common/index.js";
import {toast} from 'react-toastify'

// eslint-disable-next-line react/prop-types
export const EditOrder = ({fetchData,orderId,data}) => {
    const [openEditOrder, setOpenEditOrder] = useState(false);
    // eslint-disable-next-line react/prop-types
    const [status, setStatus] = useState(data.status);
    // Toggle modal open/close
    const toggleModal = () => {
        setOpenEditOrder(!openEditOrder);
    };
    const handleStatusChange = async(e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.updateOrder.url, {
            method: SummaryApi.updateOrder.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                status: status
            })
        });
        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData.message)
            fetchData()
            toggleModal()
        }
        if (responseData.error) {
            toast.error(responseData.message)
        }
    }

    return (
        <>
            <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleModal}
            >
                <FaEye className="inline-block w-4 h-4" />
            </button>

            {openEditOrder && (
                <div
                    id="authentication-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    style={{ display: "flex" }}
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    orders status
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal} // Close modal on click
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">STATUS</label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="w-full px-4 py-2 border rounded-lg text-gray-900 dark:text-gray-100"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="completed">Completed</option>
                                            <option value="pending">Pending</option>
                                            <option value="cancelled">Cancelled</option>

                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleStatusChange}
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                       change status
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
