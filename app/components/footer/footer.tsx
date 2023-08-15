import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-black p-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Harry Potter Fan Page. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
