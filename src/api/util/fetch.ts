const API = import.meta.env.VITE_API_BASE_URL;

export const fetcher = async <T>(
	endpoint: string,
	init?: RequestInit,
): Promise<T> => {
	if (!API) throw new Error("API URL not set");

	const url = new URL(`${API}${endpoint}`);

	const response = await fetch(url, { ...init, credentials: "include" });

	const body = await response.json();

	if (!response.ok) {
		throw new Error(
			`CODE - ${response.status}. Received Error: ${response.statusText}`,
		);
	}
	return body;
};
