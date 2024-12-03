import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form data before submission
  const validateForm = () => {
    const formErrors = { email: '', password: '' };
    let isValid = true;

    // Validate email
    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/login-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
  
      if (response.ok) {
        // Assuming the response contains accessToken and userData
        localStorage.setItem('accessToken', data.accessToken); // Store the token
        localStorage.setItem('user', JSON.stringify(data)); // Store the user data
        navigate('/precbt');
      } else {
        // Handle errors from the server (wrong email/password)
        setErrors(prevErrors => ({
          ...prevErrors,
          password: data.message || 'Login failed. Please try again.',
        }));
      }
    } catch (error) {
      // Handle network errors
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Network error. Please try again later.',
      }));
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src="logonew.png" alt="Logo" className="mx-auto mb-4 w-20" />
          <h1 className="font-sans font-bold text-2xl text-violet-900">MANIFESTATION EDUCATIONAL CONSULT</h1>
          <h2 className="text-xl font-semibold uppercase font-mono text-red-500">Login to start quiz</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-3 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-800 text-white rounded-md focus:outline-none hover:bg-blue-900 uppercase font-mono font-bold"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <div className="pt-2">
          <p>Don't have an account? Sign up <Link className="text-red-500" to="/register">Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
