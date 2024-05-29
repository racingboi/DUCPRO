import {FaRegCircleUser} from "react-icons/fa6";
import {Link, Outlet} from "react-router-dom";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import {useSelector} from "react-redux";
// import React from "react";

export const Profile = () => {
    const user = useSelector(state => state?.user?.user)

    return (
        <>
            <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

                <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                    <div className='h-32  flex justify-center items-center flex-col'>
                        <div className='text-5xl cursor-pointer relative flex justify-center'>
                            {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
                                ) : (
                                    <FaRegCircleUser/>
                                )
                            }
                        </div>
                        <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                        <p className='text-sm'>{user?.role}</p>
                    </div>

                    {/***navigation */}
                    <div>
                        <nav className='grid p-4'>
                            <Link to={"my-account"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                                    <MdOutlineSwitchAccount/>
                                    <span>TÀI KHOẢN</span>
                            </Link>
                            <Link to={"address"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                               <IoLocationOutline/>
                               <span>ĐỊA CHỈ</span>
                            </Link>
                            <Link to={"order"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                                <FiShoppingCart/>
                                <span>ĐƠN HÀNG</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                <main className='w-full h-full p-2'>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}
