import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './AboutUs'
import AboutUs from './AboutUs'
import ProductList from './ProductList'

function App() {

  const [showProductList, setShowProductList] = useState(false);

  const getStartedonClick = () => {
    setShowProductList(true);
  }

  return (
    <>
      <div className="container">
        {showProductList ? (
          <div className="product-list-page">
            <ProductList />
          </div>
        ) : (
          <div className="landing-page">
            <div className="background_image"></div>
            <div className="content">
              <div className="landing_content">
                <h1>Welcome To Paradise Nursury</h1>
                <hr className="line" />
                <p>Where Green Meets Serenity</p>
                <button className="get_started" onClick={getStartedonClick}>
                  Get Started
                </button>
              </div>
              <div className="about-us">
                <AboutUs />
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default App
