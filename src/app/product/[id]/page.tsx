import { getProduct } from '@/api';
import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>; 
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params; 
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProduct(productId);
    return <ProductDetail initialProduct={product} />;
  } catch (error) {
    notFound();
  }
}
