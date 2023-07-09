import ProductCard from '../components/ProductCard';
import products from '../data';

const ProductRoute = () => {
  return (
    <div>
      <div className='flex text-center justify-center items-stretch max-w-xl mx-auto mb-10 border border-slate-300 rounded-md shadow-md z-20 bg-white divide-x-2'>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Products</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Cooking Guides</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='py-6 px-4 hover:bg-blue-50'>
          <p className='text-xl'>Recipes</p>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <p className='text-3xl text-center mb-8 uppercase'>New products</p>
      <div className='p-4 max-w-7xl items-stretch mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && <p className='text-2xl text-center'>No products found</p>}
      </div>
    </div>
  );
};

export default ProductRoute;
