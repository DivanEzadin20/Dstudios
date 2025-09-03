// Product management functionality refactored for MySQL API
class ProductManager {
    constructor() {
        this.base = '';
        this.products = [];
        this.isServerConnected = false;
    }

    async checkServerConnection() {
        try {
            const res = await fetch(`${this.base}/health`);
            this.isServerConnected = res.ok;
            return this.isServerConnected;
        } catch (e) {
            this.isServerConnected = false;
            return false;
        }
    }

    async loadProducts() {
        try {
            if (!await this.checkServerConnection()) throw new Error('Server not connected');
            const res = await fetch(`${this.base}/api/products`);
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'API error');
            this.products = data.products.map(p => ({
                id: p.id,
                name: p.name,
                category: p.category,
                price: Number(p.price) || 0,
                description: p.description || '',
                image: p.image_url || 'logo.png',
                gumroadUrl: p.gumroad_url || '#',
                developer: p.developer_name || 'D STUDIOS'
            }));
            return this.products;
        } catch (err) {
            console.error('Error loading products:', err);
            return [];
        }
    }

    async addProduct(product) {
        if (!await this.checkServerConnection()) throw new Error('Server not connected');
        const res = await fetch(`${this.base}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: product.name,
                category: product.category,
                price: product.price,
                description: product.description,
                image_url: product.image,
                gumroad_url: product.gumroadUrl,
                developer_name: product.developer
            })
        });
        if (!res.ok) throw new Error('Create failed');
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Create failed');
        await this.loadProducts();
        return data;
    }

    async deleteProduct(id) {
        if (!await this.checkServerConnection()) throw new Error('Server not connected');
        const res = await fetch(`${this.base}/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Delete failed');
        this.products = this.products.filter(p => p.id !== id);
        return data;
    }
}

window.productManager = new ProductManager();
