import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CreditCard, 
  MapPin, 
  ShoppingCart, 
  CheckCircle2, 
  Loader2,
  Tag,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

const PAYMENT_METHODS = [
  { 
    id: 'credit_card', 
    name: 'Credit/Debit Card', 
    icon: <CreditCard className="w-6 h-6" />,
    supportedNetworks: ['Visa', 'MasterCard', 'American Express']
  },
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: <CreditCard className="w-6 h-6" />,
    supportedNetworks: ['Google Pay', 'PhonePe', 'Paytm']
  },
  { 
    id: 'net_banking', 
    name: 'Net Banking', 
    icon: <CreditCard className="w-6 h-6" />,
    supportedNetworks: ['HDFC', 'SBI', 'ICICI', 'Axis']
  }
];

const AddToCart = () => {
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  // State for API-fetched products, loading, and error
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Other component states
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobile: '',
    pinCode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: ''
  });

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/user_items/cart/items/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fetched data:", response.data);

        // Combine all arrays from the response object into one array
        const fetchedData = response.data || {};
        const productsData = Object.values(fetchedData).reduce(
          (acc, val) => (Array.isArray(val) ? acc.concat(val) : acc),
          []
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsError("Failed to fetch products");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [token, userId]);

  // Add product to cart
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Calculate total cart price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + (item.discountPrice || item.actualPrice) * item.quantity, 0)
      .toFixed(2);
  };

  // -----------------------------------
  // 1) Product Listing Component (horizontal layout)
  // -----------------------------------
  const ProductListing = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Products</h2>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6" />
          <span className="font-semibold">{cart.length} Items</span>
        </div>
      </div>

      {/* Loading/Error States */}
      {isLoadingProducts ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : productsError ? (
        <div className="text-red-500 font-semibold">{productsError}</div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Left: Product Image */}
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-32 h-32 object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100">
                    <Tag className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Right: Product Details */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-green-700 font-bold mr-2">
                      ₹{product.discountPrice || product.actualPrice}
                      </span>
                      {product.discountPrice && (
                        <span className="line-through text-gray-500 text-sm">
                          ₹{product.actualPrice}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {cart.length > 0 && (
        <button 
          onClick={() => setCurrentStep(2)}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
        >
          Proceed to Cart (₹{calculateTotal()})
        </button>
      )}
    </div>
  );

  // -----------------------------------
  // 2) Cart Review Component
  // -----------------------------------
  const CartReview = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 && (
        <div className="text-center text-gray-600">
          Your cart is empty. Please add some products.
        </div>
      )}

      {cart.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4"
        >
          <div className="flex items-center mb-4 sm:mb-0">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-contain mr-4"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 mr-4">
                <Tag className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-green-700 font-bold">
              ₹{(item.discountPrice || item.actualPrice).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="bg-gray-200 px-3 py-2 rounded-l text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 border-t border-b font-semibold">
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-200 px-3 py-2 rounded-r text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <Plus size={16} />
            </button>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-xl font-bold">Total</h3>
            <span className="text-xl font-bold text-green-700">
            ₹{calculateTotal()}
            </span>
          </div>
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => setCurrentStep(1)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors font-semibold"
            >
              Back to Products
            </button>
            <button 
              onClick={() => setCurrentStep(3)}
              disabled={cart.length === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
            >
              Proceed to Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );

  // -----------------------------------
  // 3) Delivery Address Component
  // -----------------------------------
  const DeliveryAddress = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <MapPin className="w-6 h-6" />
        <span>Select Delivery Address</span>
      </h2>

      {/* Existing Addresses */}
      {addresses.map((addr, index) => (
        <div 
          key={index} 
          className={`border p-4 rounded-lg mb-4 cursor-pointer transition-colors ${
            selectedAddress === addr 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-400'
          }`}
          onClick={() => setSelectedAddress(addr)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{addr.fullName}</h3>
              <p className="text-sm text-gray-600">
                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pinCode}
              </p>
            </div>
            {selectedAddress === addr && (
              <CheckCircle2 className="text-blue-500 w-6 h-6" />
            )}
          </div>
        </div>
      ))}

      {/* Add New Address Form */}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2 text-lg">Add New Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Full Name" 
            value={newAddress.fullName}
            onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
            className="border p-2 rounded"
          />
          <input 
            placeholder="Mobile Number" 
            value={newAddress.mobile}
            onChange={(e) => setNewAddress({...newAddress, mobile: e.target.value})}
            className="border p-2 rounded"
          />
          <input 
            placeholder="Pin Code" 
            value={newAddress.pinCode}
            onChange={(e) => setNewAddress({...newAddress, pinCode: e.target.value})}
            className="border p-2 rounded"
          />
          <input 
            placeholder="Locality" 
            value={newAddress.locality}
            onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
            className="border p-2 rounded"
          />
          <input 
            placeholder="Address" 
            value={newAddress.address}
            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
            className="col-span-2 border p-2 rounded"
          />
          <input 
            placeholder="City" 
            value={newAddress.city}
            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
            className="border p-2 rounded"
          />
          <input 
            placeholder="State" 
            value={newAddress.state}
            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
            className="border p-2 rounded"
          />
        </div>
        <button 
          onClick={() => {
            setAddresses([...addresses, newAddress]);
            setSelectedAddress(newAddress);
            setNewAddress({
              fullName: '', 
              mobile: '', 
              pinCode: '', 
              locality: '',
              address: '', 
              city: '', 
              state: '', 
              landmark: ''
            });
          }}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Save Address
        </button>
      </div>

      <div className="mt-6 flex justify-between">
        <button 
          onClick={() => setCurrentStep(2)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors font-semibold"
        >
          Back to Cart
        </button>
        <button 
          onClick={() => setCurrentStep(4)}
          disabled={!selectedAddress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  // -----------------------------------
  // 4) Payment Method Component
  // -----------------------------------
  const PaymentMethod = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <CreditCard className="w-6 h-6" />
        <span>Select Payment Method</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PAYMENT_METHODS.map((method) => (
          <div 
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method)}
            className={`border p-4 rounded-lg cursor-pointer flex flex-col items-center text-center transition-colors ${
              selectedPaymentMethod?.id === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            {method.icon}
            <h3 className="mt-2 font-semibold text-lg">{method.name}</h3>
            <div className="text-xs text-gray-500 mt-1">
              {method.supportedNetworks.join(' | ')}
            </div>
            {selectedPaymentMethod?.id === method.id && (
              <CheckCircle2 className="text-blue-500 w-6 h-6 mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* Show card details if user selects credit card */}
      {selectedPaymentMethod?.id === 'credit_card' && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <input 
            placeholder="Card Number" 
            className="border p-2 rounded col-span-2"
          />
          <input 
            placeholder="Expiry (MM/YY)" 
            className="border p-2 rounded"
          />
          <input 
            placeholder="CVV" 
            className="border p-2 rounded"
          />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button 
          onClick={() => setCurrentStep(3)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors font-semibold"
        >
          Back to Address
        </button>
        <button 
          onClick={() => setCurrentStep(5)}
          disabled={!selectedPaymentMethod}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );

  // -----------------------------------
  // 5) Order Confirmation Component
  // -----------------------------------
  const OrderConfirmation = () => {
    const [orderStatus, setOrderStatus] = useState('processing');

    useEffect(() => {
      const timer = setTimeout(() => {
        setOrderStatus('confirmed');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    if (orderStatus === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-xl font-semibold">Processing your order...</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-4 text-lg">
          Your order #{Math.floor(Math.random() * 1000000)} has been placed successfully.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2 text-gray-700">
              <span>
                {item.name} <span className="font-semibold">x {item.quantity}</span>
              </span>
              <span className="font-semibold">
                ${((item.discountPrice || item.actualPrice) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 mt-2 text-gray-700">
            <span className="font-bold">Total</span>
            <span className="font-bold text-green-700">${calculateTotal()}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-2 text-gray-700">
            <span className="font-semibold mr-2">Delivery Address:</span>
            <span className="text-left sm:text-right">
              {selectedAddress?.fullName}, {selectedAddress?.address}, 
              {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pinCode}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
            Track Order
          </button>
          <button 
            onClick={() => {
              setCart([]);
              setCurrentStep(1);
            }}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  };

  // -----------------------------------
  // Step Renderer
  // -----------------------------------
  const renderStep = () => {
    switch(currentStep) {
      case 1: return <ProductListing />;
      case 2: return <CartReview />;
      case 3: return <DeliveryAddress />;
      case 4: return <PaymentMethod />;
      case 5: return <OrderConfirmation />;
      default: return null;
    }
  };

  // -----------------------------------
  // Main Component Return
  // -----------------------------------
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center mb-8 space-x-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`w-8 h-2 rounded-full transition-colors ${
                currentStep >= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default AddToCart;
