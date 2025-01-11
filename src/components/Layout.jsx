import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Invoice Management System</title>
        <meta name="description" content="Invoice Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <Link href="/">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-indigo-600">Vijay Arts</span>
                </div>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href="/invoices">
                  <div className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
                    Invoices
                  </div>
                </Link>
                <Link href="/invoices/new">
                  <div className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600">
                    Create New
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        {children}
      </main>

      <footer className="bg-white shadow-lg mt-auto">
        <div className="max-w-6xl mx-auto py-4 px-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Vijay Arts. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
