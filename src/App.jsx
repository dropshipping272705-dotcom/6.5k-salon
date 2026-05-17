import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';
// Using conditional to not crash if env vars are missing
const supabase = (supabaseUrl !== 'YOUR_SUPABASE_URL') ? createClient(supabaseUrl, supabaseKey) : null;

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionsRef = useRef([]);
  const [formData, setFormData] = useState({
    service: 'nails',
    fullName: '',
    preferredDate: '',
  });
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const text = "Hi, I would like to book a Concierge session.";
    window.open(`https://wa.me/9160856138?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!supabase) {
      alert("Booking unavailable (Supabase not configured in env variables)");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            full_name: formData.fullName,
            service_type: formData.service,
            booking_date: formData.preferredDate,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      alert("Your session has been reserved! We will contact you shortly.");
      setFormData({ service: 'nails', fullName: '', preferredDate: '' });
    } catch (error) {
      alert("Error booking appointment: " + error.message);
    }
  };

  useEffect(() => {
    // Basic GSAP fadeup for sections
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          }
        );
      }
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
        <div className="flex justify-between items-center px-6 py-5 w-full max-w-none">
          <div className="flex items-center gap-8">
            <h1 className="font-noto-serif tracking-tighter uppercase text-lg font-bold text-neutral-100 tracking-widest cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              MAAN'S UNISEX SALON
            </h1>
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})} className="font-manrope text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 hover:text-white transition-colors duration-300">About</button>
              <button onClick={() => document.getElementById('services').scrollIntoView({behavior: 'smooth'})} className="font-manrope text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 hover:text-white transition-colors duration-300">Services</button>
              <button onClick={() => document.getElementById('gallery').scrollIntoView({behavior: 'smooth'})} className="font-manrope text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 hover:text-white transition-colors duration-300">Gallery</button>
              <button onClick={() => document.getElementById('reviews').scrollIntoView({behavior: 'smooth'})} className="font-manrope text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 hover:text-white transition-colors duration-300">Reviews</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={openWhatsApp}
              className="text-white hover:opacity-80 transition-all duration-300 flex items-center justify-center p-1"
              aria-label="WhatsApp Concierge">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Immersive Hero */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 flex-shrink-0" 
            autoPlay 
            muted 
            loop 
            playsInline
            src="/assets/mixkit-barber-equipment-271-full-hd.mp4"
          />
          <div className="relative z-20 text-center px-6 max-w-lg">
            <h2 className="font-noto-serif text-4xl md:text-6xl text-tertiary leading-tight tracking-tighter text-glow">
              Mastering the Art of <br/>
              <span className="italic font-normal">Hair &amp; Nails.</span><br/>
              For Him &amp; Her.
            </h2>
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40"></div>
              <p className="font-manrope text-[10px] uppercase tracking-[0.4em] text-secondary">Explore the Atelier</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={addToRefs} className="bg-surface py-24 md:py-32 px-6 overflow-hidden">
          <div className="max-w-screen-md mx-auto text-center space-y-8">
            <span className="font-manrope text-[10px] uppercase tracking-[0.5em] text-on-surface-variant opacity-60">
              The Nocturnal Experience
            </span>
            <h2 className="font-noto-serif text-3xl md:text-5xl leading-tight tracking-tighter text-on-primary">
              Where sophisticated artistry meets unparalleled luxury.
            </h2>
            <p className="font-manrope text-sm md:text-base leading-relaxed text-secondary max-w-2xl mx-auto">
              Welcome to Maan's Unisex Salon. We are an avant-garde studio dedicated to redefining grooming and styling. Inspired by the quiet luxury of nocturnal aesthetics, our space provides an exclusive sanctuary for those who appreciate the finest attention to detail.
            </p>
            <div className="pt-8">
              <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto"></div>
            </div>
          </div>
        </section>

        {/* The Story */}
        <section ref={addToRefs} className="marble-bg py-24 px-6 relative overflow-hidden">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="font-manrope text-[10px] uppercase tracking-[0.5em] text-on-surface-variant opacity-60">Legacy of Excellence</span>
              <h2 className="font-noto-serif text-3xl leading-snug tracking-tight text-on-primary">
                Our sanctuary blends elite training with curated products from the world's most prestigious maisons.
              </h2>
              <p className="font-manrope text-sm leading-relaxed text-on-primary/70 max-w-md">
                Every stroke, every cut, and every detail is an intentional act of artistry designed for the discerning individual.
              </p>
            </div>
            
            <div className="relative rounded-xl overflow-hidden silver-glow group aspect-square">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="luxury salon interior" 
                src="/assets/salon_interior_luxury.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-surface-container-low/90 backdrop-blur-md p-6 rounded-lg border border-white/10">
                  <p className="font-manrope text-[10px] uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">location_on</span> Dilsukhnagar Atelier
                  </p>
                  <p className="font-manrope text-xs text-secondary leading-relaxed">
                    Near Bus Depot, back side line, near Basham School, Shalivahana Nagar, Dilsukhnagar, Hyderabad, Telangana 500036
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Service Portfolios - EXACT Stitch HTML */}
        <section id="services" ref={addToRefs} className="bg-surface py-24">
          <div className="max-w-screen-xl mx-auto px-6 space-y-24">
            
            {/* Gentlemen's Grooming */}
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b border-white/5 pb-4">
                <h3 className="font-noto-serif text-2xl md:text-3xl uppercase tracking-tighter text-tertiary">Gentlemen's<br/>Grooming</h3>
                <span className="font-manrope text-[10px] tracking-widest opacity-40">01</span>
              </div>
              <div className="relative h-[24rem] md:h-[32rem] w-full rounded-xl overflow-hidden group">
                <img 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-1000" 
                  alt="Men's Grooming" 
                  src="/assets/mens_grooming.png"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <button onClick={() => document.getElementById('booking').scrollIntoView({behavior: 'smooth'})} className="w-fit bg-primary text-on-primary px-8 py-3 rounded-full font-manrope text-[10px] uppercase font-bold tracking-widest silver-glow hover:scale-105 transition-transform duration-300">
                    Book This Service
                  </button>
                </div>
              </div>
            </div>

            {/* Ladies' Hair Styling */}
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b border-white/5 pb-4">
                <h3 className="font-noto-serif text-2xl md:text-3xl uppercase tracking-tighter text-tertiary text-right w-full">Ladies' Hair<br/>Styling</h3>
                <span className="font-manrope text-[10px] tracking-widest opacity-40 order-first">02</span>
              </div>
              <div className="relative h-[24rem] md:h-[32rem] w-full rounded-xl overflow-hidden group">
                <img 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-1000" 
                  alt="Ladies' Styling" 
                  src="/assets/ladies_styling.png"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent opacity-40"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-end">
                  <button onClick={() => document.getElementById('booking').scrollIntoView({behavior: 'smooth'})} className="w-fit bg-primary text-on-primary px-8 py-3 rounded-full font-manrope text-[10px] uppercase font-bold tracking-widest silver-glow hover:scale-105 transition-transform duration-300">
                    Book This Service
                  </button>
                </div>
              </div>
            </div>

            {/* Exclusive Nail Artistry */}
            <div className="flex flex-col gap-8">
              <div className="flex items-end justify-between border-b border-white/5 pb-4">
                <h3 className="font-noto-serif text-2xl md:text-3xl uppercase tracking-tighter text-tertiary">Exclusive<br/>Nail Artistry</h3>
                <span className="font-manrope text-[10px] tracking-widest opacity-40">03</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="marble-bg aspect-square md:aspect-video rounded-xl flex items-center justify-center p-4 silver-glow group overflow-hidden">
                  <img 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110" 
                    alt="Nail Artistry" 
                    src="/assets/nail_artistry.png"
                  />
                </div>
                <div className="flex flex-col justify-center gap-8 py-4 px-4 md:px-12">
                  <p className="font-manrope text-sm md:text-lg text-secondary leading-relaxed italic">
                    "Miniature canvases of luxury crafted for your fingertips."
                  </p>
                  <button onClick={() => document.getElementById('booking').scrollIntoView({behavior: 'smooth'})} className="w-fit bg-surface-container-highest text-primary border border-white/10 px-8 py-4 rounded-full font-manrope text-[10px] uppercase font-bold tracking-widest hover:bg-primary hover:text-black transition-colors duration-300">
                    Book This Service
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Visual Gallery Grid */}
        <section id="gallery" ref={addToRefs} className="marble-bg py-24 relative overflow-hidden text-on-primary">
          <div className="max-w-screen-xl mx-auto px-6 relative z-10">
            <div className="mb-12 flex justify-between items-end border-b border-black/10 pb-4">
              <h2 className="font-noto-serif text-3xl tracking-tighter">Visual Gallery</h2>
              <span className="font-manrope text-[10px] tracking-widest opacity-60 font-bold">PORTFOLIO</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "salon_interior_luxury.png",
                "mens_grooming.png",
                "ladies_styling.png",
                "nail_artistry.png",
                "salon_tools.png",
                "salon_mirror.png"
              ].map((imgUrl, idx) => (
                <div key={idx} className="aspect-square bg-neutral-900 rounded-lg overflow-hidden group border border-white/10 shadow-lg">
                  <img 
                    src={`/assets/` + encodeURIComponent(imgUrl)} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section id="reviews" ref={addToRefs} className="py-24 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-screen-xl mx-auto">
            <div className="px-6 mb-12">
              <h2 className="font-noto-serif text-3xl text-tertiary tracking-tighter">The Patron's Voice</h2>
            </div>
            
            <div className="flex overflow-x-auto gap-6 px-6 hide-scrollbar pb-8 snap-x snap-mandatory">
              {/* Card 1 */}
              <div className="min-w-[85vw] md:min-w-[400px] snap-center bg-surface-container p-8 rounded-2xl border border-white/5 space-y-6">
                <div className="flex gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <p className="font-manrope text-sm leading-relaxed text-secondary italic">"The most refined salon experience in Telangana. Their attention to hair detail is simply unparalleled."</p>
                <p className="font-manrope text-[10px] uppercase tracking-widest text-primary">— Rajesh K.</p>
              </div>

              {/* Card 2 */}
              <div className="min-w-[85vw] md:min-w-[400px] snap-center bg-surface-container p-8 rounded-2xl border border-white/5 space-y-6">
                <div className="flex gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <p className="font-manrope text-sm leading-relaxed text-secondary italic">"Absolute masterpiece nail artistry. The marble texture in the studio matches the luxury of their work."</p>
                <p className="font-manrope text-[10px] uppercase tracking-widest text-primary">— Ananya S.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking & Concierge */}
        <section id="booking" ref={addToRefs} className="marble-bg py-24 px-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto bg-surface-container-lowest/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl silver-glow border border-white/10 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="font-noto-serif text-3xl text-primary tracking-tighter">Reserve Your Session</h2>
              <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-secondary opacity-60">Personalized Grooming &amp; Artistry</p>
            </div>
            
            <form onSubmit={handleBooking} className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Service Selection</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="nails" className="bg-surface">Nails Treatment</option>
                    <option value="haircut" className="bg-surface">Hair Cut</option>
                    <option value="root" className="bg-surface">Root Touchup</option>
                  </select>
                  <span className="material-symbols-outlined absolute bottom-4 right-0 text-secondary pointer-events-none">expand_more</span>
                </div>
                
                <div>
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-surface-bright" 
                  />
                </div>
                
                <div>
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Preferred Date</label>
                  <input 
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-5 rounded-full font-manrope text-xs uppercase font-extrabold tracking-[0.2em] silver-glow hover:scale-105 active:scale-95 transition-transform duration-150">
                Confirm Reservation
              </button>
            </form>
          </div>
        </section>

        {/* Google Maps Location */}
        <section ref={addToRefs} className="bg-black py-24 border-t border-white/5 relative overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="mb-12 flex justify-between items-end">
              <div className="space-y-2">
                <span className="font-manrope text-[10px] uppercase tracking-[0.5em] text-on-surface-variant opacity-60">Find Us</span>
                <h2 className="font-noto-serif text-3xl text-tertiary tracking-tighter">Our Atelier</h2>
              </div>
              <span className="font-manrope text-[10px] tracking-widest opacity-40 text-right max-w-[200px] hidden md:block">
                Shalivahana Nagar, Dilsukhnagar, Hyderabad.
              </span>
            </div>
            
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 silver-glow relative group">
              <div className="absolute inset-0 bg-black/20 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              {/* Grayscale filter to match dark aesthetic */}
              <iframe 
                src="https://maps.google.com/maps?q=Maan's%20Unisex%20Salon,%20Dilsukhnagar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="w-full h-full object-cover grayscale invert contrast-125 opacity-70"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-neutral-950 border-t border-white/5 px-8 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-neutral-100 font-noto-serif italic text-xl tracking-widest">MAAN'S</h4>
          <div className="flex gap-6">
            <a href="#" className="font-manrope text-xs tracking-widest text-neutral-600 hover:text-white transition-colors duration-300">The Story</a>
            <a href="#" className="font-manrope text-xs tracking-widest text-neutral-600 hover:text-white transition-colors duration-300">Services</a>
            <a href="#" className="font-manrope text-xs tracking-widest text-neutral-600 hover:text-white transition-colors duration-300">Artistry</a>
          </div>
        </div>
        <p className="font-manrope text-[8px] tracking-[0.3em] text-neutral-400 text-center opacity-50 uppercase">
          © 2024 MAAN'S UNISEX SALON. THE NOCTURNAL ATELIER.
        </p>
      </footer>

      {/* Bottom Navigation Shell */}
      <nav className="fixed bottom-8 right-8 z-50 flex items-center gap-4 hidden md:flex">
        <div className="bg-neutral-900/90 backdrop-blur-2xl rounded-full px-6 py-3 flex items-center gap-4 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          <button onClick={openWhatsApp} className="flex items-center justify-center p-2 hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </button>
          <button onClick={() => document.getElementById('booking').scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 bg-white text-black rounded-full px-5 py-2 hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined">event_available</span>
            <span className="font-manrope text-[10px] tracking-[0.2em] uppercase font-bold">Book Now</span>
          </button>
        </div>
      </nav>

      {/* WhatsApp Floating Action (Mobile Focus) */}
      <button onClick={openWhatsApp} className="fixed md:hidden bottom-8 right-8 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center silver-glow text-black transition-all duration-300 hover:scale-110 active:scale-95">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>chat</span>
      </button>

      {/* Scroll to Top Floating Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-6 md:left-8 z-50 w-12 h-12 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center silver-glow text-white transition-all duration-500 hover:scale-110 active:scale-95 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined text-sm">arrow_upward</span>
      </button>

    </>
  )
}

export default App;
