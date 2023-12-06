import loginImage from '@/assets/logo.png';
import loginPageBg from '@/assets/loginBg.jpg';
import { Button } from '@/components/ui/button';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase';
import { useEffect } from 'react';

const LoginPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.addScope('https://www.googleapis.com/auth/calendar');
  googleAuthProvider.addScope('https://www.googleapis.com/auth/firebase.database');
  const loginGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((codeResponse) => {
        console.log('codeResponse', codeResponse);
        if (currentUser) {
          navigate('/dashboard');
        }
      })
      .catch((error) => console.log('error!', error.code));
  };

  const loginAnonymously = () => {
    signInAnonymously(auth)
      .then((codeResponse) => {
        console.log('codeResponse', codeResponse);
        if (currentUser) {
          navigate('/dashboard');
        }
      })
      .catch((error) => console.log('error!', error.code));
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    navigate('/dashboard');
  }, [currentUser]);

  return (
    <div className='w-screen h-screen flex flex-col gap-20 bg-cover bg-gray-400 bg-blend-multiply justify-center select-none' style={{backgroundImage: `url(${loginPageBg})`}}>
      <section className='flex flex-col lg:flex-row items-center gap-6 justify-center'>
        <img src={loginImage} className='bg-white rounded-xl w-20 inline' />
        <h2 className='inline font-mono text-3xl lg:text-4xl mt-auto mb-0'>Ticket.<span className='text-theme'>Gantt <sup>Demo</sup></span></h2>
      </section>
      <h3 className='text-4xl lg:text-6xl font-mono login__header text-white'>Start Your Personal Project Management from NOW.</h3>
      <p className='text-lg font-mono lg:hidden'>🚧 Haven't support the<br/>mobile device yet.</p>
      <div className='flex flex-col gap-8'>
        <Button className='w-44 mx-auto bg-theme rounded-xl text-white hover:bg-white hover:text-theme' onClick={() => loginGoogle()}>Sign in with Google</Button>
        <Button className='w-44 mx-auto bg-transparent border-text border-2 rounded-xl text-white hover:bg-gray hover:border-text' onClick={() => loginAnonymously()}>Guest Login</Button>
      </div>
    </div>
  )
}

export default LoginPage;
