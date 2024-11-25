import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#272E71] text-white shadow w-full sticky top-0 z-50">
      <div className="container mx-auto px-14 py-3 flex justify-between items-center">
        {/* Add a dummy logo and make it round */}
        <img 
          src="https://via.placeholder.com/100?text=Logo" 
          alt="Dummy Logo" 
          className="h-10 w-10 rounded-full"
        />

        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
          >
            Add Fabric
          </Link>
          <Link
            to="/all_fabric"
            className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
          >
            All Fabric
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
