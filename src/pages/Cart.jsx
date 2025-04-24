import './Cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, incrementQuantity, decrementQuantity } from './CartSlice';

function Cart({ showCart, setShowCart }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItem);

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        alert("Coming Soon!!")
    }

    // console.log("🚀 Cart Component Mounted!");


    const calculateTotalCartAmount = (cartItems) => {
        return cartItems.reduce((total, item) => {
            const itemCost = Number(item.cost) || 0;
            const itemQuantity = Number(item.quantity) || 0;
            return total + itemCost * itemQuantity;
        }, 0);
    };


    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalCartAmount(cartItems).toFixed(2)}</h2>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">{item.cost}</div>
                                <div className="cart-item-quantity">
                                    <button className="cart-item-button cart-item-button-inc"
                                        onClick={() => dispatch(incrementQuantity({ name: item.name }))}>
                                        +
                                    </button>
                                    <span className="cart-item-quantity-value">{item.quantity}</span>
                                    <button className="cart-item-button cart-item-button-dec"
                                        onClick={() => dispatch(decrementQuantity({ name: item.name }))}>
                                        -
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    Total: ${Number(item.cost || 0) * Number(item.quantity || 0).toFixed(2)}
                                </div>
                                <button className="cart-item-delete" onClick={() => dispatch(deleteItem({ name: item.name }))}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="cart-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <br />
                <button className="cart-button" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart