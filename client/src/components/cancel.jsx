import CANCEL from "../assets/cancel.gif";
import {Link} from "react-router-dom";
export const Cancel = () => {
    return (
        <>
            <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
                <img src={CANCEL} alt="cancel"
                     width={150}
                     height={150}
                />
                <h1 className='text-red-500 font-bold text-xl'>Payment Cancel</h1>
                <Link to='/' className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>
                    back to home
                </Link>
            </div>
        </>
    )
}