// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import UploadProduct from '../../components/admin/UploadProduct'
import SummaryApi from '../../common'
import AdminProductCard from '../../components/admin/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
  try {
    const response = await fetch(`${SummaryApi.allProduct.url}`,{
      method : SummaryApi.allProduct.method,
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const responseData = await response.json()
    if(responseData.success){
      setAllProduct(responseData.data)
    }

    } catch (error) {
      console.log("Error in fetch all product",error)
    }
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div className="overflow-x-auto">
        <div className='bg-white py-2 px-4 flex justify-between items-center p-3'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        {/**all product */}
        <div className='p-3'>
                <AdminProductCard
                    data={allProduct}
                    fetchData={fetchAllProduct}
                />
        </div>
        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct
                onClose={()=>setOpenUploadProduct(false)}
                fetchData={fetchAllProduct}
                data={allProduct}
            />
          )
        }
      

    </div>
  )
}

export default AllProducts