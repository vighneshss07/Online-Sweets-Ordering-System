import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent')

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }



    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options*/}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS

          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rice'} onChange={toggleCategory} /> Rice
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Oil'} onChange={toggleCategory} /> Oil
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Flour'} onChange={toggleCategory} /> Flour
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sugar'} onChange={toggleCategory} /> Sugar
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Masala'} onChange={toggleCategory} /> Masala
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Nuts'} onChange={toggleCategory} /> Nuts
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dal'} onChange={toggleCategory} /> Dal
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cafe'} onChange={toggleCategory} /> Cafe
            </p>

              <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sweet'} onChange={toggleCategory} /> Sweet
            </p>

           
            

          </div>
        </div>

        {/* SubCategory Filter*/}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block `}>

          <p className='mb-3 text-sm font-medium'>TYPES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Species'} onChange={toggleSubCategory} /> Species

            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Powder'} onChange={toggleSubCategory} /> Powder
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Ghee'} onChange={toggleSubCategory} /> Ghee
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Others'} onChange={toggleSubCategory} /> Others
            </p>

          </div>
        </div>

      </div>

      {/* Right Side*/}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort*/}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by:Relevent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>

          </select>
        </div>

        {/* Map Products*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            filterProducts.map((item, index) => (
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>


    </div>


  )
}

export default Collection
