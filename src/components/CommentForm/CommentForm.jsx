import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as productService from "../../services/productService";

const CommentForm = ({ productId, onCommentAdded }) => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const updatedProduct = await productService.addComment(productId, { text });
      onCommentAdded(updatedProduct.comments);
      setText("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
        required
        style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
      />
      <button type="submit" style={{ marginTop: "4px" }}>Post Comment</button>
    </form>
  );
};

export default CommentForm;

