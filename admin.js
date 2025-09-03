// Modern Admin helper for MySQL-backed product management
// Provides utility functions that complement logic embedded in upload.html

const AdminAPI = (() => {
    const base = '';

    async function request(path, options = {}) {
        const res = await fetch(base + path, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json().catch(() => ({}));
        if (data.success === false) throw new Error(data.message || 'API error');
        return data;
    }

    return {
        list: () => request('/api/products'),
        get: (id) => request(`/api/products/${id}`),
        create: (p) => request('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: p.name,
                category: p.category,
                price: p.price,
                description: p.description,
                image_url: p.image,
                gumroad_url: p.gumroadUrl,
                developer_name: p.developer
            })
        }),
        update: (p) => request(`/api/products/${p.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: p.name,
                category: p.category,
                price: p.price,
                description: p.description,
                image_url: p.image,
                gumroad_url: p.gumroadUrl,
                developer_name: p.developer
            })
        }),
        remove: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),
        health: () => request('/health')
    };
})();

window.DStudiosAdmin = AdminAPI;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await AdminAPI.health();
        console.log('Admin: API reachable');
    } catch (e) {
        console.warn('Admin: API not reachable yet');
    }
});
