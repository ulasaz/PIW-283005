import '@/app/ui/global.css';
import Navbar from '@/app/ui/navbar';
import { CartProvider } from '@/app/lib/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen pt-20" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}