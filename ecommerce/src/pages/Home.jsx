import React from 'react'
import Promo from '../components/Promo'
import CategoryFilters from '../components/CategoryFilters'
import Navbar2 from "../components/Navbar2"
import StripePay from '../stripe/stripedoc/StripePay'
import Footer from '../components/Footer'
import FeatureSection from '../components/FeatureSection'
import FeaturedProducts from '../components/FeaturedProducts'

const Home = () => {
  return (
    <div>
        <Navbar2/>
        <Promo />
        {/* <StripePay/> */}
        {/* <CategoryFilters/> */}
        <FeaturedProducts/>
        <Footer/>
    </div>
  )
}

export default Home