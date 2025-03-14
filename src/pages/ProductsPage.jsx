import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else setProducts(data);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(newProduct)
        .eq('id', editingProduct.id);

      if (error) console.error('Error updating product:', error);
      else {
        setEditingProduct(null);
        setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from('products').insert([newProduct]);
      if (error) console.error('Error adding product:', error);
      else {
        setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
        fetchProducts();
      }
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Error deleting product:', error);
    else fetchProducts();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductForm newProduct={newProduct} setNewProduct={setNewProduct} onAdd={addProduct} editingProduct={editingProduct} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={deleteProduct} onEdit={editProduct} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
