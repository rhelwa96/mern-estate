import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function SignIn() {
  const [FormData,setFormData]=useState({});
  const [Loading,setLoading]=useState(false);
  const [Error,setError]=useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...FormData,[e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // Avoid Refreshing page
    try {
      setLoading(true);
      setError(false);
      const res = await fetch ('/api/auth/signin',{
        method: 'POST',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(FormData),
        });
      const data = await res.json(); 
      setLoading(false);
       if(data.success===false){
        console.log(data.message);
        setError(true);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(true);
      return


      
      
    }
  }
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
 
        <input 
          type='email'
          placeholder='email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input 
          type='password'
          placeholder='password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={Loading} 
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
          {Loading ? "Loading...":"Sign In"}
        </button>
      

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account</p>
        <Link to='/sign-up'>
            <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 m-2' >{Error && "Something return wrong" }</p>

    </div>
  )
}
