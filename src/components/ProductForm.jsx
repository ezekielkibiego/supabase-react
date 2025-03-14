
const ProductForm = ({ newProduct, setNewProduct, onAdd, onUpdate, editing, setEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Product' : 'Add New Product'}</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border border-gray-300 rounded p-2"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border border-gray-300 rounded p-2"
        />
        <div className="flex gap-4">
          <button
            onClick={editing ? onUpdate : onAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editing ? 'Update Product' : 'Add Product'}
          </button>
          {editing && (
            <button
              onClick={() => { setNewProduct({ name: '', description: '', price: '', imageUrl: '' }); setEditing(false); }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
