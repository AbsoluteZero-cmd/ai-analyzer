import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
	return (
		<div className='container mx-auto'>
			<Navbar />
			<div className='max-w-3xl mx-auto'>{children}</div>
		</div>
	);
};

export default Layout;
