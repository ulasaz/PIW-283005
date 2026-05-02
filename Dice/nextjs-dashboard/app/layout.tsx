import '@/app/ui/global.css';
import Navbar from '@/app/ui/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen pt-20">
        <Navbar /> 
        {children} 
      </body>
    </html>
  );
}