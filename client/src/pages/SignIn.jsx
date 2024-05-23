import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
// import { useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return;
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='p-3 max-w-lg w-full'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='email'
            className='border p-3 rounded-lg'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            className='border p-3 rounded-lg'
            id='password'
            onChange={handleChange}
          />

          <button
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Sign In
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to={'/signup'}>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}