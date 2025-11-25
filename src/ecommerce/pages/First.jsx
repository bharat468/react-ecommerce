import Lenis from 'lenis'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBoxOpen } from 'react-icons/fa6'
import instance from '../config/axiosConfig'
import { useCurrency } from '../contexts/CurrencyProvider'

const First = () => {
  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const { convert, currency } = useCurrency()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      setLoading(true)
      const response = await instance.get('/product/get')
      setProduct(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function trimContent(input, len) {
    if (typeof input !== 'string') return ''
    return input.length > len ? input.slice(0, len) + '...' : input
  }

  if (loading)
    return (
      <h1 className="text-center mt-20 text-3xl text-[#C63E21] font-[Poppins] font-semibold">
        Loading...
      </h1>
    )

  return (
    <div className="min-h-screen w-full bg-[#F9F7FA] py-12 font-[Poppins]">

      {/* 🔥 Heading Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <FaBoxOpen className="text-[#C63E21] text-5xl mb-3" />
        <h2 className="text-4xl sm:text-5xl font-bold text-[#C63E21]">
          Products
        </h2>
        <div className="w-24 h-[3px] bg-[#C63E21] mt-3"></div>
      </div>

      {/* 🔥 Product Cards Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">

        {product.length > 0 &&
          product.map((obj) => (
            <div
              key={obj._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300 p-6 flex flex-col 
              items-center hover:-translate-y-2 border border-gray-200"
            >

              {/* Product Image */}
              <Link to={`/product/${obj._id}`} className="w-full flex justify-center mb-6">
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="h-[220px] w-full object-contain rounded-md"
                />
              </Link>

              {/* Product Name */}
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-center">
                <Link
                  to={`/product/${obj._id}`}
                  className="hover:text-[#C63E21] transition-colors text-[#003f51]"
                >
                  {trimContent(obj.name, 18)}
                </Link>
              </h3>

              {/* Price */}
              <p className="text-xl font-bold text-[#C63E21] mt-2">
                {currency} {convert(obj.price).toFixed(2)}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default First
