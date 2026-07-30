import { Link } from "react-router-dom";
import { Camera, MessageCircle, AtSign, Play, MapPin, Phone, Mail } from "lucide-react";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t hairline bg-cloud dark:bg-neutral-950">
      <Newsletter />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-10">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-xl font-semibold">STYLE<span className="text-royal">HUB</span></span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60 dark:text-white/55">
            A premium destination for men's and women's fashion — considered fits, honest fabrics, elevated everyday style.
          </p>
          <div className="mt-4 flex gap-3">
            {[Camera, MessageCircle, AtSign, Play].map((Icon, i) => (
              <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition hover:bg-royal hover:text-white dark:bg-neutral-800 dark:text-white">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider">Shop</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ink/65 dark:text-white/60">
            <li><Link to="/men" className="hover:text-royal">Men's Collection</Link></li>
            <li><Link to="/women" className="hover:text-royal">Women's Collection</Link></li>
            <li><Link to="/accessories" className="hover:text-royal">Accessories</Link></li>
            <li><Link to="/men?tag=New+Arrival" className="hover:text-royal">New Arrivals</Link></li>
            <li><Link to="/women?tag=Sale" className="hover:text-royal">Flash Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider">Company</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ink/65 dark:text-white/60">
            <li><Link to="/blog" className="hover:text-royal">Fashion Blog</Link></li>
            <li><Link to="/faq" className="hover:text-royal">FAQs</Link></li>
            <li><a href="#" className="hover:text-royal">About Us</a></li>
            <li><a href="#" className="hover:text-royal">Careers</a></li>
            <li><a href="#" className="hover:text-royal">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider">Get in touch</h4>
          <ul className="flex flex-col gap-3 text-sm text-ink/65 dark:text-white/60">
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> Level 3, StyleHub Mall, MG Road, Bengaluru</li>
            <li className="flex items-center gap-2"><Phone size={15} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={15} /> hello@stylehubmall.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-ink/50 dark:text-white/45 sm:flex-row sm:px-6 lg:px-10">
          <span>© 2026 StyleHub Mall. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-royal">Privacy Policy</a>
            <a href="#" className="hover:text-royal">Terms of Service</a>
            <a href="#" className="hover:text-royal">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
