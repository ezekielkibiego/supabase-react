import React, { useState } from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg p-4 shadow-sm w-full transition-all duration-300 ease-in-out ${
        showFullDescription ? 'h-auto' : 'h-80'
      } flex flex-col justify-between`}
    >
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-32 object-cover rounded mb-4" 
        />
      )}
      <div>
        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
        <p className="text-green-600 font-bold mb-2">${product.price}</p>
        <p className="text-gray-700 mb-2">
          {showFullDescription ? product.description : product.description.slice(0, 50)}
          {product.description.length > 50 && (
            <span 
              className="text-blue-500 cursor-pointer ml-1"
              onClick={toggleDescription}
            >
              {showFullDescription ? ' Show Less' : '... Read More'}
            </span>
          )}
        </p>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
