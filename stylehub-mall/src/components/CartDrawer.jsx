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
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white dark:bg-[#0b0b0c]"
          >
            <div className="flex items-center justify-between border-b hairline px-6 py-5">
              <h3 className="font-display text-lg font-semibold">Your Bag ({cart.reduce((n, i) => n + i.qty, 0)})</h3>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-ink/20" />
                <p className="text-sm text-ink/60 dark:text-white/60">Your bag is empty. Time to fix that.</p>
                <button onClick={() => setCartOpen(false)} className="mt-2 rounded-full bg-royal px-5 py-2 text-xs font-semibold text-white">Continue Shopping</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="flex flex-col gap-5">
                    {cart.map((item) => (
                      <div key={item.key} className="flex gap-3">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cloud dark:bg-neutral-900">
                          <ProductImage src={item.product.image} seed={item.product.id} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="line-clamp-1 text-sm font-medium">{item.product.name}</p>
                              <p className="text-xs text-ink/50 dark:text-white/45">Size {item.size} · {item.color?.name}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.key)} className="text-ink/40 hover:text-rose-500"><Trash2 size={15} /></button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border hairline px-2 py-1">
                              <button onClick={() => updateQty(item.key, item.qty - 1)}><Minus size={12} /></button>
                              <span className="w-4 text-center text-xs">{item.qty}</span>
                              <button onClick={() => updateQty(item.key, item.qty + 1)}><Plus size={12} /></button>
                            </div>
                            <span className="text-sm font-semibold">₹{(item.qty * item.product.finalPrice).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t hairline px-6 py-5">
                  <div className="mb-4 flex items-center gap-2 rounded-full border hairline px-3 py-2">
                    <Tag size={14} className="text-ink/40" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code (try STYLE10)"
                      className="w-full bg-transparent text-xs outline-none placeholder:text-ink/35"
                    />
                    {coupon ? (
                      <button onClick={() => { setCoupon(null); notify("Coupon removed", "info"); }} className="text-xs font-semibold text-rose-500">Remove</button>
                    ) : (
                      <button onClick={() => applyCoupon(code)} className="text-xs font-semibold text-royal">Apply</button>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 text-sm">
                    <div className="flex justify-between text-ink/60 dark:text-white/55"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                    {coupon && <div className="flex justify-between text-emerald-600"><span>Coupon ({coupon.code})</span><span>-₹{discountAmount.toLocaleString("en-IN")}</span></div>}
                    <div className="flex justify-between text-ink/60 dark:text-white/55"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                    <div className="mt-2 flex justify-between border-t hairline pt-2 text-base font-semibold"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                  </div>

                  <button onClick={() => notify("Checkout is a demo in this preview 🎉")} className="mt-4 w-full rounded-full bg-royal py-3.5 text-sm font-semibold text-white transition hover:bg-royal-700">
                    Checkout
                  </button>
                  <Link to="/wishlist" onClick={() => setCartOpen(false)} className="mt-3 block text-center text-xs text-ink/50 hover:text-royal dark:text-white/45">
                    Move items to wishlist instead?
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
