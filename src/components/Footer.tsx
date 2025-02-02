import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-gray-300">
      <div className="max-w-6xl mx-auto pt-10">


        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-500 text-sm">
              © Leonel Oliveira {new Date().getFullYear()}
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
