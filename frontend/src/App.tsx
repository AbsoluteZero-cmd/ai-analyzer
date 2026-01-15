import { useState, useEffect } from 'react';
import getAnalyses from './api';

function App() {
	const [data, setData] = useState([]);

	// useEffect(() => {
	// 	const res = getAnalyses();
	// 	setData(res);
	// }, []);

	return (
		<>
			<p className='read-the-docs'>12324</p>
			{/* {data} */}
		</>
	);
}

export default App;
