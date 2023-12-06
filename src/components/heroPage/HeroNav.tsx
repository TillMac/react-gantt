import loginImage from '@/assets/logo.png';
import { Link } from 'react-router-dom';

const HeroNav = () => {
  return (
    <nav className='w-full py-2 flex hero__bg'>
      <Link to='/' className='flex gap-4 py-2 border-b-2 border-transparent hover:border-b-2 hover:border-theme'>
        <img src={loginImage} className='bg-white w-10 inline' style={{ borderRadius: '8px'}} />
        <h1 className='inline font-mono text-2xl text-text mt-auto mb-0'>Ticket.<span className='text-theme'>Gantt</span></h1>
      </Link>
    </nav>
  )
}

export default HeroNav;
