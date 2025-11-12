

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/category`;


export const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// ✅ Get all categories
export const getAllCategories = async () => {
  try {
    const token = localStorage.getItem('token'); // get token directly
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (err) {
    console.error('Error fetching categories:', err);
    throw err;
  }
};

// ✅ Create a new category (optional if you’ll use admin panel later)
export const createCategory = async (categoryData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  } catch (err) {
    console.error('Error creating category:', err);
    throw err;
  }
};
