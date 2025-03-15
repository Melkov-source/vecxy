export class HTTP {
    public static async getAsync<T>(url: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        return response.json();
    }

    public static async postAsync<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        return response.json();
    }

    public static async putAsync<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        return response.json();
    }

    public static async deleteAsync<T>(url: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        return response.json();
    }

    public static async blobAsync(url: string, options: RequestInit = {}): Promise<Blob> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        return response.blob();
    }
}