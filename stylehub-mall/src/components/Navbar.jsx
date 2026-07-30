import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, Sun, Moon, User, ChevronDown } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { CATEGORY_HEADERS } from "../data/products";

const NAV = [
  { label: "Men", to: "/men", cats: CATEGORY_HEADERS.Men },
  { label: "Women", to: "/women", cats: CATEGORY_HEADERS.Women },
  { label: "Accessories", to: "/accessories", cats: CATEGORY_HEADERS.Accessories },
  { label: "Blog", to: "/blog" },
];

export default function Navbar() {
  const { cartCount, wishlist, dark, setDark, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = (label) => {
    clearTimeout(closeTimer.current);
    setMegaOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 150);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/90 shadow-sm backdrop-blur-md dark:bg-[#0b0b0c]/90" : "bg-white dark:bg-[#0b0b0c]"} border-b hairline`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <Link to="/" className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          STYLE<span className="text-royal">HUB</span> <span className="hidden text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-ink/50 dark:text-white/50 sm:inline">Mall</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => item.cats && openMega(item.label)} onMouseLeave={scheduleClose}>
              <Link to={item.to} className="flex items-center gap-1 text-sm font-medium text-ink/80 transition hover:text-royal dark:text-white/80">
                {item.label}
                {item.cats && <ChevronDown size={14} />}
              </Link>
              <AnimatePresence>
                {item.cats && megaOpen === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3"
                  >
                    <div className="flex gap-8 rounded-2xl border hairline bg-white p-6 shadow-xl dark:bg-[#151516]">
                      {item.cats.map((c) => (
                        <div key={c} className="min-w-[150px]">
                          <Link to={`${item.to}?category=${encodeURIComponent(c)}`} className="mb-2 block text-xs font-semibold uppercase tracking-wide text-royal">
                            {c}
                          </Link>
                          <p className="text-xs leading-relaxed text-ink/55 dark:text-white/50">Shop the {c.toLowerCase()} edit</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button onClick={() => setSearchOpen((v) => !v)} className="rounded-full p-2 hover:bg-cloud dark:hover:bg-white/10" aria-label="Search">
            <Search size={19} />
          </button>
          <button onClick={() => setDark(!dark)} className="hidden rounded-full p-2 hover:bg-cloud dark:hover:bg-white/10 sm:block" aria-label="Toggle dark mode">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="hidden rounded-full p-2 hover:bg-cloud dark:hover:bg-white/10 sm:block" aria-label="Account">
            <User size={19} />
          </button>
          <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-cloud dark:hover:bg-white/10" aria-label="Wishlist">
            <Heart size={19} />
            {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-royal text-[9px] font-bold text-white">{wishlist.length}</span>}
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative rounded-full p-2 hover:bg-cloud dark:hover:bg-white/10" aria-label="Cart">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-royal text-[9px] font-bold text-white">{cartCount}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t hairline bg-cloud dark:bg-neutral-900">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
              <Search size={18} className="text-ink/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for kurtas, sneakers, dresses..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
              />
              <button type="submit" className="rounded-full bg-royal px-4 py-1.5 text-xs font-semibold text-white">Search</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.25 }} className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-xs bg-white p-6 dark:bg-[#0b0b0c]">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">STYLEHUB</span>
                <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-5">
                {NAV.map((item) => (
                  <div key={item.label}>
                    <Link to={item.to} onClick={() => setMobileOpen(false)} className="text-base font-medium">{item.label}</Link>
                    {item.cats && (
                      <div className="mt-2 ml-3 flex flex-col gap-2 border-l hairline pl-3">
                        {item.cats.map((c) => (
                          <Link key={c} to={`${item.to}?category=${encodeURIComponent(c)}`} onClick={() => setMobileOpen(false)} className="text-xs text-ink/60 dark:text-white/60">{c}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => setDark(!dark)} className="mt-4 flex items-center gap-2 text-sm text-ink/70 dark:text-white/70">
                  {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? "Light mode" : "Dark mode"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
