import React, { useState, useEffect } from 'react';

const AdminPanel = () => {

  const [meruid, setMerUid]     = useState('');
  const [mername, setMerName]   = useState('');
  const [fbpixle, setFbPixle]   = useState('');
  const [error, setError]       = useState('');
  
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;


  
  // Fetch user data when the component mounts
  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/getdata`);
        const data = await response.json();

        //console.log(data);

        setMerUid(data.gpr_meruid || '');
        setMerName(data.gpr_mername || '');
        setFbPixle(data.gpr_fbpxl || '',);
        //console.log(users);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
      
    };
    
    fetchUserData();
  }, [API_URL]);


  if (!token) {
    window.location.href = '/';
    return null; // Prevent rendering if not authenticated
  }

  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('token');

    // Optionally redirect to the login page or home page
    window.location.href = '#/lgn'; // Adjust the path as necessary
  };

  
  const UpdateSubmitdb = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await fetch('https://recharge.myrecharge.info/api/auth/updtdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meruid, mername, fbpixle }),
      });
  
      const data = await response.json();

      //console.log(response.ok);
      //console.log(data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '#/dashboard';
        setError("Sucssefully Updated");
      } else {
        console.error('Error:', data.message); // Log the error message
        setError(data.message);
      }

    } catch (error) {
      console.error('Fetch Error:', error); // Log any fetch errors
      setError('An error occurred');
    }
  };
    
 
  
  return (
    <div>

      <div className=" px-5 my-0 bg-blue-50 py-10">

        <h1 className="text-[20px] font-bold text-center  mt-[-2.1px]">Admin Dashboard</h1>
        <p className='text-center'>Welcome to the admin dashboard!</p>
        <div className="px-5 pt-1">
          <button className="bg-blue-500 py-2 w-full text-[13.2px] rounded-full font-bold text-white" onClick={handleLogout}> Logout </button>
        </div>
        <div className="px-5 pt-1">
          <button className="bg-blue-500 py-2 w-full text-[13.2px] rounded-full font-bold text-white" onClick={UpdateSubmitdb}> Update </button>
        </div>
        {error && <p className='text-center mt-5' style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="px-5 bg-white pt-1">
        <div className="bg-white rounded-xl p-4 my-4 shadow-xl shadow-blue-100 border-t border-blue-500">

          <div className="bg-rose-600 py-1 px-3 rounded text-white text-center text-[100px] font-bold w-full">Payment API Detail</div>         
          <div className='mt-3'>
            <label className="text-[13px] ml-1 font-bold">Merchant UPI ID ::</label>
            <input
              type="text"
              name='memuid'
              value={meruid}
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setMerUid(e.target.value)}
              required
            />
              <label className="text-[13px] ml-1 font-bold">Merchant Name ::</label>
            <input
              type="text"
              name='mername'
              value={mername}
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setMerName(e.target.value)}
              required
            />
              <label className="text-[13px] ml-1 font-bold">***************************************************************</label>
            <input              
              type="hidden"
              value=""
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          
        </div>
      </div>

      <div className="px-5 bg-white pt-1">
        <div className="bg-white rounded-xl p-4 my-4 shadow-xl shadow-blue-100 border-t border-blue-500">

          <div className="bg-rose-600 py-1 px-3 rounded text-white text-center text-[100px] font-bold w-full">FAcebook Pixle Detail</div>         
          <div className='mt-3'>
            <label className="text-[13px] ml-1 font-bold">FB Pixle ::</label>
            <input
              type="text"
              name='fbpixle'
              value={fbpixle}
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setFbPixle(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className=" px-5 my-0 py-10">

        <button onClick={UpdateSubmitdb} className="bg-blue-500 py-2 w-full text-[13.2px] rounded-full font-bold text-white">Update</button>

      </div>

    </div>
  );
};

export default AdminPanel;
