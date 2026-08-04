// Small fetch-based API client for the Lulu Mart Bangalore backend.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }
  return res.json()
}

export const api = {
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return fetch(`${API_URL}/products${qs ? `?${qs}` : ''}`).then(handle)
  },
  getProduct: (id) => fetch(`${API_URL}/products/${id}`).then(handle),
  createOrder: (order) =>
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).then(handle),
  payOrder: (id, paymentMethod) =>
    fetch(`${API_URL}/orders/${id}/pay`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod }),
    }).then(handle),
}
