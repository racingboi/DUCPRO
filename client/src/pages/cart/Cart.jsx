import { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common/index.js'
import Context from '../../context/index.jsx'
import displayINRCurrency from '../../helpers/displayCurrency.js'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigator = useNavigate();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)



    const fetchData = async () => {

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })


        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }


    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            fetchData()
        }
    }


    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
    const total = totalPrice;
    return (
        <div className='container mx-auto bg-white p-3 mx-2'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && <p className='bg-white py-5'>No Data</p>}
            </div>

            {/* Flex container for side-by-side layout */}
            <div className='flex flex-row gap-4 p-4'>

                {/* View product */}
                <div className='flex-1 min-w-0'>
                    {loading ? (
                        loadingCart?.map((el, index) => (
                            <div key={el + "Add To Cart Loading" + index}
                                 className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                            </div>
                        ))
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                <tr>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Product
                                    </th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Price
                                    </th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Quantity
                                    </th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Subtotal
                                    </th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((product) => (
                                    <tr key={product._id}>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <div className='flex items-center'>
                                                <div className='flex-shrink-0 w-10 h-10'>
                                                    <img className='w-full h-full rounded-full'
                                                         src={product.productId.productImage[0]}
                                                         alt={product.productId.productName}/>
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                        {product.productId.productName}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>
                                                {displayINRCurrency(product.productId.sellingPrice)}
                                            </p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center'>
                                            <button
                                                className='mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700'
                                                onClick={() => decraseQty(product._id, product.quantity)}>
                                                -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button
                                                className='ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700'
                                                onClick={() => increaseQty(product._id, product.quantity)}>
                                                +
                                            </button>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>
                                                {displayINRCurrency(product.productId.sellingPrice * product.quantity)}
                                            </p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <button
                                                className='p-2 mx-2 bg-red-300 hover:bg-red-600 rounded-full transition-colors duration-150 ease-in-out text-red-600 hover:text-white'
                                                onClick={() => deleteCartProduct(product._id)}>
                                                <MdDelete/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className='w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                        </div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div
                                className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>

                            <div
                                className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(total)}</p>
                            </div>
                            <from>
                                <button
                                    type='submit' className='bg-blue-600 p-2 text-white w-full mt-2'
                                    onClick={() => navigator('/orders')}
                                >
                                    Payment
                                </button>
                            </from>
                        </div>
                    )}
                </div>
            </div>


        </div>

    )
}

export default Cart