import React from 'react'
import ProductList from './../components/ProductList';
import CategoryFilters from '../components/CategoryFilters';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProdList() {
  return (
    <div>
        <Navbar/>
        <CategoryFilters/>
        <Footer/>
        {/* <ProductList /> */}
    </div>
  )
}

export default ProdList