import loginIcons from "../assets/signin.gif";
import { useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Context from "../context/index.jsx";
import SummaryApi from "../common/index.js";
import {toast} from "react-toastify";

const ForgotPassowrd = () => {
  const [data, setData] = useState({
    email: "",
  })
  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/login');
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  console.log("data login", data)
  return (
      <>
        <section id='forgot-passwold'>
          <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
              <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
              </div>

              <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                  <label>Email : </label>
                  <div className='bg-slate-100 p-2'>
                    <input
                        type='email'
                        placeholder='enter email'
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent'/>
                  </div>
                </div>

                <button
                    className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                  Send Email
                </button>

              </form>
            </div>
          </div>
        </section>
      </>
  )
}

export default ForgotPassowrd