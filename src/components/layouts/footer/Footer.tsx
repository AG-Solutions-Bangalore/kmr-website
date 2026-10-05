import React from "react";
import { Link } from "react-router";
import { BellRing } from "lucide-react";
import logo from "../../../assets/common/logo.png";
import appStoreIcon from "../../../assets/icons/App_Store_(iOS).svg";
import playStoreIcon from "../../../assets/icons/playStore-logo.svg";
import { NewsletterForm } from "../../../modules/contact/components/NewsletterForm";

const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>);

const Footer: React.FC = () => {
  return (
    <footer className="relative z-50 w-full bg-[#002f6c] text-white mt-12 sm:mt-16 lg:mt-18 pb-6">
      {/* Animated Wave SVG Divider */}
      <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none translate-y-[1px]">
        <svg 
          viewBox="0 0 1000 200" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[50px] sm:h-[80px] md:h-[100px] lg:h-[150px]"
        >
          <path
            d="M0,200 L0.0,100.0 C 6.3,101.8 18.8,105.3 25.0,107.1 C 31.3,108.7 43.8,112.0 50.0,113.6 C 56.3,114.9 68.8,117.5 75.0,118.8 C 81.3,119.7 93.8,121.5 100.0,122.4 C 106.3,122.8 118.8,123.5 125.0,123.9 C 131.3,123.8 143.8,123.5 150.0,123.4 C 156.3,122.7 168.8,121.4 175.0,120.7 C 181.3,119.6 193.8,117.3 200.0,116.2 C 206.3,114.7 218.8,111.8 225.0,110.3 C 231.3,108.6 243.8,105.1 250.0,103.4 C 256.3,101.6 268.8,98.0 275.0,96.2 C 281.3,94.5 293.8,91.1 300.0,89.4 C 306.3,87.9 318.8,85.0 325.0,83.5 C 331.3,82.4 343.8,80.2 350.0,79.1 C 356.3,78.4 368.8,77.2 375.0,76.5 C 381.3,76.4 393.8,76.2 400.0,76.1 C 406.3,76.5 418.8,77.4 425.0,77.8 C 431.3,78.7 443.8,80.6 450.0,81.5 C 456.3,82.8 468.8,85.5 475.0,86.8 C 481.3,88.4 493.8,91.7 500.0,93.3 C 506.3,95.1 518.8,98.6 525.0,100.4 C 531.3,102.2 543.8,105.7 550.0,107.5 C 556.3,109.1 568.8,112.3 575.0,113.9 C 581.3,115.2 593.8,117.7 600.0,119.0 C 606.3,119.9 618.8,121.6 625.0,122.5 C 631.3,122.9 643.8,123.6 650.0,124.0 C 656.3,123.8 668.8,123.5 675.0,123.3 C 681.3,122.6 693.8,121.2 700.0,120.5 C 706.3,119.3 718.8,117.1 725.0,115.9 C 731.3,114.4 743.8,111.4 750.0,109.9 C 756.3,108.2 768.8,104.7 775.0,103.0 C 781.3,101.2 793.8,97.6 800.0,95.8 C 806.3,94.1 818.8,90.7 825.0,89.0 C 831.3,87.5 843.8,84.7 850.0,83.2 C 856.3,82.1 868.8,80.0 875.0,78.9 C 881.3,78.3 893.8,77.1 900.0,76.5 C 906.3,76.4 918.8,76.2 925.0,76.1 C 931.3,76.5 943.8,77.5 950.0,77.9 C 956.3,78.9 968.8,80.8 975.0,81.7 C 981.3,83.0 993.8,85.8 1000.0,87.1 C 1006.3,88.8 1018.8,92.0 1025.0,93.7 L1000.0,200.0 L0,200.0Z"
            fill="#002f6c"
          >
            <animate
              attributeName="d"
              dur="9.0s"
              repeatCount="indefinite"
              values="M0,200 L0.0,100.0 C 6.3,101.8 18.8,105.3 25.0,107.1 C 31.3,108.7 43.8,112.0 50.0,113.6 C 56.3,114.9 68.8,117.5 75.0,118.8 C 81.3,119.7 93.8,121.5 100.0,122.4 C 106.3,122.8 118.8,123.5 125.0,123.9 C 131.3,123.8 143.8,123.5 150.0,123.4 C 156.3,122.7 168.8,121.4 175.0,120.7 C 181.3,119.6 193.8,117.3 200.0,116.2 C 206.3,114.7 218.8,111.8 225.0,110.3 C 231.3,108.6 243.8,105.1 250.0,103.4 C 256.3,101.6 268.8,98.0 275.0,96.2 C 281.3,94.5 293.8,91.1 300.0,89.4 C 306.3,87.9 318.8,85.0 325.0,83.5 C 331.3,82.4 343.8,80.2 350.0,79.1 C 356.3,78.4 368.8,77.2 375.0,76.5 C 381.3,76.4 393.8,76.2 400.0,76.1 C 406.3,76.5 418.8,77.4 425.0,77.8 C 431.3,78.7 443.8,80.6 450.0,81.5 C 456.3,82.8 468.8,85.5 475.0,86.8 C 481.3,88.4 493.8,91.7 500.0,93.3 C 506.3,95.1 518.8,98.6 525.0,100.4 C 531.3,102.2 543.8,105.7 550.0,107.5 C 556.3,109.1 568.8,112.3 575.0,113.9 C 581.3,115.2 593.8,117.7 600.0,119.0 C 606.3,119.9 618.8,121.6 625.0,122.5 C 631.3,122.9 643.8,123.6 650.0,124.0 C 656.3,123.8 668.8,123.5 675.0,123.3 C 681.3,122.6 693.8,121.2 700.0,120.5 C 706.3,119.3 718.8,117.1 725.0,115.9 C 731.3,114.4 743.8,111.4 750.0,109.9 C 756.3,108.2 768.8,104.7 775.0,103.0 C 781.3,101.2 793.8,97.6 800.0,95.8 C 806.3,94.1 818.8,90.7 825.0,89.0 C 831.3,87.5 843.8,84.7 850.0,83.2 C 856.3,82.1 868.8,80.0 875.0,78.9 C 881.3,78.3 893.8,77.1 900.0,76.5 C 906.3,76.4 918.8,76.2 925.0,76.1 C 931.3,76.5 943.8,77.5 950.0,77.9 C 956.3,78.9 968.8,80.8 975.0,81.7 C 981.3,83.0 993.8,85.8 1000.0,87.1 C 1006.3,88.8 1018.8,92.0 1025.0,93.7 L1000.0,200.0 L0,200.0Z;
             M0,200 L0.0,100.0 C 6.3,98.2 18.8,94.7 25.0,92.9 C 31.3,91.3 43.8,88.0 50.0,86.4 C 56.3,85.1 68.8,82.5 75.0,81.2 C 81.3,80.3 93.8,78.5 100.0,77.6 C 106.3,77.2 118.8,76.5 125.0,76.1 C 131.3,76.2 143.8,76.5 150.0,76.6 C 156.3,77.3 168.8,78.6 175.0,79.3 C 181.3,80.4 193.8,82.7 200.0,83.8 C 206.3,85.3 218.8,88.2 225.0,89.7 C 231.3,91.4 243.8,94.9 250.0,96.6 C 256.3,98.4 268.8,102.0 275.0,103.8 C 281.3,105.5 293.8,108.9 300.0,110.6 C 306.3,112.1 318.8,115.0 325.0,116.5 C 331.3,117.6 343.8,119.8 350.0,120.9 C 356.3,121.6 368.8,122.8 375.0,123.5 C 381.3,123.6 393.8,123.8 400.0,123.9 C 406.3,123.5 418.8,122.6 425.0,122.2 C 431.3,121.3 443.8,119.4 450.0,118.5 C 456.3,117.2 468.8,114.5 475.0,113.2 C 481.3,111.6 493.8,108.3 500.0,106.7 C 506.3,104.9 518.8,101.4 525.0,99.6 C 531.3,97.8 543.8,94.3 550.0,92.5 C 556.3,90.9 568.8,87.7 575.0,86.1 C 581.3,84.8 593.8,82.3 600.0,81.0 C 606.3,80.1 618.8,78.4 625.0,77.5 C 631.3,77.1 643.8,76.4 650.0,76.0 C 656.3,76.2 668.8,76.5 675.0,76.7 C 681.3,77.4 693.8,78.8 700.0,79.5 C 706.3,80.7 718.8,82.9 725.0,84.1 C 731.3,85.6 743.8,88.6 750.0,90.1 C 756.3,91.8 768.8,95.3 775.0,97.0 C 781.3,98.8 793.8,102.4 800.0,104.2 C 806.3,105.9 818.8,109.3 825.0,111.0 C 831.3,112.5 843.8,115.3 850.0,116.8 C 856.3,117.9 868.8,120.0 875.0,121.1 C 881.3,121.7 893.8,122.9 900.0,123.5 C 906.3,123.6 918.8,123.8 925.0,123.9 C 931.3,123.5 943.8,122.5 950.0,122.1 C 956.3,121.1 968.8,119.3 975.0,118.3 C 981.3,117.0 993.8,114.3 1000.0,112.9 C 1006.3,111.3 1018.8,108.0 1025.0,106.3 L1000.0,200.0 L0,200.0Z;
             M0,200 L0.0,100.0 C 6.3,101.8 18.8,105.3 25.0,107.1 C 31.3,108.7 43.8,112.0 50.0,113.6 C 56.3,114.9 68.8,117.5 75.0,118.8 C 81.3,119.7 93.8,121.5 100.0,122.4 C 106.3,122.8 118.8,123.5 125.0,123.9 C 131.3,123.8 143.8,123.5 150.0,123.4 C 156.3,122.7 168.8,121.4 175.0,120.7 C 181.3,119.6 193.8,117.3 200.0,116.2 C 206.3,114.7 218.8,111.8 225.0,110.3 C 231.3,108.6 243.8,105.1 250.0,103.4 C 256.3,101.6 268.8,98.0 275.0,96.2 C 281.3,94.5 293.8,91.1 300.0,89.4 C 306.3,87.9 318.8,85.0 325.0,83.5 C 331.3,82.4 343.8,80.2 350.0,79.1 C 356.3,78.4 368.8,77.2 375.0,76.5 C 381.3,76.4 393.8,76.2 400.0,76.1 C 406.3,76.5 418.8,77.4 425.0,77.8 C 431.3,78.7 443.8,80.6 450.0,81.5 C 456.3,82.8 468.8,85.5 475.0,86.8 C 481.3,88.4 493.8,91.7 500.0,93.3 C 506.3,95.1 518.8,98.6 525.0,100.4 C 531.3,102.2 543.8,105.7 550.0,107.5 C 556.3,109.1 568.8,112.3 575.0,113.9 C 581.3,115.2 593.8,117.7 600.0,119.0 C 606.3,119.9 618.8,121.6 625.0,122.5 C 631.3,122.9 643.8,123.6 650.0,124.0 C 656.3,123.8 668.8,123.5 675.0,123.3 C 681.3,122.6 693.8,121.2 700.0,120.5 C 706.3,119.3 718.8,117.1 725.0,115.9 C 731.3,114.4 743.8,111.4 750.0,109.9 C 756.3,108.2 768.8,104.7 775.0,103.0 C 781.3,101.2 793.8,97.6 800.0,95.8 C 806.3,94.1 818.8,90.7 825.0,89.0 C 831.3,87.5 843.8,84.7 850.0,83.2 C 856.3,82.1 868.8,80.0 875.0,78.9 C 881.3,78.3 893.8,77.1 900.0,76.5 C 906.3,76.4 918.8,76.2 925.0,76.1 C 931.3,76.5 943.8,77.5 950.0,77.9 C 956.3,78.9 968.8,80.8 975.0,81.7 C 981.3,83.0 993.8,85.8 1000.0,87.1 C 1006.3,88.8 1018.8,92.0 1025.0,93.7 L1000.0,200.0 L0,200.0Z"
            />
          </path>
        </svg>
      </div>

      <div className="container relative z-10">
        {/* Newsletter strip */}
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <BellRing className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-[16px] font-bold text-white">Stay updated with daily market prices</h4>
              <p className="mt-1 max-w-md text-[13px] font-medium leading-relaxed text-blue-200">
                Join 10,000+ traders getting price trends and insights every morning. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
          <NewsletterForm variant="dark" className="w-full lg:max-w-md" />
        </div>

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Column 1: Brand & About (Takes full width on small screens, 4 cols on lg) */}
          <div className="col-span-1 min-[420px]:col-span-2 lg:col-span-4 flex flex-col items-start text-left">
            <div className="bg-white p-2 rounded-xl inline-block mb-4">
              <img src={logo} alt="KMR LIVE Logo" className="h-10 object-contain" />
            </div>
            
            <p className="text-[13px] md:text-[14px] leading-relaxed text-blue-100 font-medium mb-6 max-w-xl lg:max-w-[320px]">
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

          {/* Column 2: Quick Links (Takes 1 col, 2 cols on lg) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-[16px] font-bold text-white mb-4 sm:mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Blogs', to: '/blog' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Category', to: '/#category' },
                { label: 'FAQ', to: '/#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[14px] text-blue-200 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories (Takes 1 col, 3 cols on lg) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-[16px] font-bold text-white mb-4 sm:mb-5">Categories</h4>
            <div className="flex gap-6 sm:gap-10 text-left">
              <ul className="flex flex-col gap-1.5">
                {['Edible Oil', 'Coconut Oil', 'Pulses', 'GN Seed', 'Rice & Paddy', 'Kirana'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-[14px] text-blue-200 hover:text-white transition-colors">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-1.5">
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

          {/* Column 4: Download App (Takes full width on small screens, 3 cols on lg) */}
          <div className="col-span-1 min-[420px]:col-span-2 lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-[16px] font-bold text-white mb-4 sm:mb-5">Download App</h4>
            
            <div className="flex flex-row flex-wrap sm:flex-col gap-3 w-full max-w-sm lg:max-w-[180px]">
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white hover:bg-gray-900 transition-colors border border-gray-800">
                <img src={appStoreIcon} alt="App Store" className="h-6 w-6" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-300">Download on the</span>
                  <span className="text-[14px] font-semibold">App Store</span>
                </div>
              </button>

              {/* Play Store Button */}
              <button className="flex items-center justify-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white hover:bg-gray-900 transition-colors border border-gray-800">
                <img src={playStoreIcon} alt="Google Play" className="h-5 w-5" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-300">GET IT ON</span>
                  <span className="text-[14px] font-semibold">Google Play</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-blue-800/50 flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-center sm:text-left text-blue-200 text-[13px]">
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

export default Footer;
