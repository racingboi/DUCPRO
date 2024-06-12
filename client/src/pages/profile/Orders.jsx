import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SummaryApi from '../../common/index.js';

const Orders = () => {
    const userId = useSelector(state => state?.user?.user?._id);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios({
                    url: SummaryApi.getOrderUser.url,
                    method: SummaryApi.getOrderUser.method,
                    headers: { 'Content-Type': 'application/json' },
                    data: { userId }
                });
                console.log("Order response:", response.data);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        if (userId) {
            fetchOrder();
        }
    }, [userId]);
    return (
        <>
            <div>
                <h1>Orders</h1>
            </div>
        </>
    );
};

export default Orders;