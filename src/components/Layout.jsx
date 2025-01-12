import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Cookies from "js-cookie";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = async () => {
    Cookies.remove("token");
    window.location.href = "/auth";
  }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Invoice Management System</title>
        <meta name="description" content="Invoice Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-gray-800 relative border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/invoices">
                <div className="flex-shrink-0 flex items-center cursor-pointer">
                  <Image src="/logo.png" alt="Vijay Arts" width={170} height={80} className="relative bottom-2 rounded-lg" />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
                <div onClick={logout} className="px-4 cursor-pointer py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 ease-in-out font-medium">
                  Logout
                </div>
              <Link href="/invoices">
                <div className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 ease-in-out font-medium">
                  Invoices
                </div>
              </Link>
              <Link href="/invoices/new">
                <div className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out font-medium">
                  Create New
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/invoices">
                <div className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 ease-in-out font-medium">
                  Invoices
                </div>
              </Link>
              <Link href="/invoices/new">
                <div className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out font-medium">
                  Create New
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6 min-h-[calc(100vh-8.6rem)]">
        {children}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
        <div className="max-w-6xl mx-auto py-4 px-4">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Vijay Arts. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}