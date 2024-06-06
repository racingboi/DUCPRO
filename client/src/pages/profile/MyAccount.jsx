import { useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import uploadImage from "../../helpers/uploadImage";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../../common/index.js";
import {setUserDetails} from "../../store/userSlice.js";

function MyAccount() {
    const dispatch = useDispatch();
    // Lấy thông tin người dùng từ Redux store
    const user = useSelector(state => state.user?.user || {});
    const userId = user._id;
    // State để quản lý thông tin cá nhân
    const [profile, setProfile] = useState({
        name: user.name || '',
        email: user.email || '',
        profilePic: user.profilePic || '',
        password: user.password || ''
    });

    // Ref cho input file
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    // Xử lý thay đổi thông tin form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Xử lý thay đổi file ảnh đại diện
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const uploadedImage = await uploadImage(file);
            setProfile(prevState => ({
                ...prevState,
                profilePic: uploadedImage.url
            }));
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    // Mở dialog để chọn file khi nhấn vào khu vực upload
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const fetchUserDetails = async () => {
        const dataResponse = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: 'include'
        })
        const dataApi = await dataResponse.json()
        localStorage.setItem('user', JSON.stringify(dataApi.data))

        if (dataApi.success) {
            dispatch(setUserDetails(dataApi.data))
        }

    }

    // Gửi dữ liệu cập nhật thông tin người dùng lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch(SummaryApi.Update_current_user.url, {
                method: SummaryApi.Update_current_user.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...profile, userId})
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

    };
    const data = localStorage.getItem('user')
        useEffect(() => {
            fetchUserDetails();

        }, [data]);

    // JSX cho component
    return (
        <div className="container mx-auto p-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h1 className="text-xl font-bold mb-4">My Account</h1>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={profile.name} onChange={handleChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={profile.email} onChange={handleChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={profile.password} onChange={handleChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatarUpload">Avatar</label>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'
                         onClick={handleFileInputClick}>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                            <span className='text-4xl'><FaCloudUploadAlt /></span>
                            <p className='text-sm'>Upload Avatar Image</p>
                        </div>
                    </div>
                    <input type='file' id="avatarUpload" ref={fileInputRef} className='hidden' onChange={handleFileChange}/>
                </div>

                {profile.profilePic && (
                    <div className='relative group w-20 h-20 mb-4'>
                        <img
                            src={profile.profilePic}
                            alt="Avatar"
                            className='w-full h-full object-cover rounded-full'
                        />
                        <button
                            type="button"
                            className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer'
                            onClick={() => setProfile(prevState => ({ ...prevState, profilePic: '' }))}
                        >
                            <MdDelete />
                        </button>
                    </div>
                )}

                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                </button>
            </form>
        </div>
    );
}

export default MyAccount;
