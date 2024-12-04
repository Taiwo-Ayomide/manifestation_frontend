import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pre_exam = () => {
  const [programme, setProgramme] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Function to handle form submission
  const handleSubmit = async () => {
    if (programme && semester && session) {
      try {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');
  
        if (!accessToken) {
          alert('You are not authorized. Please log in again.');
          navigate('/');
          return;
        }
  
        // Send the request with programme, semester, and session data
        const response = await axios.post(
          'http://localhost:5000/api/start-quiz',
          { programme, semester, session },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
            },
          }
        );
  
        if (response.data.success) {
          // If quiz is found, redirect to the exam page with quiz data
          navigate(`/exam/${response.data.examId}`, {
            state: { questions: response.data.questions },  // Assuming examId is returned
          });
        } else {
          alert('No quiz found for selected options.');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized. Please log in again.');
          navigate('/');
        } else {
          alert('Something went wrong while fetching the quiz.');
        }
      }
    } else {
      alert('Please select all fields.');
    }
  };
  
  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <fieldset className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md mt-12">
        <div className="flex justify-center text-center">
          <img src="logonew.png" className="w-20 rounded-lg" alt="manifestation_logo" />
        </div>

        <div className="flex justify-center pt-2">
          <h1 className="uppercase font-bold">
            Welcome {user ? user.name : 'User'}
          </h1>
        </div>

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
