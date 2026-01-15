import { useState, useEffect } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useParams,
} from 'react-router-dom';
import { getAnalyses, postAnalysis, getAnalysesDetail } from './api';

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

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAnalyses();
			setData(res);
			console.log(res);
		};

		fetchData();
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log('Uploading file..');

		const formData = new FormData();

		const form = e.currentTarget;

		const fileInput = form.elements.namedItem('fileInput') as HTMLInputElement;

		if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
		const file = fileInput.files[0];

		formData.append('file', file);

		postAnalysis(formData);
	};

	return (
		<>
			<h1>Analyses List</h1>
			<form method='post' onSubmit={(e) => handleSubmit(e)}>
				<input type='file' name='fileInput' id='file' />
				<button type='submit'>Submit</button>
			</form>
			<ul>
				{data.map((item) => (
					<li key={item.id}>
						<Link to={`/analyses/${item.id}`}>{item.filename}</Link>
					</li>
				))}
			</ul>
		</>
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
