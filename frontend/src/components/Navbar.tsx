const Navbar = () => {
	return (
		<div className='w-full bg-white rounded-xl py-3 px-6 shadow-md my-2 flex justify-between items-center'>
			<div className='flex items-baseline'>
				<h2 className='text-xl'>
					<span className='font-bold'>AI</span>Analyzer
				</h2>
				<p className='ml-6 text-sm'>About Us</p>
				<p className='ml-3 text-sm'>Pricing</p>
			</div>
			<div className='flex items-baseline'>
				<p className='mr-3 text-sm'>Login</p>
				<button className='rounded-2xl bg-yellow-500 font-medium text-white text-sm py-1 px-4 hover:bg-amber-400 transition-colors'>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default Navbar;
