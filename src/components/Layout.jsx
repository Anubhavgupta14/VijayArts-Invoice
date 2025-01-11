import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Invoice Management System</title>
        <meta name="description" content="Invoice Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <Link href="/">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-purple-500 hover:text-purple-400 transition-colors">
                    Vijay Arts
                  </span>
                </div>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href="/invoices">
                  <div className="inline-flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    Invoices
                  </div>
                </Link>
                <Link href="/invoices/new">
                  <div className="inline-flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    Create New
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6 h-[calc(100vh-7.6rem)]">
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