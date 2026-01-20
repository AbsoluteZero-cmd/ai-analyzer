import { useState, type FormEvent } from 'react';
import { login } from '../api';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const fetchUser = async () => {
			console.log('start');
			const res = await login(username, password);
			console.log(res);
		};

		fetchUser();
	}

	return (
		<div className='rounded-xl border border-gray-200 py-8 px-6 max-w-90 w-full'>
			<div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
				<svg
					className='h-8 w-8 text-blue-500'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
					></path>
				</svg>
			</div>

			<h3 className='mb-6 text-center text-xl font-bold text-gray-800'>
				Quick Login
			</h3>

			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='mb-4'>
					<label className='mb-1 block text-sm font-medium text-gray-700'>
						Email or Patient ID
					</label>
					<input
						type='text'
						className='w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className='mb-6'>
					<label className='mb-1 block text-sm font-medium text-gray-700'>
						Password
					</label>
					<input
						type='password'
						className='w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button
					type='submit'
					className='w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-600'
				>
					Sign In
				</button>

				<div className='mt-4 text-center'>
					<a href='#' className='text-sm text-blue-500 hover:text-blue-600'>
						Forgot Password?
					</a>
				</div>
			</form>
		</div>
	);
}
