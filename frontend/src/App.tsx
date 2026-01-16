import { useState, useEffect } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useParams,
} from 'react-router-dom';
import {
	getAnalyses,
	postAnalysis,
	getAnalysesDetail,
	deleteAnalysis,
} from './api';
import Navbar from './components/Navbar';
import AnalyzeForm from './components/AnalyzeForm';

interface Analysis {
	id: number;
	filename: string;
	summary: string;
	content: string;
	created_at: string;
}

const Detail = () => {
	const { analysisId } = useParams();
	const [analysis, setAnalysis] = useState<Analysis>({});

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAnalysesDetail(analysisId);
			console.log(res);
			setAnalysis(res);
		};

		fetchData();
	}, []);

	if (!analysis) return <>File doesnt exist</>;

	return (
		<>
			<h2>{analysis.filename}</h2>
			<Link to='/'>Back</Link>
			<p>
				Summary: <br />
				{analysis.summary}
			</p>
		</>
	);
};

function blobToFile(theBlob, fileName) {
	return new File(
		[theBlob], // Array containing the blob data
		fileName, // Name of the file
		{
			type: theBlob.type, // MIME type from the original blob
			lastModified: Date.now(), // Current timestamp as last modified date
		}
	);
}

const Home = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState([]);

	const [formText, setFormText] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAnalyses();
			setData(res);
			console.log(res);
		};

		fetchData();
	}, [loading]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const asyncFunc = async () => {
			const formData = new FormData();

			const blob = new Blob([formText], { type: 'text/plain' });

			const newFile: File = blobToFile(blob, file ? file.name : 'new_file.txt');
			setFile(newFile);

			formData.append('file', newFile);
			console.log(formData);

			setLoading(true);
			await postAnalysis(formData);
			setLoading(false);

			console.log('end');
		};

		asyncFunc();
	};

	const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
		const asyncFunc = async () => {
			console.log('start');
			const files = e.currentTarget.files;

			if (!files || files.length === 0) return;

			const file: File = files[0];

			setFile(file);
			console.log(file);

			const text = await file.text();
			console.log(text);

			setFormText(text);
		};

		asyncFunc();

		// const form = e.currentTarget;

		// const fileInput = form.elements.namedItem('fileInput') as HTMLInputElement;

		// if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
		// const file = fileInput.files[0];

		// const text = file.text();

		// console.log(text);
	};

	const handleDelete = async (id: number) => {
		const res = await deleteAnalysis(id);
		console.log(res);
	};

	const handleTextChange = (text: string) => {
		setFormText(text);
		console.log(text);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className='container mx-auto'>
			<Navbar />

			<div className='flex justify-center mt-12'>
				<div className='inline-flex justify-baseline text-sm text-yellow-500 text-center px-4 py-1 bg-yellow-300/10 rounded-2xl shadow-md'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						class='size-5'
					>
						<path
							fill-rule='evenodd'
							d='M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z'
							clip-rule='evenodd'
						/>
					</svg>

					<p className='ml-2'>Analyze AI</p>
				</div>
			</div>

			<h1 className='font-black text-4xl text-center my-2'>
				Lorem ipsum dolor sit Lorem, ipsum. <br />
				<span className='text-yellow-500 capitalize'>amet consectetur</span>
			</h1>

			<AnalyzeForm
				handleFileChange={handleFileChange}
				formText={formText}
				handleTextChange={handleTextChange}
				handleSubmit={handleSubmit}
			/>

			{/* <h1>Analyses List</h1>
			<form method='post' onSubmit={(e) => handleSubmit(e)}>
				<input type='file' name='fileInput' id='file' />
				<button type='submit'>Submit</button>
			</form>
			<ul>
				{data.map((item) => (
					<li key={item.id}>
						<Link to={`/analyses/${item.id}`}>{item.filename}</Link>
						<button onClick={() => handleDelete(item.id)}>
							Delete analysis
						</button>
					</li>
				))}
			</ul> */}
		</div>
	);
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/analyses/:analysisId' element={<Detail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
