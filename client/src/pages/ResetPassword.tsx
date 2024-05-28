import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Context from '../context/index.jsx';
import SummaryApi from '../common/index.js';
// @ts-ignore
import loginIcons from '../assets/signin.gif';

const ResetPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });
    const [visibility, setVisibility] = useState({
        showPassword: false,
        showConfirmPassword: false
    });

    const toggleVisibility = (field) => {
        setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwords.password !== passwords.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        try {
            const response = await fetch(`${SummaryApi.resetPassword.url}/${id}`, {
                method: SummaryApi.resetPassword.method,
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: passwords.password })
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                navigate('/login');
                fetchUserDetails();
                fetchUserAddToCart();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred while resetting the password.");
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <section id='forgot-passwold'>
            <div className='container mx-auto p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt="login" className='w-full h-full object-cover' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        {Object.entries({
                            password: "Password",
                            confirmPassword: "Confirm Password"
                        }).map(([key, label]) => (
                            <div key={key}>
                                <label>{label}:</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={visibility[key] ? "text" : "password"}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        name={key}
                                        value={passwords[key]}
                                        onChange={handleChange}
                                        required
                                        className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer text-xl'
                                         onClick={() => toggleVisibility(`show${key.charAt(0).toUpperCase() + key.slice(1)}`)}>
                                        {visibility[key] ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto mt-6'>
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default ResetPassword;
