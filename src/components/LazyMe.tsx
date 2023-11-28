import sorryCat from '@/assets/sorryCat.jpeg';

const LazyMe = () => {
  return (
    <div className='gap-4 flex flex-col'>
      <img className='w-1/3 mx-auto rounded-xl' src={sorryCat} alt='A cat feels sorry' />
      <p className='text-2xl'>很抱歉，此頁面趕工中</p>
    </div>
  )
}

export default LazyMe