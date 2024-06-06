
export default function Fex(
    // eslint-disable-next-line react/prop-types
    { provinces, selectedProvince, selectedDistrict, selectedWard, districts,
        // eslint-disable-next-line react/prop-types
        wards, handleProvinceChange, handleDistrictChange, handleWardChange
    }
) {
    return (
        <div className='container w-full'>
            <div className="flex flex-col space-y-2 mt-2">
                <div className="w-full">
                    <label htmlFor="province"
                           className="form-label block text-sm font-medium text-gray-700">Tỉnh:</label>
                    <select id="province"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedProvince} onChange={handleProvinceChange}>
                        <option value="" disabled>--chọn tỉnh--</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {provinces.map((province) => (
                            <option key={province.ProvinceID}
                                    value={province.ProvinceID}>{province.ProvinceName}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label htmlFor="districts"
                           className="form-label block text-sm font-medium text-gray-700">Quận/Huyện:</label>
                    <select id="districts"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedDistrict} onChange={handleDistrictChange}
                            disabled={!selectedProvince}>
                        <option value="" disabled>--chọn quận/huyện--</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {districts.map((district) => (
                            <option key={district.DistrictID}
                                    value={district.DistrictID}>{district.DistrictName}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label htmlFor="ward"
                           className="form-label block text-sm font-medium text-gray-700">Phường/Xã:</label>
                    <select id="ward"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                        <option value="" disabled>--chọn phường/xã--</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>


    )
}
