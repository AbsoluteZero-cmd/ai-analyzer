const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAnalyses = async () => {
	try {
		const res = await fetch(`${API_URL}/api/analyses`);
		return await res.json();
	} catch (error) {
		throw new Error('');
	}
};

export default getAnalyses;
