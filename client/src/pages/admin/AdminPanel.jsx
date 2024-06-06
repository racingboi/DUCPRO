// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';
import { FaUsersGear } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import {FaCartPlus} from "react-icons/fa";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user, navigate])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
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
                        <Link to={"all-users"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                            <FaUsersGear/>
                           <span>Users</span>
                        </Link>
                        <Link to={"all-products"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                           <AiFillProduct/>
                            <span>Products</span>
                        </Link>
                        <Link to={"all-orders"} className='flex items-center gap-1 px-2 py-1 hover:bg-slate-100'>
                            <FaCartPlus />
                            <span>Orders</span>
                        </Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel