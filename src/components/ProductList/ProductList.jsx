import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { addComment } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';


const ProductList = ({ products, handleDeleteProduct }) => {
  const { user } = useContext(UserContext);
  const [commentInputs, setCommentInputs] = useState({});
  const navigate = useNavigate();
  // Handle input change for comment fields
  const handleInputChange = (productId, value) => {
    setCommentInputs((prev) => ({ ...prev, [productId]: value }));
  };

  // Submit comment for a product
  const handleCommentSubmit = async (e, productId) => {
    e.preventDefault();
    const content = commentInputs[productId]?.trim();
    if (!content) return;

    try {
      const updatedProduct = await addComment(productId, { text: content });
      // Update the product in the state
      const updatedProducts = products.map((p) =>
        p._id.toString() === updatedProduct._id.toString() ? updatedProduct : p
      );
      // Update local state
      setCommentInputs((prev) => ({ ...prev, [productId]: '' }));
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };
  

  return (
    <div> 
      {products.map((product) => {
        console.log(product._id, product.expiryDate, typeof product.expiryDate);
        // Check if current user is the owner of the product
        const isOwner =
          user && product.user && user._id.toString() === product.user._id.toString();
        

        return (
          <div
            key={product._id}
            className={styles.card}
          >
            <h3>{product.name}</h3>
            <p>Brand: {product.brand || 'N/A'}</p>
            <p>Category: {product.category?.name || 'Uncategorized'}</p>
            <p>Added by: {product.user?.username || 'Unknown'}</p>

            
            {isOwner && product.expiryDate && ( 
              <p>
                Expiry:{' '} 
                {new Date (product.expiryDate).toLocaleDateString('en-US',{
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            )}

            
            {isOwner && (
              
              <div className={styles.buttonGroup}>

                <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => navigate(`/products/${product._id}/edit`)}>
                  Edit
                </button>

                <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </button>
              </div>
            )}

            {/* Comments section */}
            <div>
              <h4>Comments:</h4>
              {product.comments && product.comments.length > 0 ? (
                product.comments.map((comment, index) => (
                  <div
                    key={comment._id || index}
                  >
                   {comment.user?.username || 'Unknown'}: {comment.text}
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}

              {/* Add comment form */}
              <form
                onSubmit={(e) => handleCommentSubmit(e, product._id)}
                
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[product._id] || ''}
                  onChange={(e) => handleInputChange(product._id, e.target.value)}
                
                />
                <button className={`${styles.button} ${styles.cancelButton}`} type="submit">Submit</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
