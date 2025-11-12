const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

// --- Product Operations ---

const create = async (productData) => {
  const res = await fetch(BASE_URL, buildOptions(productData, 'POST'));
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
};

const update = async (productId, productData) => {
  const res = await fetch(`${BASE_URL}/${productId}`, buildOptions(productData, 'PUT'));
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
};

// Get all products (dashboard view - all users)
const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all-products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch all products');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get only current user's products
const getMyProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch your products');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get single product
const getProduct = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Create product
const createProduct = async (productData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Update product
const updateProduct = async (productId, productData) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Delete product
const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Add comment to product
const addComment = async (productId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
function buildOptions(data, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  if (data) options.body = JSON.stringify(data);
  return options;
}
export {
  create,
  update,
  getAllProducts,
  getMyProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addComment,
  buildOptions,
};
