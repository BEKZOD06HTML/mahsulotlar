'use client';

import { Product } from '../types/products';
import Link from 'next/link';

interface ProductDetailProps {
  initialProduct: Product;
}

export default function ProductDetail({ initialProduct }: ProductDetailProps) {
  return (
    <div className="product-detail">
      <Link href="/" className="back-button">
        ← Orqaga
      </Link>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <img
            src={initialProduct.thumbnail}
            alt={initialProduct.title}
            className="main-image"
          />
        </div>

        <div className="product-info-detail">
          <h1 className="product-title-detail">{initialProduct.title}</h1>
          <p className="product-description-detail">{initialProduct.description}</p>
          
          <div className="info-grid">
            <div className="info-row">
              <span>Narxi:</span>
              <span className="product-price">${initialProduct.price}</span>
            </div>
            <div className="info-row">
              <span>Chegirma:</span>
              <span>{initialProduct.discountPercentage}%</span>
            </div>
            <div className="info-row">
              <span>Reyting:</span>
              <div className="product-rating">
                
                <span>({initialProduct.rating})</span>
              </div>
            </div>
            <div className="info-row">
              <span>Stok:</span>
              <span>{initialProduct.stock} dona</span>
            </div>
            <div className="info-row">
              <span>Brend:</span>
              <span>{initialProduct.brand}</span>
            </div>
            <div className="info-row">
              <span>Kategoriya:</span>
              <span>{initialProduct.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 