import { useState, useEffect } from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../../helpers/displayCurrency';
import PropTypes from 'prop-types';
import SummaryApi from "../../common/index.js";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchData }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [productData, setProductData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setCurrentPage(1);  // Reset the pagination to the first page on search change
    }, [searchQuery]);

    const filteredData = data.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handDeleteProduct = async (id) => {
        const response = await fetch(`${SummaryApi.deleteProduct.url}`, {
            method: SummaryApi.deleteProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });
        const responseData = await response.json();
        if (responseData.success) {
            toast.success(responseData.message);
            fetchData();
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className="search-bar mb-4">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    className="p-2 border rounded w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <table className='min-w-full leading-normal'>
                <thead>
                <tr className='bg-black text-white'>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Product</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Name</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Price</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Category</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Brand</th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider'>Edit</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <img src={product.productImage[0]} alt={product.productName}
                                     className="w-10 h-10 object-contain rounded"/>
                            </td>
                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <h1 className="text-lg text-gray-900 font-medium truncate">{product.productName}</h1>
                            </td>
                            <td className="align-middle px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="font-semibold text-gray-800">{displayINRCurrency(product.sellingPrice)}</p>
                            </td>
                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="font-semibold text-gray-800">{product.category}</p>
                            </td>
                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="font-semibold text-gray-800">{product.brandName}</p>
                            </td>
                            <td className="align-middle px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <button
                                    className="p-2 mx-2 bg-green-200 hover:bg-green-500 rounded-full transition-colors duration-150 ease-in-out text-green-900 hover:text-white"
                                    onClick={() => {
                                        setEditProduct(true);
                                        setProductData(product);
                                    }}>
                                    <MdModeEditOutline size={20}/>
                                </button>
                                <button
                                    className='p-2 mx-2 bg-red-300 hover:bg-red-600 rounded-full transition-colors duration-150 ease-in-out text-red-600 hover:text-white'
                                    onClick={() => handDeleteProduct(product._id)}>
                                    <MdDelete size={20}/>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6"
                            className="text-center text-gray-500 px-5 py-10 border-b border-gray-200 bg-white text-sm">
                            No products found.
                        </td>
                    </tr>
                )}
                </tbody>

            </table>
            <div className="pagination flex items-center space-x-4 justify-center mt-4">
                <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-sm font-medium leading-5 rounded-md text-white transition-colors duration-150 ${
                            currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}>
                    Previous
                </button>
                <span>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
                <button
                    onClick={() => setCurrentPage(prevPage => (indexOfLastItem < filteredData.length ? prevPage + 1 : prevPage))}
                    disabled={indexOfLastItem >= filteredData.length}
                    className={`px-4 py-2 text-sm font-medium leading-5 rounded-md text-white transition-colors duration-150 ${
                        indexOfLastItem >= filteredData.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    }`}>
                    Next
                </button>
            </div>
            {editProduct && (
                <AdminEditProduct productData={productData} onClose={() => setEditProduct(false)}
                                  fetchData={fetchData}/>
            )}
        </div>
    );
};

AdminProductCard.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default AdminProductCard;
