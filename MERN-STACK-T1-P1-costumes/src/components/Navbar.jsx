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
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md backdrop-blur-md dark:bg-zinc-950/95" : "bg-white dark:bg-zinc-950"} border-b hairline text-zinc-900 dark:text-white`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <button className="lg:hidden text-zinc-900 dark:text-white p-1 hover:text-royal" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <Link to="/" className="font-display text-xl font-semibold tracking-tight sm:text-2xl text-zinc-900 dark:text-white">
          STYLE<span className="text-royal">HUB</span> <span className="hidden text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 sm:inline">Mall</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => item.cats && openMega(item.label)} onMouseLeave={scheduleClose}>
              <Link to={item.to} className="flex items-center gap-1 text-sm font-medium text-zinc-800 transition hover:text-royal dark:text-zinc-200 dark:hover:text-royal">
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
                    <div className="flex gap-8 rounded-2xl border hairline bg-white p-6 shadow-xl dark:bg-zinc-900 text-zinc-900 dark:text-white">
                      {item.cats.map((c) => (
                        <div key={c} className="min-w-[150px]">
                          <Link to={`${item.to}?category=${encodeURIComponent(c)}`} className="mb-2 block text-xs font-semibold uppercase tracking-wide text-royal hover:underline">
                            {c}
                          </Link>
                          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">Shop the {c.toLowerCase()} edit</p>
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
          <button onClick={() => setSearchOpen((v) => !v)} className="rounded-full p-2 text-zinc-800 hover:bg-zinc-100 hover:text-royal dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-royal transition" aria-label="Search">
            <Search size={19} />
          </button>
          <button onClick={() => setDark(!dark)} className="hidden rounded-full p-2 text-zinc-800 hover:bg-zinc-100 hover:text-royal dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-royal transition sm:block" aria-label="Toggle dark mode">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="hidden rounded-full p-2 text-zinc-800 hover:bg-zinc-100 hover:text-royal dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-royal transition sm:block" aria-label="Account">
            <User size={19} />
          </button>
          <Link to="/wishlist" className="relative rounded-full p-2 text-zinc-800 hover:bg-zinc-100 hover:text-royal dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-royal transition" aria-label="Wishlist">
            <Heart size={19} />
            {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-royal text-[9px] font-bold text-white shadow">{wishlist.length}</span>}
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative rounded-full p-2 text-zinc-800 hover:bg-zinc-100 hover:text-royal dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-royal transition" aria-label="Cart">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-royal text-[9px] font-bold text-white shadow">{cartCount}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t hairline bg-zinc-50 dark:bg-zinc-900">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
              <Search size={18} className="text-zinc-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for kurtas, sneakers, dresses..."
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
              />
              <button type="submit" className="rounded-full bg-royal px-5 py-2 text-xs font-semibold text-white shadow hover:bg-blue-600">Search</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col justify-between rounded-r-3xl border-r hairline bg-white p-6 text-zinc-900 shadow-2xl dark:bg-zinc-900 dark:text-white overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="mb-6 flex items-center justify-between border-b hairline pb-4">
                  <span className="font-display text-2xl font-bold tracking-tight">STYLE<span className="text-royal">HUB</span> <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-zinc-400">Mall</span></span>
                  <button onClick={() => setMobileOpen(false)} className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={submitSearch} className="mb-6 flex items-center gap-2 rounded-2xl border hairline bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5">
                  <Search size={18} className="text-zinc-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search t-shirts, dresses, jackets..."
                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 font-medium"
                  />
                  {query && (
                    <button type="submit" className="rounded-lg bg-royal px-2.5 py-1 text-[11px] font-bold text-white">Go</button>
                  )}
                </form>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3">
                  {NAV.map((item) => (
                    <div key={item.label} className="rounded-2xl border hairline bg-zinc-50/80 p-3.5 dark:bg-zinc-800/50">
                      <div className="flex items-center justify-between">
                        <Link to={item.to} onClick={() => setMobileOpen(false)} className="text-base font-bold text-zinc-900 dark:text-white hover:text-royal dark:hover:text-royal">
                          {item.label}
                        </Link>
                        {item.cats && <ChevronDown size={16} className="text-zinc-400" />}
                      </div>
                      {item.cats && (
                        <div className="mt-3 grid grid-cols-2 gap-2 border-t hairline pt-3">
                          {item.cats.map((c) => (
                            <Link
                              key={c}
                              to={`${item.to}?category=${encodeURIComponent(c)}`}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-xl bg-white dark:bg-zinc-800 p-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-royal hover:text-white dark:hover:bg-royal dark:hover:text-white transition text-center shadow-2xs"
                            >
                              {c}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Quick Shortcuts */}
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-2xl border hairline bg-zinc-50 p-3 dark:bg-zinc-800/60 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <div className="flex items-center gap-2">
                        <Heart size={16} className="text-royal" /> Wishlist
                      </div>
                      <span className="rounded-full bg-royal px-2 py-0.5 text-[10px] font-bold text-white">{wishlist.length}</span>
                    </Link>
                    <button onClick={() => { setMobileOpen(false); setCartOpen(true); }} className="flex items-center justify-between rounded-2xl border hairline bg-zinc-50 p-3 dark:bg-zinc-800/60 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-royal" /> Cart
                      </div>
                      <span className="rounded-full bg-royal px-2 py-0.5 text-[10px] font-bold text-white">{cartCount}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Toggle & Footer inside Mobile Menu */}
              <div className="mt-8 border-t hairline pt-4">
                <button
                  onClick={() => setDark(!dark)}
                  className="flex w-full items-center justify-between rounded-2xl border hairline bg-zinc-100 px-4 py-3 text-xs font-bold text-zinc-800 shadow-sm transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <div className="flex items-center gap-2.5">
                    {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
                    <span>{dark ? "Light Appearance" : "Dark Appearance"}</span>
                  </div>
                  <span className="rounded-full bg-royal/10 text-royal dark:bg-royal/20 dark:text-blue-400 px-2.5 py-1 text-[10px] font-bold uppercase">
                    {dark ? "Dark" : "Light"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
