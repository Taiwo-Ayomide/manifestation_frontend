import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Reusable Input Component
const InputField = ({ label, type = 'text', name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md outline-none"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    center: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    center: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formErrors = { name: '', email: '', center: '', password: '' };
    let isValid = true;

    if (!formData.name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.center) {
      formErrors.center = 'Center is required';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const registerUser = async (formData) => {
    const response = await fetch('https://pgschool-api.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // If response is not ok, throw an error with the response body
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const data = await registerUser(formData);
        alert('Registration successful!');
        // Optionally redirect user or clear form
        setFormData({
          name: '',
          email: '',
          center: '',
          password: '',
        });
      } catch (error) {
        // Handle errors from the server (display the server error message)
        alert('Registration failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src="logonew.png" alt="Logo" className="mx-auto mb-4 w-20" />
          <h1 className='font-sans font-bold text-2xl text-violet-900'>MANIFESTATION EDUCATIONAL CONSULT</h1>
          <h2 className="text-xl font-semibold uppercase font-mono text-red-500">Past questions Registration portal</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="center">Center</label>
            <select
              id="center"
              name="center"
              value={formData.center}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            >
              <option value="">Select a center</option>
              <option value="BOLMOR IBADAN">BOLMOR IBADAN</option>
              <option value="CILGPAN EBUTE META">CILGPAN EBUTE META</option>
              <option value="CIPSMN LAGOS">CIPSMN LAGOS</option>
              <option value="CIS APAPA">CIS APAPA</option>
              <option value="CLASS IFE">CLASS IFE</option>
              <option value="COOPERATIVE">COOPERATIVE</option>
              <option value="FRANK AND NOBLE">FRANK AND NOBLE</option>
              <option value="GRACE FIELD OSOGBO">GRACE FIELD OSOGBO</option>
              <option value="IBADAN ACADEMY">IBADAN ACADEMY</option>
              <option value="IGLSA LAGOS">IGLSA LAGOS</option>
              <option value="ILA COLLEGE">ILA COLLEGE</option>
              <option value="ILORIN COLLEGE">ILORIN COLLEGE</option>
              <option value="INKLITE">INKLITE</option>
              <option value="ISAMS YABA">ISAMS YABA</option>
              <option value="ISOWN">ISOWN</option>
              <option value="MANIFESTATION">MANIFESTATION</option>
              <option value="MARCOMS">MARCOMS</option>
              <option value="MAYDAY">MAYDAY</option>
              <option value="MOLOFIN">MOLOFIN</option>
              <option value="MOLOFIN IKOYI">MOLOFIN IKOYI</option>
              <option value="MOSMER">MOSMER</option>
              <option value="MOSNA">MOSNA</option>
              <option value="OBS">OBS</option>
              <option value="OLUFUNMILAYO">OLUFUNMILAYO</option>
              <option value="PANCOED">PANCOED</option>
              <option value="PGS">PGS</option>
              <option value="PRIVILEDGE AND PEACE">PRIVILEDGE AND PEACE</option>
              <option value="QUALITY EDUCATION">QUALITY EDUCATION</option>
              <option value="RAISING & STAR">RAISING & STAR</option>
              <option value="RONIK EJIGBO">RONIK EJIGBO</option>
              <option value="ROYAL">ROYAL</option>
              <option value="ROYAL KNOWLEDGE">ROYAL KNOWLEDGE</option>
              <option value="WINESS MODEL COLLEGE">WINESS MODEL COLLEGE</option>
            </select>
            {errors.center && <p className="text-red-500 text-xs mt-1">{errors.center}</p>}
          </div>

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

          <button
            type="submit"
            className="w-full py-2 bg-blue-800 text-white rounded-md focus:outline-none hover:bg-blue-900 uppercase font-mono font-bold"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <div className="pt-2">
          <p>Already have an account? Login <Link className="text-red-500" to="/">Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
