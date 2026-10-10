# 🛒 Bazar-Dor — বাজার দর

Bazar-Dor is a responsive grocery price information web application that helps users explore everyday grocery products and check their prices in one place. Users can browse products by category, view product details, create an account, and manage their profiles.

## ✨ Features

- **Browse Products:** Explore grocery products and their price information.
- **Category-Based Navigation:** Browse products by categories such as rice, lentils, oil, vegetables, fish, meat, and eggs.
- **Product Details:** View individual product information through dynamic product detail pages.
- **User Authentication:** Register and sign in using email and password.
- **Social Login:** Sign in with Google and GitHub, when configured.
- **Profile Management:** View and update user profile information.
- **Responsive Design:** Enjoy a user-friendly interface on desktop, tablet, and mobile devices.
- **Toast Notifications:** Receive feedback for important actions and errors.

## 🧰 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- React Hot Toast
- Lucide React
- Git and GitHub
- Vercel

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd bazar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add the environment variables required by your application.

   Example:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

   Add GitHub OAuth credentials if GitHub login is configured. Use the exact variable names required by your project. Never commit real secrets to GitHub.

5. Start the development server:

   ```bash
   npm run dev
   ```

## 📦 Build for Production

Run the following command to verify that the project can be built for production:

```bash
npm run build
```

## 🌐 Deployment

This project can be deployed using [Vercel](https://vercel.com/). Configure the required environment variables in the Vercel project settings before deploying.

## 👨‍💻 Author

**Amena Begum**

Developed with ❤️ using Next.js, TypeScript, and MongoDB.
