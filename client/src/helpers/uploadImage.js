// eslint-disable-next-line no-undef
const baseURL = import.meta.env.VITE_REACT_APP_CLOUD_NAME_CLOUDINARY;
const url = `https://api.cloudinary.com/v1_1/${baseURL}/image/upload`

const uploadImage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","product_img")
    

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()

}

export default uploadImage 