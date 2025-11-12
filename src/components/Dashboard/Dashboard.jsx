import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ProductList from '../ProductList/ProductList';

const Dashboard = ({ products }) => {
  const { user } = useContext(UserContext);

  if (!user || !products) return <p>Loading...</p>;

  // Filter products that belong to the current user
  const myProducts = products.filter((p) => p.user?._id === user._id);

  return (
    <div>
      <h2>My Products</h2>
      {myProducts.length === 0 ? (
        <p>You haven't added any products yet.</p>
      ) : (
        <ProductList products={myProducts} showExpiry={true} />
      )}
    </div>
  );
};

export default Dashboard;
