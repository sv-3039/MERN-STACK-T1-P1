import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, Tag, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty, removeFromCart, subtotal, discountAmount, shipping, total, coupon, applyCoupon, setCoupon, notify } = useStore();
  const [code, setCode] = useState("");

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setCartOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white text-zinc-900 shadow-2xl dark:bg-[#0b0b0c] dark:text-white"
          >
            <div className="flex items-center justify-between border-b hairline px-6 py-5">
              <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">Your Bag ({cart.reduce((n, i) => n + i.qty, 0)})</h3>
              <button onClick={() => setCartOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><X size={20} /></button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={48} className="text-zinc-300 dark:text-zinc-700" />
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Your bag is currently empty.</p>
                <button onClick={() => setCartOpen(false)} className="mt-2 rounded-full bg-royal px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-600">Explore Collection</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <div key={item.key} className="flex gap-3.5 rounded-2xl border hairline bg-zinc-50 p-3.5 dark:bg-zinc-900/80">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-zinc-800 border hairline">
                          <ProductImage src={item.product.image} seed={item.product.id} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-white">{item.product.name}</p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Size: <span className="font-medium text-zinc-800 dark:text-zinc-200">{item.size}</span> · <span className="font-medium text-zinc-800 dark:text-zinc-200">{item.color?.name}</span></p>
                            </div>
                            <button onClick={() => removeFromCart(item.key)} className="rounded-full p-1 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition" title="Remove item">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2.5 rounded-full border hairline bg-white px-2.5 py-1 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                              <button onClick={() => updateQty(item.key, item.qty - 1)} className="text-zinc-500 hover:text-royal dark:text-zinc-400"><Minus size={13} /></button>
                              <span className="w-4 text-center text-xs font-bold">{item.qty}</span>
                              <button onClick={() => updateQty(item.key, item.qty + 1)} className="text-zinc-500 hover:text-royal dark:text-zinc-400"><Plus size={13} /></button>
                            </div>
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">₹{(item.qty * item.product.finalPrice).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t hairline bg-zinc-50/50 p-6 dark:bg-zinc-900/50">
                  <div className="mb-4 flex items-center gap-2 rounded-full border hairline bg-white px-3.5 py-2 dark:bg-zinc-800">
                    <Tag size={15} className="text-zinc-400" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code (try STYLE10)"
                      className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
                    />
                    {coupon ? (
                      <button onClick={() => { setCoupon(null); notify("Coupon removed", "info"); }} className="text-xs font-bold text-rose-500 hover:underline">Remove</button>
                    ) : (
                      <button onClick={() => applyCoupon(code)} className="text-xs font-bold text-royal hover:underline">Apply</button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><span>Subtotal</span><span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal.toLocaleString("en-IN")}</span></div>
                    {coupon && <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400"><span>Coupon ({coupon.code})</span><span>-₹{discountAmount.toLocaleString("en-IN")}</span></div>}
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400"><span>Shipping</span><span className="font-semibold text-zinc-900 dark:text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                    <div className="mt-2 flex justify-between border-t hairline pt-2 text-base font-bold text-zinc-900 dark:text-white"><span>Total</span><span className="text-royal">₹{total.toLocaleString("en-IN")}</span></div>
                  </div>

                  <button onClick={() => notify("Checkout process started!")} className="mt-5 w-full rounded-full bg-royal py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600">
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-3 flex justify-between items-center px-1">
                    <Link to="/cart" onClick={() => setCartOpen(false)} className="text-xs font-medium text-royal hover:underline">
                      View Full Bag Page →
                    </Link>
                    <Link to="/wishlist" onClick={() => setCartOpen(false)} className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      Saved Wishlist
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
