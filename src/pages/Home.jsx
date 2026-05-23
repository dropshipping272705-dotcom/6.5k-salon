import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionsRef = useRef([]);

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
            <p className="font-manrope text-[10px] uppercase tracking-[0.4em] text-white">Explore the Atelier</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={addToRefs} className="bg-surface py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-screen-md mx-auto text-center space-y-8">
          <span className="font-manrope text-[10px] uppercase tracking-[0.5em] text-tertiary opacity-90">
            The Nocturnal Experience
          </span>
          <h2 className="font-noto-serif text-3xl md:text-5xl leading-tight tracking-tighter text-tertiary">
            Where sophisticated artistry meets unparalleled luxury.
          </h2>
          <p className="font-manrope text-sm md:text-base leading-relaxed text-secondary max-w-2xl mx-auto">
            Welcome to Manas Unisex Salon. We are an avant-garde studio dedicated to redefining grooming and styling. Inspired by the quiet luxury of nocturnal aesthetics, our space provides an exclusive sanctuary for those who appreciate the finest attention to detail.
          </p>
          <div className="pt-8">
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section ref={addToRefs} className="marble-bg py-32 md:py-48 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto text-center space-y-10 md:space-y-12">
          <span className="font-manrope text-xs md:text-sm uppercase tracking-[0.5em] text-on-surface-variant opacity-60">Legacy of Excellence</span>
          <h2 className="font-noto-serif text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-tight tracking-tight text-on-primary max-w-5xl mx-auto">
            Our sanctuary blends elite training with curated products from the world's most prestigious maisons.
          </h2>
          <p className="font-manrope text-base md:text-xl leading-relaxed text-on-primary/70 max-w-2xl mx-auto">
            Every stroke, every cut, and every detail is an intentional act of artistry designed for the discerning individual.
          </p>
        </div>
      </section>

      {/* Interactive Service Portfolios - Highlighted */}
      <section id="services" ref={addToRefs} className="bg-surface py-24">
        <div className="max-w-screen-xl mx-auto px-6 space-y-24">
          
          <div className="text-center mb-16">
            <h2 className="font-noto-serif text-4xl tracking-tighter text-tertiary">Our Signature Services</h2>
            <Link to="/services" className="mt-8 inline-block w-fit bg-primary text-on-primary px-8 py-4 rounded-full font-manrope text-[10px] uppercase font-bold tracking-widest silver-glow hover:scale-105 transition-transform duration-300">
              View Full Menu &amp; Book
            </Link>
          </div>

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
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {[
              "media__1779351373861.png",
              "media__1779351373924.png",
              "media__1779351373964.png",
              "media__1779351373998.png"
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
  );
}
