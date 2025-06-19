const API_HOST = process.env.EXPO_PUBLIC_API_URL;

const buildUrl = (path: string) => {
    let normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    return `${API_HOST}${normalizedPath}`;
}

const get = async <T = unknown>(path: string) => {
    const url = buildUrl(path);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as T;
    } catch (error) {
        return null;
    }
}

export default {
    get
}