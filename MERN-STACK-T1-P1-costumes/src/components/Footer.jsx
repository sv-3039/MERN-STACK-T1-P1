import { Link } from "react-router-dom";
import { Camera, MessageCircle, AtSign, Play, MapPin, Phone, Mail } from "lucide-react";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-950 dark:border-zinc-800/80">
      <Newsletter />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-10">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl font-bold tracking-tight text-white">STYLE<span className="text-royal">HUB</span></span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
            A premium destination for fashion — considered fits, honest fabrics, elevated everyday style.
          </p>
          <div className="mt-5 flex gap-3">
            {[Camera, MessageCircle, AtSign, Play].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-royal hover:text-white">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-royal">Shop</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-zinc-300">
            <li><Link to="/men" className="hover:text-white transition">Men's Collection</Link></li>
            <li><Link to="/women" className="hover:text-white transition">Women's Collection</Link></li>
            <li><Link to="/accessories" className="hover:text-white transition">Accessories</Link></li>
            <li><Link to="/men?tag=New+Arrival" className="hover:text-white transition">New Arrivals</Link></li>
            <li><Link to="/women?tag=Sale" className="hover:text-white transition">Flash Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-royal">Company</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-zinc-300">
            <li><Link to="/blog" className="hover:text-white transition">Fashion Blog</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-royal">Get In Touch</h4>
          <ul className="flex flex-col gap-3 text-sm text-zinc-300">
            <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-royal" /> Level 3, StyleHub Mall, MG Road, Bengaluru</li>
            <li className="flex items-center gap-2.5"><Phone size={16} className="text-royal" /> +91 98765 43210</li>
            <li className="flex items-center gap-2.5"><Mail size={16} className="text-royal" /> hello@stylehubmall.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-zinc-400 sm:flex-row sm:px-6 lg:px-10">
          <span>© 2026 StyleHub Mall. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
