import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='w-full max-w-5xl mx-auto bg-white rounded-xl py-3 px-6 shadow-md my-2 flex justify-between items-center'>
			<div className='flex items-baseline'>
				<h2 className='text-xl'>
					<Link to='/'>
						<span className='font-bold'>AI</span>Analyzer
					</Link>
				</h2>
				<Link to='/about-us'>
					<p className='ml-6 text-sm'>About Us</p>
				</Link>
				<Link to='/pricing'>
					<p className='ml-3 text-sm'>Pricing</p>
				</Link>
			</div>
			<div className='flex items-baseline'>
				<p className='mr-3 text-sm'>
					<Link to='/login'>Login</Link>
				</p>
				<button className='rounded-2xl bg-yellow-500 font-medium text-white text-sm py-1 px-4 hover:bg-amber-400 transition-colors'>
					<Link to='/dashboard'>Dashboard</Link>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
