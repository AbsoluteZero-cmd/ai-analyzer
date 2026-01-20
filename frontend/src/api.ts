const API_URL = import.meta.env.VITE_API_URL || 'http://backend:8000';

const fetchApi = async (path: string, options: RequestInit = {}) => {
	return fetch(`${API_URL}${path}`, {
		...options,
		credentials: 'include',
	});
};

const fetchProtected = async (path: string, options: RequestInit = {}) => {
	try {
		const res: Response = await fetchApi(path, options);
		if (res.status === 401 || res.status === 403) {
			window.location.href = '/login';
			return;
		}

		return await res.json();
	} catch (error) {
		console.log(error);
	}
};

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

	if (!res.ok) throw new Error('Login failed');
	window.location.href = '/dashboard';
	return await res.json();
};

const me = async () => {
	const res = await fetchProtected('/users/me');
	console.log(res);
	return res;
};

const logout = async () => {
	const res = await fetch(`${API_URL}/logout`, {
		method: 'POST',
		credentials: 'include',
	});

	console.log('logout');
	if (!res.ok) throw new Error('Login failed');
	return await res.json();
};

export {
	getAnalyses,
	postAnalysis,
	getAnalysesDetail,
	deleteAnalysis,
	login,
	me,
	logout,
};
