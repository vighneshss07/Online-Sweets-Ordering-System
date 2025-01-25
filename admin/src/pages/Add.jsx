import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Add = ({token}) => {

  const[image1, setImage1] = useState(false)
  const[image2, setImage2] = useState(false)
  const[image3, setImage3] = useState(false)
  const[image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Rice");
  const [subCategory, setSubCategory] = useState("Rice");
  const [bestseller, setBestseller] = useState("false");
  const [sizes, setSizes] = useState([]);
 
  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  return (
    <form onSubmit={onSubmitHandler}className='flex flex-col w-full items-start gap-3'>
      <div>
      <p className='mb-2'>Upload Image</p>

      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img classNamel='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
        </label>

        <label htmlFor="image2">
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
        </label>

        <label htmlFor="image3">
          <img classNamel='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
        </label>

        <label htmlFor="image4">
          <img classNamel='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
        </label>
      </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>


    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

      <div>
      <p className='mb-2'>Product category</p>
      <select onChange={(e)=> setCategory(e.target.value)}className='w-full px-3 py-2'>
      <option value="Rice">Rice</option>
      <option value="Oil">Oil</option>
      <option value="Flour">Flour</option>
      <option value="Sugar">Sugar</option>
      <option value="Masala">Masala</option>
      <option value="Nuts">Nuts</option>
      <option value="Dal">Dal</option>
      <option value="Sweet">Sweet</option>
      <option value="Salt">Salt</option>
      <option value="Cafe">Cafe</option>
      </select>
      </div>

      <div>
      <p className='mb-2'>Sub category</p>
      <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
     <option value="Species">Species</option>
      <option value="Powder">Powder</option>
      <option value="Ghee">Ghee</option>
      <option value="Others">Others</option>
      </select>
      </div>
      <p>Product Price</p>
      <input onChange={(e)=> setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
    </div>

    <div>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>

      <div onClick={()=>setSizes(prev => prev.includes("50g") ? prev.filter(item=> item !=="50g") : [...prev, "50g"])}>
          <p className={`${sizes.includes("50g") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>50g</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("100g") ? prev.filter(item=> item !=="100g") : [...prev, "100g"])}>
          <p className={`${sizes.includes("100g") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>100g</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("250g") ? prev.filter(item=> item !=="250g") : [...prev, "250g"])}>
          <p className={`${sizes.includes("250g") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>250g</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("500g") ? prev.filter(item=> item !=="500g") : [...prev, "500g"])}>
          <p className={`${sizes.includes("500g") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>500g</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("1KG") ? prev.filter(item=> item !=="1KG") : [...prev, "1KG"])}>
          <p className={`${sizes.includes("1KG") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>1Kg</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("2KG") ? prev.filter(item=> item !=="2KG") : [...prev, "2KG"])}>
          <p className={`${sizes.includes("2KG") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>2Kg</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("5KG") ? prev.filter(item=> item !=="5KG") : [...prev, "5KG"])}>
          <p className={`${sizes.includes("5KG") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>5Kg</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("100ml") ? prev.filter(item=> item !=="100ml") : [...prev, "100ml"])}>
          <p className={`${sizes.includes("100ml") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>100ml</p>
        </div>
        
        <div onClick={()=>setSizes(prev => prev.includes("250ml") ? prev.filter(item=> item !=="250ml") : [...prev, "250ml"])}>
          <p className={`${sizes.includes("250ml") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>250ml</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("500ml") ? prev.filter(item=> item !=="500ml") : [...prev, "500ml"])}>
          <p className={`${sizes.includes("500ml") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>500ml</p>
        </div>

        <div onClick={()=>setSizes(prev => prev.includes("1L") ? prev.filter(item=> item !=="1L") : [...prev, "1L"])}>
          <p className={`${sizes.includes("1L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>1L</p>
        </div>
    
      </div>
      </div>

    <div className='flex gap-2 mt-2'>
      <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
      <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
    </div>
  <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD

  </button>
    </form>
    
    
  )
}

export default Add
