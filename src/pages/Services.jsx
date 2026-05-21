import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';
const supabase = (supabaseUrl !== 'YOUR_SUPABASE_URL') ? createClient(supabaseUrl, supabaseKey) : null;

const menuCategories = [
  {
    title: "Bleach",
    items: [
      { name: "Face & Neck", price: "250" },
      { name: "Face, Neck & Blouse Line", price: "350" },
      { name: "Full Hands", price: "300" },
      { name: "Full Leg's", price: "400" },
      { name: "Under Arms", price: "100" },
      { name: "Feet", price: "100" },
      { name: "Front / Back", price: "600" },
      { name: "Upperlip", price: "40" },
      { name: "Full Body", price: "1200" }
    ]
  },
  {
    title: "Cleanup's",
    items: [
      { name: "Classic Cleanup", price: "350" },
      { name: "Fresh Fruit Cleanup", price: "450" },
      { name: "Pearl Cleanup", price: "500" },
      { name: "Diamond Cleanup", price: "500" },
      { name: "Gold Cleanup", price: "500" }
    ]
  },
  {
    title: "Entry Level Facial",
    items: [
      { name: "Fruit Facial", price: "500" },
      { name: "Skin Moisturizing Facial", price: "600" },
      { name: "Glow Facial", price: "700" },
      { name: "Herbal Facial", price: "800" },
      { name: "Gold Facial", price: "800" },
      { name: "Platinum Facial", price: "900" },
      { name: "Pearl Facial", price: "900" }
    ]
  },
  {
    title: "Mid Level Facial",
    items: [
      { name: "Tan Removal Facial", price: "1100" },
      { name: "Acne Reducing Facial", price: "1200" },
      { name: "Skin Lightening Facial", price: "1300" },
      { name: "Diamond Facial", price: "1500" },
      { name: "Insta Shine Facial", price: "1400" }
    ]
  },
  {
    title: "Threading",
    items: [
      { name: "Eye brows", price: "30" },
      { name: "Upper Lip", price: "20" },
      { name: "Lower Lip", price: "30" },
      { name: "Chin", price: "40" },
      { name: "Side lock's", price: "40" },
      { name: "Jaw Line", price: "30" },
      { name: "Forehead", price: "40" },
      { name: "Neck", price: "40" },
      { name: "Full Face", price: "250" }
    ]
  },
  {
    title: "Waxing",
    items: [
      { name: "Upper Lip", price: "40" },
      { name: "Chin", price: "40" },
      { name: "Side lock's", price: "50" },
      { name: "Lower Lip", price: "30" },
      { name: "Jaw Line", price: "50" },
      { name: "Forehead", price: "40" },
      { name: "Neck", price: "50" },
      { name: "Full Face", price: "300" },
      { name: "Full Hand Waxing", price: "200" },
      { name: "Half Hand Waxing", price: "150" },
      { name: "Under Arm's", price: "50" },
      { name: "Half Leg's", price: "200" },
      { name: "Full Leg's", price: "300" },
      { name: "Front / Back", price: "500" },
      { name: "Full Body", price: "1100" }
    ]
  },
  {
    title: "D-Tan Service",
    items: [
      { name: "Face & Neck", price: "300" },
      { name: "Face, Neck & Blouse Line", price: "400" },
      { name: "Half Hands", price: "200" },
      { name: "Full Hands", price: "400" },
      { name: "Half Leg's", price: "200" },
      { name: "Full Leg's", price: "500" },
      { name: "Under arms", price: "100" },
      { name: "Feet", price: "100" },
      { name: "Front / Back", price: "600" },
      { name: "Full Body", price: "1100" }
    ]
  },
  {
    title: "Premium Level (Facials)",
    items: [
      { name: "Age Less Facial", price: "1600" },
      { name: "Whitening Facial", price: "1800" },
      { name: "Wine Facial", price: "2000" },
      { name: "Perfect radiance facial", price: "2200" },
      { name: "24k Gold Facial", price: "3000" }
    ]
  },
  {
    title: "Hands & Feet",
    items: [
      { name: "Nail's Cut & File", price: "50" },
      { name: "Polish", price: "50" },
      { name: "Manicure Classic", price: "200" },
      { name: "Mint Manicure", price: "350" },
      { name: "Chocolaty Manicure", price: "450" },
      { name: "Hydrating Manicure", price: "500" },
      { name: "Classic Pedicure", price: "400" },
      { name: "Mint Pedicure", price: "550" },
      { name: "Chocolaty Pedicure", price: "600" },
      { name: "Hydrating Pedicure", price: "700" }
    ],
    notes: [
      "Pre Bridal Services Available",
      "Bridal Makeup Services Available",
      "Warts Removing - 150 onwards",
      "Ear Pressing - 400"
    ]
  },
  {
    title: "Permanent Smoothening",
    items: [
      { name: "Shoulder Level", price: "4000 onwards" },
      { name: "Waist Level", price: "6000 onwards" },
      { name: "Long Length", price: "6500 onwards" }
    ]
  },
  {
    title: "Keratin Treatment",
    items: [
      { name: "Shoulder Level", price: "5000 onwards" },
      { name: "Waist Level", price: "6000 onwards" },
      { name: "Long Length", price: "6500 onwards" }
    ]
  },
  {
    title: "Hair Spa",
    items: [
      { name: "Moisturizing Spa", price: "600 onwards" },
      { name: "Dry and Damage Spa", price: "700 onwards" },
      { name: "Smoothening Spa", price: "800 onwards" },
      { name: "Frizz Free Spa", price: "900 onwards" },
      { name: "Dandruff Treatment", price: "900 onwards" },
      { name: "Hair Fall Treatment", price: "900 onwards" }
    ]
  },
  {
    title: "Hair Setting & Blow Dry",
    items: [
      { name: "Shoulder Level", price: "350" },
      { name: "Waist Level", price: "450" },
      { name: "Long Length", price: "550" }
    ]
  },
  {
    title: "Hair wash with Condition",
    items: [
      { name: "Men's Hair wash", price: "50" },
      { name: "Shoulder Level", price: "150" },
      { name: "Waist Level", price: "200" },
      { name: "Long Length", price: "250" }
    ]
  },
  {
    title: "Ironing",
    items: [
      { name: "Shoulder Level", price: "300" },
      { name: "Waist Level", price: "400" },
      { name: "Long Length", price: "550" }
    ]
  },
  {
    title: "Tong's",
    items: [
      { name: "Shoulder Level", price: "500" },
      { name: "Waist Level", price: "700" },
      { name: "Long Length", price: "900" }
    ]
  },
  {
    title: "Hair Cuts",
    items: [
      { name: "Hair Cut", price: "150" },
      { name: "Hair Cut Baby", price: "100" },
      { name: "Hair Cut Straight", price: "200" },
      { name: "Hair Cut \"U\"", price: "250" },
      { name: "Hair Cut \"V\"", price: "250" },
      { name: "Hair Cut Layer's", price: "500" },
      { name: "Hair Change of Style", price: "600" },
      { name: "Hair Restyling", price: "500" },
      { name: "Hair Creative Cut", price: "650" }
    ]
  },
  {
    title: "Beard",
    items: [
      { name: "Beard Designing", price: "100 onwards" },
      { name: "Clean Shave", price: "100" }
    ]
  },
  {
    title: "Head Massage",
    items: [
      { name: "Oil Massage with wash", price: "300 onwards" },
      { name: "Oil Massage", price: "250 onwards" }
    ]
  },
  {
    title: "Hair Colour",
    items: [
      { name: "Beard Colour", price: "200" },
      { name: "Moustache Colour", price: "100" },
      { name: "Side Locks Colour", price: "100" },
      { name: "Root Touch up - with ammonia", price: "500 onwards" },
      { name: "Global Colour - with ammonia", price: "1000 onwards" },
      { name: "Root Touch up - without ammonia", price: "600 onwards" },
      { name: "Global Colour - without ammonia", price: "1500 onwards" },
      { name: "Hair Streaking", price: "150 onwards" },
      { name: "Global Highlighting", price: "1000 onwards" }
    ]
  },
  {
    title: "Permanent Hair Straightening",
    items: [
      { name: "Shoulder Level", price: "4000 onwards" },
      { name: "Waist Level", price: "6000 onwards" },
      { name: "Long Length", price: "6500 onwards" }
    ]
  }
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    selectedServices: [],
    fullName: '',
    preferredDate: '',
    preferredTime: '',
    address: '',
  });

  const [serviceLocation, setServiceLocation] = useState('shop');
  const [isBookingVisible, setIsBookingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      observer.observe(bookingElement);
    }

    return () => {
      if (bookingElement) {
        observer.unobserve(bookingElement);
      }
    };
  }, []);

  const toggleService = (serviceName) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices.includes(serviceName);
      if (isSelected) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== serviceName) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, serviceName] };
      }
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (formData.selectedServices.length === 0) {
      alert("Please select at least one service from the menu.");
      return;
    }
    
    const servicesList = formData.selectedServices.join(', ');
    const locationText = serviceLocation === 'home' ? 'At Home' : 'At Shop';
    let message = `Hi, I would like to book an appointment (${locationText}) for:\n* ${servicesList}\n\nName: ${formData.fullName}\nDate: ${formData.preferredDate}\nTime: ${formData.preferredTime}`;
    if (serviceLocation === 'home' && formData.address) {
      message += `\nAddress: ${formData.address}`;
    }
    const whatsappUrl = `https://wa.me/919160856138?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');

    if (supabase) {
      try {
        const { error } = await supabase
          .from('appointments')
          .insert([
            {
              full_name: formData.fullName,
              service_type: servicesList + ` (${serviceLocation === 'home' ? 'At Home - ' + formData.address : 'At Shop'})`,
              booking_date: `${formData.preferredDate} ${formData.preferredTime}`,
              status: 'pending'
            }
          ]);
        if (error) throw error;
      } catch (error) {
        console.error("Error booking appointment in database: " + error.message);
      }
    }
    
    setFormData({ selectedServices: [], fullName: '', preferredDate: '', preferredTime: '', address: '' });
  };

  return (
    <main className="pt-24">
      {/* Services Header */}
      <section className="bg-surface py-20 px-6 overflow-hidden">
        <div className="max-w-screen-md mx-auto text-center space-y-6">
          <span className="font-manrope text-[10px] uppercase tracking-[0.5em] text-tertiary opacity-90">
            Our Offerings
          </span>
          <h2 className="font-noto-serif text-4xl md:text-5xl leading-tight tracking-tighter text-tertiary">
            The Complete Menu
          </h2>

          {/* Location Toggle */}
          <div className="pt-8 flex justify-center">
            <div className="inline-flex bg-black/40 p-1 rounded-full border border-white/10">
              <button 
                onClick={() => {
                  setServiceLocation('shop');
                  setFormData(prev => ({ ...prev, selectedServices: [] })); // Clear cart on switch
                }}
                className={`px-8 py-3 rounded-full font-manrope text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  serviceLocation === 'shop' 
                    ? 'bg-primary text-on-primary silver-glow' 
                    : 'text-secondary hover:text-white'
                }`}
              >
                At Shop
              </button>
              <button 
                onClick={() => {
                  setServiceLocation('home');
                  setFormData(prev => ({ ...prev, selectedServices: [] })); // Clear cart on switch
                }}
                className={`px-8 py-3 rounded-full font-manrope text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  serviceLocation === 'home' 
                    ? 'bg-primary text-on-primary silver-glow' 
                    : 'text-secondary hover:text-white'
                }`}
              >
                At Home
              </button>
            </div>
          </div>

          <div className="pt-8">
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Menu List */}
      <section className="marble-bg py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-24">
          {menuCategories
            .filter(category => serviceLocation === 'shop' || category.title.toLowerCase().includes('spa'))
            .map((category, idx) => (
            <div key={idx} className="space-y-8">
              <div className="border-b border-black/10 pb-4">
                <h3 className="font-noto-serif text-3xl uppercase tracking-tighter text-black">{category.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {category.items.map((item, itemIdx) => {
                  const isSelected = formData.selectedServices.includes(item.name);
                  return (
                    <div key={itemIdx} className="flex justify-between items-center border-b border-black/5 pb-2 group">
                      <div className="flex flex-col">
                        <span className="font-manrope text-sm text-gray-800">{item.name}</span>
                        <span className="font-manrope text-xs font-bold text-black mt-1">{item.price}</span>
                      </div>
                      <button 
                        onClick={() => toggleService(item.name)}
                        className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full transition-colors border ${
                          isSelected 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-gray-500 border-gray-300 hover:border-black hover:text-black'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : '+ Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
              {category.notes && (
                <div className="pt-4 space-y-2">
                  {category.notes.map((note, noteIdx) => (
                    <p key={noteIdx} className="font-manrope text-xs italic text-gray-600">* {note}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Booking & Concierge */}
      <section id="booking" className="bg-black py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-2xl mx-auto bg-surface-container-lowest/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl silver-glow border border-white/10 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-noto-serif text-3xl text-primary tracking-tighter">Reserve Your Session</h2>
            <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-secondary opacity-60">Personalized Grooming &amp; Artistry</p>
          </div>
          
          <form onSubmit={handleBooking} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block">Selected Services</label>
                {formData.selectedServices.length === 0 ? (
                  <p className="font-manrope text-sm text-surface-bright py-2 border-b border-outline-variant">
                    Please select services from the menu above.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 pb-4 border-b border-outline-variant">
                    {formData.selectedServices.map((service, idx) => (
                      <span key={idx} className="bg-surface text-primary px-3 py-1.5 rounded-full font-manrope text-xs border border-white/10 flex items-center gap-2">
                        {service}
                        <button type="button" onClick={() => toggleService(service)} className="text-secondary hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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

              {serviceLocation === 'home' && (
                <div>
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Service Address</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your full address"
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-surface-bright resize-none" 
                    rows="2"
                  ></textarea>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Date</label>
                  <input 
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" 
                  />
                </div>
                <div>
                  <label className="font-manrope text-[10px] uppercase tracking-widest text-secondary block mb-2">Time Slot</label>
                  <input 
                    type="time"
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full bg-transparent border-b border-outline-variant py-4 px-0 font-manrope text-sm text-primary focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" 
                  />
                </div>
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

      {/* Floating Booking Action Bar */}
      {formData.selectedServices.length > 0 && !isBookingVisible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md pointer-events-none">
          <div className="bg-primary text-on-primary rounded-full px-6 py-4 flex items-center justify-between shadow-2xl border border-white/20 silver-glow pointer-events-auto animate-fade-in">
            <div className="flex flex-col">
              <span className="font-manrope text-[10px] uppercase tracking-widest opacity-80">Your Selection</span>
              <span className="font-noto-serif text-sm md:text-base font-bold">{formData.selectedServices.length} Service{formData.selectedServices.length > 1 ? 's' : ''} Added</span>
            </div>
            <button 
              onClick={() => {
                const element = document.getElementById('booking');
                if (element) {
                  const y = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="bg-background text-primary px-4 py-2 rounded-full font-manrope text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-transform"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
