import React from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
      )}
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-green-600 font-bold mb-4">${product.price}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
