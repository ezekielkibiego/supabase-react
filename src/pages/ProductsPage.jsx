import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else setProducts(data);
  };

  const addOrUpdateProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;

    if (editingProductId) {
      // Update existing product
      const { error } = await supabase
        .from('products')
        .update(newProduct)
        .eq('id', editingProductId);

      if (error) console.error('Error updating product:', error);
    } else {
      // Add new product
      const { error } = await supabase.from('products').insert([newProduct]);
      if (error) console.error('Error adding product:', error);
    }

    setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
    setEditingProductId(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Error deleting product:', error);
    else fetchProducts();
  };

  const editProduct = (product) => {
    setNewProduct(product);
    setEditingProductId(product.id);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductForm newProduct={newProduct} setNewProduct={setNewProduct} onAdd={addOrUpdateProduct} />
      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={deleteProduct} 
            onEdit={editProduct} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
