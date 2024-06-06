import SummaryApi from "../../../common/index.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment/moment.js";
import {EditOrder} from "./editOrder.jsx";

export const OrderAdmin = () => {
    const [data, setData] = useState([])

            const fetchOrders = async () => {
                const response = await fetch(SummaryApi.orderGet.url, {
                    method: SummaryApi.orderGet.method,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const responseData = await response.json()

                if (responseData.success) {
                    setData(responseData.data)
                }
            }
            useEffect(() => {
                fetchOrders()
            }, [])
    const user = useSelector(state => state?.user?.user)
    return (
        <>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <table className='min-w-full leading-normal'>
                    <thead>
                    <tr className='bg-black text-white'>
                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Name</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Time</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Total</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Status</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>payment Method</th>

                        <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{user.name}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{moment(order.createdAt).format('L')}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order.total}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order.status}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order.paymentMethod}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                      <EditOrder
                                      fetchData={fetchOrders}
                                      orderId={order._id}
                                      data={order}
                                      />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>

                </table>


            </div>
        </>
    )
}
