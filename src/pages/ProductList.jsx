import './ProductList.css'
import { useState, useEffect } from 'react'
import Cart from './Cart.jsx'
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";
import { useSelector } from 'react-redux';


function ProductList() {

    const [showCart, setShowCart] = useState(false);
    const [showproducts, setShowproducts] = useState(false);
    const [productsArray, setProductsArray] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItem);
    const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                // if (!response.ok) {
                //     throw new Error(HTTP error! status: ${response.status});
                // }

                const data = await response.json();
                console.log(data);
                setProductsArray(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleCartOnClick = (e) => {
        e.preventDefault()
        setShowCart(true);
    }

    const handleproductsOnClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowproducts(true);
    }

    const handleAddToCart = (products) => {
        dispatch(addItem(products));
    };

    const categoryList = Array.isArray(productsArray) && productsArray.length > 0 ? productsArray.map((element) => {
        // Make sure `groceries` exists and is an array
        const productList = Array.isArray(element.groceries) && element.groceries.length > 0
            ? element.groceries.map((product) => {
                const isInCart = cartItems.some((cartItem) => cartItem.name === product.name);
                return (
                    <li key={product.name} className={product.name}>
                        <div className="product-card">
                            <div className="product-title"><p>{product.name}</p></div>
                            <div className="product-image"><img src={product.image} alt={product.name} /></div>
                            <div className="product-price"><p>{product.cost}</p></div>
                            <div><p>{product.description}</p></div>
                            <button
                                className={`product-button ${isInCart ? 'disabled-button' : ''}`}
                                onClick={() => handleAddToCart(product)}
                                disabled={isInCart}
                            >
                                {isInCart ? 'Added To Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </li>
                );
            })
            : null;

        return (
            <div key={element.category}>
                <div className="product_heading"><p className="productname_heading">{element.category}</p></div>
                <ul className="product-list">{productList}</ul>
            </div>
        );
    }) : null;




    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="./" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Grocery</h3>
                                <i style={{ color: 'white' }}>Fresh Picks for every basket!</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handleproductsOnClick(e)} style={styleA}>Products Catalogue</a></div>
                    <div>
                        <a href="#" onClick={(e) => handleCartOnClick(e)} style={{ position: 'relative', display: 'inline-block' }}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    </path>
                                </svg>
                                {totalItemCount > 0 && <span className="cart-count">{totalItemCount}</span>}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {showCart ? (
                <Cart showCart={showCart} setShowCart={setShowCart}>
                    {console.log("here")}
                </Cart>
            ) : (
                <div className="product-grid">
                    {categoryList}
                </div>
            )}

        </div>
    );
}

export default ProductList