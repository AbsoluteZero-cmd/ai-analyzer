import { useState, useEffect } from 'react';
import { deleteAnalysis, getAnalyses } from '../api';
import { Link } from 'react-router-dom';

interface Analysis {
	id: number;
	filename: string;
	content: string;
	summary: string;
	created_at: string;
}

const Dashboard = () => {
	const [data, setData] = useState<list[Analysis]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAnalyses();
			setData(res);
			console.log(res);
		};

		fetchData();
	}, []);

	const handleDelete = async (id: number) => {
		const res = await deleteAnalysis(id);
		console.log(res);
	};

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className='font-bold capitalize text-lg mt-4 mb-2'>Analyses List</h1>
			<ul className='flex flex-col justify-items-center gap-2'>
				{data.map((item) => (
					<li
						className='flex shadow py-2 px-4 g-2 justify-between items-center'
						key={item.id}
					>
						<div className=''>
							<p className='text-lg'>
								<Link to={`/analyses/${item.id}`}>{item.filename}</Link>
							</p>
							<p className='text-gray-400 font-light text-sm mt-1'>
								{item.created_at}
							</p>
						</div>
						<button
							className='hover:cursor-pointer hover:bg-gray-100/50 rounded shadow-xs duration-1000 size-10 flex flex-col justify-center items-center'
							onClick={() => handleDelete(item.id)}
						>
							<svg
								className='text-red-400 size-5'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
							>
								<path
									fill-rule='evenodd'
									d='M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z'
									clip-rule='evenodd'
								/>
							</svg>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
