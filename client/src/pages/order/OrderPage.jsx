import axios from "axios";
import {useEffect, useState} from "react";
import Fex from "./Fee.jsx";
import SummaryApi from "../../common/index.js";
import displayINRCurrency from "../../helpers/displayCurrency.js";
import {useSelector} from "react-redux";

export const OrderPage = () => {

    // fee

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [fee, setFee] = useState(0);
    const apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api';
    const apiKey = '7293aab0-b9b0-11ee-b38e-f6f098158c7e';

    useEffect(() => {
        fetchProvinceData();
    }, []);

    useEffect(() => {
        if (selectedProvince) fetchDistrictsData(selectedProvince);
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWardsData(selectedDistrict);
            fetchService(selectedDistrict)
                .then(serviceId => setSelectedServiceId(serviceId))
                .catch(error => console.error(error));
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedWard && selectedDistrict && selectedServiceId) {
            fetchFee(selectedWard, selectedDistrict, selectedServiceId);
        }
    }, [selectedWard, selectedDistrict, selectedServiceId]);

    const fetchProvinceData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/master-data/province`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: apiKey,
                },
            });
            setProvinces(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu tỉnh:', error);
        }
    };

    const fetchDistrictsData = async (provinceId) => {
        try {
            const response = await axios.get(`${apiUrl}/master-data/district`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: apiKey,
                },
                params: { province_id: provinceId },
            });
            setDistricts(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu quận/huyện:', error);
        }
    };

    const fetchWardsData = async (districtId) => {
        try {
            const response = await axios.get(`${apiUrl}/master-data/ward`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: apiKey,
                },
                params: { district_id: districtId },
            });
            setWards(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu phường/xã:', error);
        }
    };

    const fetchService = async (districtId) => {
        try {
            const serviceResponse = await axios.get(`${apiUrl}/v2/shipping-order/available-services`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: apiKey,
                },
                params: {
                    shop_id: 4868495,
                    from_district: 1788,
                    to_district: districtId,
                },
            });

            if (serviceResponse.data.data && serviceResponse.data.data.length > 0) {
                const firstService = serviceResponse.data.data[0];
                return firstService.service_id;
            } else {
                console.log('Không tìm thấy dịch vụ nào.');
                return '';
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
            throw error;
        }
    };

    const fetchFee = async (wardCode, districtId, serviceId) => {
        try {
            const feeResponse = await axios.get(`${apiUrl}/v2/shipping-order/fee`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: apiKey,
                },
                params: {
                    from_district_id: 1788,
                    to_district_id: districtId,
                    to_ward_code: wardCode,
                    service_id: serviceId,
                    height: 50,
                    length: 20,
                    weight: 200,
                    width: 20,
                    insurance_value: 0,
                },
            });

            if (feeResponse.data && feeResponse.data.data) {
                setFee(feeResponse.data.data.total);
            } else {
                console.log('Lỗi khi tính phí: Không nhận được dữ liệu');
            }
        } catch (error) {
            console.error('Lỗi khi lấy phí:', error);
        }
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        setSelectedServiceId('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedWard('');
        setSelectedServiceId('');
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const [data, setData] = useState([])
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
    useEffect(() => {
        fetchData()
    }, [])
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
    const total = totalPrice + fee;
    const user = useSelector(state => state?.user?.user)
    const handleOrder = async (e) => {
        e.preventDefault()
        const pay = document.getElementById('pay').value
        const address = `${selectedWard}, ${selectedDistrict}, ${selectedProvince}`
        const productId = data.map(item => item.productId._id)
        const subTotal = total;
        if(pay==='vnp'){
            const response = await fetch(SummaryApi.create_payment_url.url, {
                method: SummaryApi.create_payment_url.method,
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    orderId: '123456',
                    amount: subTotal
                })
            })
            const responseData = await response.json();
           window.open(responseData)
        }
        const response = await fetch(SummaryApi.orderCreate.url, {
            method: SummaryApi.orderCreate.method,
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                detail: {
                    address,
                    productId,
                },
                paymentMethod: pay,
                userId: user?._id,
                total: subTotal
            })
        })
        const responseData = await response.json()
        if (responseData.success) {
            alert(responseData.message)
        }
        if (responseData.error) {
            alert(responseData.message)
        }

    }
    return (
        <div className='container mx-auto px-4 bg-white py-4'>
            <h1 className='text-2xl font-bold mb-6'>Order Page</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <form className='space-y-4'>
                    {[
                        {id: 'name', placeholder: 'Name'},
                        {id: 'email', type: 'email', placeholder: 'Email'},
                        {id: 'phone', type: 'tel', placeholder: 'Phone'},
                    ].map(field => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className='block font-medium text-gray-700'>
                                {field.placeholder}
                            </label>
                            <input
                                type={field.type || 'text'}
                                id={field.id}
                                placeholder={field.placeholder}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                aria-label={field.placeholder}
                            />
                        </div>
                    ))}
                    <label htmlFor='pay' className='block font-medium text-gray-700'>
                        Payment
                    </label>
                    <select
                        id='pay'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    >
                        <option value='cod'>COD</option>
                        <option value='momo'>Momo</option>
                        <option value="vnp">VNP</option>
                    </select>
                    <button type='submit'
                            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                    onClick={handleOrder}
                    >
                        Order
                    </button>
                </form>

                <div className='space-y-4'>
                    <Fex
                        selectedProvince={selectedProvince}
                        provinces={provinces}
                        selectedDistrict={selectedDistrict}
                        districts={districts}
                        selectedWard={selectedWard}
                        wards={wards}
                        handleProvinceChange={handleProvinceChange}
                        handleDistrictChange={handleDistrictChange}
                        handleWardChange={handleWardChange}
                    />
                </div>

                <div>
                    <div className='border p-3'>
                        <ul className="divide-y divide-gray-200">
                            <li className="py-4">
                                {
                                    data.map((product, index) => (
                                        <div key={index} className="flex items-center space-x-4 border-amber-50">
                                            <div className="flex-shrink-0">
                                                <img className="w-10 h-10 rounded-full"
                                                     src={product.productId.productImage[0]} alt={product.productId.productName}/>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {product.productId.productName}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {product.quantity} x {displayINRCurrency(product?.productId?.sellingPrice)}
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900">
                                            <span>
                                                {displayINRCurrency(product.quantity * product?.productId?.sellingPrice)}
                                            </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </li>
                        </ul>
                        <div className="mt-4">
                           <div>
                                <div className="flex justify-between">
                                   <span className="text-lg font-bold">fee</span>
                                   <span className="text-lg font-bold">{displayINRCurrency(fee)}</span>
                               </div>
                                 <div className="flex justify-between">
                                      <span className="text-lg font-bold">Total</span>
                                      <span className="text-lg font-bold" id='total'>{displayINRCurrency(total)}</span>
                                 </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
