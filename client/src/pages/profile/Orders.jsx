import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../../common/index.js';
import axios from "axios";

const Orders = () => {
    const userId = useSelector(state => state?.user?.user?._id);
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
        try {
            // Correctly concatenating the URL with the userId
            const { data } = await axios.get(`${SummaryApi.getOrderUser.url}/${userId}`);
            setOrder(data.data);
        } catch (error) {
            // It's often useful to log the entire error object if you're missing context in errors
            console.error("Error fetching order:", error);
        }
    };
    useEffect(() => {
if (userId)
        fetchOrder();

    }, [userId]);
    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-xl font-bold text-center py-4">Orders</h1>
                <div className="flex flex-col items-center">
                    {order.map((item) => (
                        <div key={item.id} className="w-full max-w-md px-4 py-2 bg-gray-100 shadow-md rounded-lg my-2">
                            <p className="text-sm font-medium">Status: <span
                                className="text-blue-500">{item.status}</span></p>
                            <p className="text-sm font-medium">Total: ${item.total}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Orders;