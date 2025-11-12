const ProductComments = ({ comments }) => (
  <div className="comments">
    <h4>Comments:</h4>
    {comments.map(c => (
      <div key={c._id} className="comment">
        <p><strong>{c.user?.username}:</strong> {c.text}</p>
        <small>{c.date}</small>
      </div>
    ))}
  </div>
);

export default ProductComments;
