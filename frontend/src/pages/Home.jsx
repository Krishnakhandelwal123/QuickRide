import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-[url("./assets/traffic.png")] bg-position-[-50px_center] bg-cover h-screen pt-7 flex flex-col justify-end w-full'>
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-2xl font-semibold'>Get Started with QuickRide</h2>
            <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
