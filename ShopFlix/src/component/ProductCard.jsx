import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Use the properties as returned by the API, e.g., product.actualPrice, product.discountPrice, etc.
  const discountPrice = product.discountPrice;
  const actualPrice = product.actualPrice;
  
  return (
    <div className="min-w-48 p-3 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="h-40 flex items-center justify-center mb-2">
        <img 
          src={product.image || "/api/placeholder/150/150"} 
          alt={product.name} 
          className="max-h-40 max-w-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h3>
      <div className="flex items-center mb-1">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < Math.floor(product.ratings || 0) ? "currentColor" : "none"} 
              className={i < Math.floor(product.ratings || 0) ? "" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">
          ({product.noOfRatings || 0})
        </span>
      </div>
      <div className="mt-auto">
        <div className="flex items-baseline">
          <span className="text-lg font-bold">
            {discountPrice !== undefined && discountPrice !== null 
              ? `$${parseFloat(discountPrice).toFixed(2)}` 
              : "N/A"}
          </span>
          {actualPrice !== undefined && actualPrice !== null && discountPrice < actualPrice && (
            <span className="text-xs text-gray-500 line-through ml-2">
              ${parseFloat(actualPrice).toFixed(2)}
            </span>
          )}
        </div>
        {product.prime && (
          <div className="mt-1">
            <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
              Prime
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
