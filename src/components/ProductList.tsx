'use client';

import { useEffect, useState } from 'react';
import { Product } from '../types/products';
import { getProducts, searchProducts } from '@/api/index';
import Link from 'next/link';

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(initialProducts.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'name-asc' | 'name-desc'>('name-asc');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (!searchQuery.trim()) {
          const data = await getProducts();
          setProducts(data.products);
          setDisplayedProducts(data.products.slice(0, 10));
          return;
        }

        setLoading(true);
        const data = await searchProducts(searchQuery);
        setProducts(data.products);
        setDisplayedProducts(data.products.slice(0, 10));
      } catch (error) {
        console.error('Error ', error);
        setError('Qidiruvda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const handleShowMore = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + 10);
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
  };

  const sortedProducts = sortProducts(displayedProducts);

  if (error) {
    return (
      <div className="error-message">{error}</div>
    );
  }

  return (
    <>
      <div className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mahsulotlarni qidirish..."
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="select-input"
          >
            <option value="name-asc">Nomi (A-Z)</option>
            <option value="name-desc">Nomi (Z-A)</option>
            <option value="price-asc">Narxi (Arzondan qimmatga)</option>
            <option value="price-desc">Narxi (Qimmatdan arzonga)</option>
            <option value="rating-asc">Reyting (Pastdan yuqoriga)</option>
            <option value="rating-desc">Reyting (Yuqoridan pastga)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="product-card">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-description">
                    {product.description}
                  </p>
                  <div className="product-info">
                    <span className="product-price">
                      ${product.price}
                    </span>
                    <div className="product-rating">
                      <span>({product.rating})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {displayedProducts.length < products.length && (
            <div className="show-more-container">
              <button onClick={handleShowMore} className="show-more-button">
                Ko'proq ko'rsatish
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
} 