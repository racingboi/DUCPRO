import  { useState } from 'react';
export const Address = () => {
    const [showPaymentAddressForm, setShowPaymentAddressForm] = useState(false);
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-3">
                <div className="bg-white p-6 rounded shadow-md w-full">
                    <p className="text-gray-600 mb-4">
                        The default addresses below will be used on the product payment page.
                    </p>

                    {/* Payment Address Section */}
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold">Payment address</h3>
                            <button
                                onClick={() => setShowPaymentAddressForm(!showPaymentAddressForm)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
                            >
                                {showPaymentAddressForm ? 'HIDE' : 'MORE'}
                            </button>
                        </div>
                        {!showPaymentAddressForm &&
                            <p className="text-gray-600">You haven't added any addresses yet.</p>}
                        {showPaymentAddressForm && (
                            <form className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-gray-700">Street Address</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">City</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">State</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Zip Code</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
