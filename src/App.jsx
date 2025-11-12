import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductForm from './components/ProductForm/ProductForm';

import { UserContext } from './contexts/UserContext';
import * as productService from './services/productService';

const App = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products when user logs in
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productData = await productService.getAllProducts();
        setProducts(productData);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    if (user) fetchAllProducts();
  }, [user]);

  // Create a new product
  const handleAddProduct = async (productFormData) => {
    try {
      const newProduct = await productService.create(productFormData);
      setProducts([newProduct, ...products]);
      navigate('/products'); // go to all products after adding
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Update a product
  const handleUpdateProduct = async (productId, productFormData) => {
    try {
      const updatedProduct = await productService.update(productId, productFormData);
      setProducts(products.map((p) => (p._id === productId ? updatedProduct : p)));
      navigate(`/products/${productId}`);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Landing />} />

  
        {user && (
          <>
            <Route path="/products" element={<ProductList products={products} handleUpdateProduct={handleUpdateProduct} handleDeleteProduct={handleDeleteProduct} />} />

            <Route path="/dashboard" element={<Dashboard products={products} />} />
            <Route path="/products/new" element={<ProductForm handleAddProduct={handleAddProduct} />} />


            <Route path="/products/:productId" element={<ProductDetails handleDeleteProduct={handleDeleteProduct} handleUpdateProduct={handleUpdateProduct} />} /> 


            <Route path="/products/:productId/edit" element={<ProductForm handleUpdateProduct={handleUpdateProduct} />} />
          </>
        )}
        {!user && (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
         </>
        )}
      </Routes>

    </>
  );
};

export default App;
