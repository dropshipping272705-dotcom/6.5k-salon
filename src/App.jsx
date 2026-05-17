import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use this function to scroll to the top smoothly for the footer icon
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-manrope selection:bg-tertiary/30 selection:text-tertiary">
      <ScrollToTop />
      
      {/* Global Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-surface-container/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="font-noto-serif text-2xl tracking-tighter font-medium text-glow flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">face_retouching_natural</span>
            Maan's
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-xs uppercase tracking-[0.2em] hover:text-tertiary transition-colors">Home</Link>
            <Link to="/services" className="text-xs uppercase tracking-[0.2em] hover:text-tertiary transition-colors">Services</Link>
            <Link to={location.pathname === '/' ? '#gallery' : '/#gallery'} className="text-xs uppercase tracking-[0.2em] hover:text-tertiary transition-colors">Gallery</Link>
            <Link to="/services#booking" className="text-xs uppercase tracking-[0.2em] text-tertiary font-bold hover:opacity-80 transition-opacity">Book Appointment</Link>
          </nav>
          <button className="md:hidden material-symbols-outlined text-2xl">menu</button>
        </div>
      </header>

      {/* Route Views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      {/* Global Footer */}
      <footer className="bg-surface-container py-16 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="font-noto-serif text-3xl tracking-tighter text-glow flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-4xl">face_retouching_natural</span>
              Maan's Unisex Salon
            </Link>
            <p className="font-manrope text-sm text-secondary max-w-sm leading-relaxed">
              Elevating the art of grooming and styling in Hyderabad. A sanctuary for the modern aesthetic.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Atelier Info</h4>
            <ul className="space-y-3 font-manrope text-sm text-secondary">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">schedule</span> 10:00 AM - 9:00 PM</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">call</span> +91 91608 56138</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">mail</span> maansalon@info.com</li>
            </ul>
          </div>
          <div className="space-y-4 flex justify-end items-end pb-2">
             <button onClick={scrollToTop} className="bg-surface p-4 rounded-full border border-white/10 hover:bg-surface-bright transition-colors group">
               <span className="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">arrow_upward</span>
             </button>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-manrope text-[10px] uppercase tracking-widest text-secondary opacity-60">© 2024 Maan's Unisex Salon. All Rights Reserved.</p>
          <div className="flex gap-4">
            {/* Social icons */}
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-white/5 hover:border-tertiary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-white/5 hover:border-tertiary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">public</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Concierge Action */}
      <a href="https://wa.me/919160856138" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-black p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group">
        <span className="material-symbols-outlined">chat</span>
        <span className="absolute right-14 bg-surface-container text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">Message Us</span>
      </a>
    </div>
  );
}

export default App;
