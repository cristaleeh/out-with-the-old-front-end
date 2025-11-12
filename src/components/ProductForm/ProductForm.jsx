import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService';
import * as productService from '../../services/productService';
import { getProduct } from '../../services/productService';
import styles from './ProductForm.module.css';


const ProductForm = ({ handleAddProduct, handleUpdateProduct, product: propProduct }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(propProduct || null);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    openedDate: '',
    monthsAfterOpening: '',
    category: '',
    subcategory: '',
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch product if editing and propProduct not provided
useEffect(() => {
  if (!product && productId) {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setFormData({
          name: data.name || '',
          brand: data.brand || '',
          openedDate: data.openedDate || '',
          monthsAfterOpening: data.monthsAfterOpening || '',
          category: data.category?._id || '',
          subcategory: data.subcategory?._id || '',
        });
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };
    fetchProduct();
  }
}, [productId, product]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Update subcategories when parent category changes
  useEffect(() => {
    const parent = categories.find((c) => c._id === formData.category);
    setSubcategories(parent?.subcategories || []);

    setFormData((prev) => ({
      ...prev,
      subcategory:
        parent?.subcategories.find((sc) => sc._id === prev.subcategory)?._id || '',
    }));
  }, [formData.category, categories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      brand: formData.brand,
      openedDate: formData.openedDate,
      monthsAfterOpening: formData.monthsAfterOpening,
      category: formData.subcategory || formData.category,
    };

    try {
      if (product) {
        await handleUpdateProduct(product._id, payload);
      } else {
        await handleAddProduct(payload);
      }
      navigate('/products');
    } catch (err) {
      console.error('Failed to submit product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Product Name"
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        name="brand"
        value={formData.brand}
        placeholder="Brand"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="date"
        name="openedDate"
        value={formData.openedDate}
        onChange={handleChange}
        required
        className={styles.inputField}
      />
      <input
        type="number"
        name="monthsAfterOpening"
        value={formData.monthsAfterOpening}
        placeholder="Shelf life in months"
        onChange={handleChange}
        className={styles.inputField}
      />

      {/* Parent Category */}
      <select name="category" value={formData.category} onChange={handleChange} required className={styles.selectField}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Subcategory */}
      {subcategories.length > 0 && (
        <select name="subcategory" value={formData.subcategory} onChange={handleChange} className={styles.selectField}>
          <option value="">Select Subcategory </option>
          {subcategories.map((sc) => (
            <option key={sc._id} value={sc._id}>
              {sc.name}
            </option>
          ))}
        </select>
      )}

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>{product ? 'Update Product' : 'Add Product'}</button>
        {product && (
          <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={() => navigate('/products')}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
