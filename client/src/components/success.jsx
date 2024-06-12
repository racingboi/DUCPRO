import SUCCESS from '../assets/success.gif'
import {useNavigate} from "react-router-dom";
import SummaryApi from "../common/index.js";
import {useSelector} from "react-redux";
export const Success = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state?.user?.user)
    const orderId = user?._id;
    const handlSendMail = async () => {
        try{
            const respones = await fetch(SummaryApi.sendMail.url,{
                method: SummaryApi.sendMail.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderId
                })
            })
            const data = await respones.json();
            if (data){
                navigate('/');

            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // const handleUpdate = async () => {
    //     try{
    //         const respones = await fetch(SummaryApi.updatePayment.url,{
    //             method: SummaryApi.updatePayment.method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 paymentStatus: 'completed',
    //                 orderId: 'orderId'
    //             })
    //         })
    //         const data = await respones.json();
    //         console.log(data)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }
    // handleUpdate();
    return (
        <>
            <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
                <img src={SUCCESS} alt="success"
                     width={150}
                     height={150}
                />
                <h1 className='text-gray-500 font-bold text-xl'>Payment Success</h1>
                <button
                    onClick={handlSendMail}
                    className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>
                    back to home
                </button>
            </div>
        </>
    )
}

