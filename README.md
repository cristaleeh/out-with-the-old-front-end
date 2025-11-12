# Out With the Old! 

Out With the Old! is a **makeup and skincare product tracker** that helps users keep track of their beauty products, monitor expiry dates, and stay organized. Inspired by a fun **Bratz-style aesthetic**, this app combines utility with playful retro design.

## Features

- **User Authentication**: Sign up, sign in, and secure session management.
- **Product Management**:
  - Add new products with name, brand, category, subcategory, and shelf life.
  - Edit or delete your own products.
- **Expiry Tracking**: Automatically calculates expiry dates based on opened date and shelf life.
- **Comments**: Users can leave comments on products.
- **Bratz-inspired UI**: Fun, retro computer font, bright gradients, and playful styling.

## Demo



## Tech Stack

- **Frontend**: React, React Router, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bratz-inspired theme using gradients, retro fonts, and CSS Modules


out-with-the-old/
├── client/                       # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   └── src/
│       ├── assets/               # Images, fonts, icons
│       ├── components/
│       │   ├── NavBar/
│       │   │   ├── NavBar.jsx
│       │   │   └── NavBar.module.css
│       │   ├── Landing/
│       │   │   ├── Landing.jsx
│       │   │   └── Landing.module.css
│       │   ├── Dashboard/
│       │   │   ├── Dashboard.jsx
│       │   │   └── Dashboard.module.css
│       │   ├── ProductList/
│       │   │   ├── ProductList.jsx
│       │   │   └── ProductList.module.css
│       │   ├── ProductForm/
│       │   │   ├── ProductForm.jsx
│       │   │   └── ProductForm.module.css
│       │   ├── ProductDetails/
│       │   │   └── ProductDetails.jsx
│       │   ├── ProductComments/
│       │   │   └── ProductComments.jsx
│       │   ├── CommentForm/
│       │   │   └── CommentForm.jsx
│       │   ├── SignUpForm/
│       │   │   ├── SignUpForm.jsx
│       │   │   └── SignUpForm.module.css
│       │   └── SignInForm/
│       │       ├── SignInForm.jsx
│       │       └── SignInForm.module.css
│       ├── contexts/
│       │   └── UserContext.jsx
│       ├── services/
│       │   ├── productService.js
│       │   └── categoryService.js
│       ├── App.jsx
│       ├── index.jsx
│       └── index.css
├── server/                       # Backend
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── category.js
│   │   ├── product.js
│   │   ├── test-jwt.js
│   │   └── users.js
│   ├── middleware/
│   │   └── verify-token.js
│   ├── models/
│       ├── category.js
│       ├── product.js
│       └── user.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── README.md
└── package.json                  


