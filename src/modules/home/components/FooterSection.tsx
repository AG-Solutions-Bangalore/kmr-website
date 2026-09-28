import React from "react";
import logo from "../../../assets/common/logo.png";
import appStoreIcon from "../../../assets/icons/App_Store_(iOS).svg";
import playStoreIcon from "../../../assets/icons/playStore-logo.svg";

const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>);

const FooterSection: React.FC = () => {
  return (
    <footer className="relative z-50 w-full bg-[#002f6c] text-white pt-24 pb-12 z-10">
    

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & About (Takes 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-white p-2 rounded-xl inline-block mb-4">
              <img src={logo} alt="KMR LIVE Logo" className="h-10 object-contain" />
            </div>
            
            <p className="text-[13px] md:text-[14px] leading-relaxed text-blue-100 font-medium mb-6 max-w-[320px]">
              KMR LIVE provides real-time commodity market information, trends and insights to help you make smarter business decisions.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] transition-transform hover:-translate-y-1 text-white">
                <FacebookIcon />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform hover:-translate-y-1 text-white">
                <TwitterIcon />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a66c2] transition-transform hover:-translate-y-1 text-white">
                <LinkedinIcon />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff0000] transition-transform hover:-translate-y-1 text-white">
                <YoutubeIcon />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] transition-transform hover:-translate-y-1 text-white">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Takes 2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[16px] font-bold text-white mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-1">
              {['Home', 'About Us', 'Category', 'Features', 'FAQ', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[14px] text-blue-200 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories (Takes 3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[16px] font-bold text-white mb-5">Categories</h4>
            <div className="flex gap-8 sm:gap-12 text-left">
              <ul className="flex flex-col gap-1">
                {['Edible Oil', 'Coconut Oil', 'Pulses', 'GN Seed', 'Rice & Paddy', 'Kirana'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-[14px] text-blue-200 hover:text-white transition-colors">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-1">
                {['Spices', 'Dry Fruits', 'Arecanut', 'Jaggery'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-[14px] text-blue-200 hover:text-white transition-colors">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Download App (Takes 3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[16px] font-bold text-white mb-5">Download App</h4>
            
            <div className="flex flex-col gap-3 w-full max-w-[180px]">
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-3 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 transition-colors border border-gray-800">
                <img src={appStoreIcon} alt="App Store" className="h-6 w-6" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-300">Download on the</span>
                  <span className="text-[14px] font-semibold">App Store</span>
                </div>
              </button>

              {/* Play Store Button */}
              <button className="flex items-center justify-center gap-3 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-900 transition-colors border border-gray-800">
                <img src={playStoreIcon} alt="Google Play" className="h-5 w-5" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-300">GET IT ON</span>
                  <span className="text-[14px] font-semibold">Google Play</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-blue-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-blue-200 text-[13px]">
          <p>© {new Date().getFullYear()} KMR LIVE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
