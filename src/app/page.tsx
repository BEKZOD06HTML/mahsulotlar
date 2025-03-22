import { Product } from '../types/products';
import { getProducts } from '@/api/index';
import ProductList from '../components/ProductList';

export default async function Home() {
  const response = await getProducts();
  const products = response.products;

  return (
    <div className="container">
      <header className="header">
        <h1>Mahsulotlar</h1>
      </header>
      <ProductList initialProducts={products} />
    </div>
  );
} 