import React, { useContext } from 'react'
import loginImage from '@/assets/logo.png';
import loginPageBg from '@/assets/loginBg.jpg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const LoginPage = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen flex flex-col gap-20 bg-cover bg-gray-400 bg-blend-multiply justify-center select-none' style={{backgroundImage: `url(${loginPageBg})`}}>
      <section className='flex gap-6 justify-center'>
        <img src={loginImage} className='bg-white rounded-xl w-20 inline' />
        <h2 className='inline font-mono text-4xl mt-auto mb-0'>Ticket.<span className='text-theme'>Gantt</span></h2>
      </section>
      <h3 className='text-6xl mix-blend-difference'>Start Your Personal Project Management from NOW.</h3>
      <Button className='w-1/8 mx-auto bg-theme rounded-xl text-white hover:bg-white hover:text-theme' onClick={() => loginGoogle()}>Sign in with Google</Button>
    </div>
  )
}

export default LoginPage