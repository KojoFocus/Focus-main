import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  image,
  onBuy,
}) => {
  return (
    <div className="bg-[#3a3a3a] text-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition max-w-sm w-full">
      <div className="overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover rounded-lg"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
        <p className="text-[#f5d08c] font-semibold text-base">{price}</p>

        <div className="pt-3">
          <button
            onClick={onBuy}
            className="w-full bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
