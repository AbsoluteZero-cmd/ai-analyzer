const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getAnalyses = async () => {
	try {
		const res = await fetch(`${API_URL}/api/analyses`);
		return await res.json();
	} catch (error) {
		throw new Error('');
	}
};

const getAnalysesDetail = async (id: number) => {
	try {
		const res = await fetch(`${API_URL}/api/analyses/${id}`);
		return await res.json();
	} catch (error) {
		throw new Error('');
	}
};

const deleteAnalysis = async (id: number) => {
	try {
		const res = await fetch(`${API_URL}/api/delete/${id}`, {
			method: 'DELETE',
		});
		console.log(res);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
};

const postAnalysis = async (formData: FormData) => {
	try {
		console.log(formData);

		const res = await fetch(`${API_URL}/api/analyze`, {
			method: 'POST',
			body: formData,
		});

		const data = await res.json();
		console.log(data);
		console.log('Finished uploading');
	} catch (error) {
		console.log(error);
	}
};

const login = async (username: string, password: string) => {
	const res = await fetch(`${API_URL}/token`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ username, password }),
	});
	console.log('1');
	if (!res.ok) throw new Error('Login failed');
	return res;
};

export { getAnalyses, postAnalysis, getAnalysesDetail, deleteAnalysis, login };
