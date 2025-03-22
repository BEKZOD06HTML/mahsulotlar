import { Product, ProductsResponse } from '../types/products';

const API_URL = 'https://dummyjson.com';

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
} 