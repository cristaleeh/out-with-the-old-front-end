import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import * as productService from '../../services/productService';

const ProductDetails = ({ handleDeleteProduct }) => {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getById(productId);
        setProduct(res);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await productService.addComment(productId, {
        text: commentText,
      });
      setProduct({
        ...product,
        comments: [...product.comments, newComment],
      });
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category?.name}</p>
      <p>Opened: {product.openedDate}</p>
      <p>Expires: {product.expiryDate}</p>

      {/* Delete button */}
      {user && user._id === product.user._id && (
        <button onClick={() => handleDeleteProduct(product._id)}>
          Delete Product
        </button>
      )}

      <h3>Comments</h3>
      <ul>
        {product.comments?.map((c) => (
          <li key={c._id}>
            <strong>{c.user?.username}:</strong> {c.text}
          </li>
        ))}
      </ul>

      {user && (
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post</button>
        </form>
      )}
    </div>
  );
};

export default ProductDetails;
