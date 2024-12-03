import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Pre_exam = () => {
  const [programme, setProgramme] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');
  const [user, setUser] = useState(null); // To hold user data

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data (name, center, accessToken) from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    // If no user data is found, redirect to login
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(storedUser); // Assuming the user data is directly returned
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (programme && semester && session) {
      navigate(`/exam?programme=${programme}&semester=${semester}&session=${session}`);
    } else {
      alert('Please select all the fields.');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to login page
  };

  return (
    <fieldset className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md mt-12">
        <div className="flex justify-center text-center">
          <img src="logonew.png" className="w-20 rounded-lg" alt="manifestation_logo" />
        </div>

        {/* Welcome message with user's name */}
        <div className="flex justify-center pt-2">
          <h1 className="uppercase font-bold">
            Welcome {user ? user.name : 'User'}
          </h1>
        </div>

        {/* Center name */}
        <div className="flex justify-center pt-2">
          <p className="uppercase font-bold">
            {user ? user.center : 'Manifestation'}
          </p>
        </div>

        {/* Program, Semester, and Session Selection Form */}
        <form>
          <div className="pt-5">
            <h1 className="uppercase font-serif font-bold">Select Programme</h1>
            <select 
              className="rounded-lg w-full h-10 outline-none" 
              value={programme} 
              onChange={(e) => setProgramme(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="MBA, Financial Management">MBA, Financial Management</option>
              <option value="MBA, Human Resources Management">MBA, Human Resources Management</option>
              <option value="MBA, Procurement and Supply Chain">MBA, Procurement and Supply Chain</option>
              <option value="MBA, Marketing">MBA, Marketing</option>
              <option value="MBA, Information System">MBA, Information System</option>
              <option value="MBA, Oil and Gas">MBA, Oil and Gas</option>
              <option value="Master in Public Administration (MPA)">Master in Public Administration (MPA)</option>
              <option value="Postgraduate Studies in Management (PGDM)">Postgraduate Studies in Management (PGDM)</option>
              <option value="MSCSW">MSCSW</option>
              <option value="MCSS">MCSS</option>
            </select>
          </div>

          <div className="pt-5">
            <h1 className="uppercase font-serif font-bold">Semester</h1>
            <select 
              className="rounded-lg w-full h-10 outline-none" 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </div>

          <div className="pt-5">
            <h1 className="uppercase font-serif font-bold">Session</h1>
            <select 
              className="rounded-lg w-full h-10 outline-none" 
              value={session} 
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="2020/2021">2020/2021</option>
              <option value="2021/2022">2021/2022</option>
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>

          <div className="pt-5">
            <input 
              className="rounded-lg w-full h-10 outline-none bg-blue-800 text-white uppercase font-bold font-sans cursor-pointer" 
              type="button" 
              value="Start Quiz" 
              onClick={handleSubmit}
            />
          </div>
          <div className="pt-2">
            <input 
              className="rounded-lg w-full h-10 outline-none bg-blue-800 text-white uppercase font-bold font-sans cursor-pointer" 
              type="button" 
              value="Log out" 
              onClick={handleLogout}
            />
          </div>
        </form>
      </section>
    </fieldset>
  );
};

export default Pre_exam;
