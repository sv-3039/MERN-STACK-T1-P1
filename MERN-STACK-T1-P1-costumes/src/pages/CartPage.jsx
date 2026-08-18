import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, Tag, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import { useStore } from "../context/StoreContext";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, subtotal, discountAmount, shipping, total, coupon, applyCoupon, setCoupon, notify } = useStore();
  const [code, setCode] = useState("");

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 text-center">
        <Breadcrumb items={[{ label: "Shopping Bag" }]} />
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border hairline bg-white p-12 dark:bg-zinc-900 shadow-sm max-w-lg mx-auto">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-royal dark:bg-zinc-800 dark:text-blue-400 mb-4">
            <ShoppingBag size={36} />
          </div>
          <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">Your Shopping Bag is Empty</h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Looks like you haven't added any products to your bag yet.</p>
          <Link to="/men" className="mt-6 rounded-full bg-royal px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-600 transition">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Shopping Bag" }]} />

      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b hairline pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-white">Your Shopping Bag</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Review items, apply coupons, and proceed to checkout.</p>
        </div>
        <Link to="/men" className="flex items-center gap-2 text-xs font-semibold text-royal hover:underline">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.key} className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl border hairline bg-white p-5 shadow-sm dark:bg-zinc-900/90 text-zinc-900 dark:text-white">
              <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border hairline">
                <ProductImage src={item.product.image} seed={item.product.id} alt={item.product.name} className="h-full w-full object-cover" />
              </div>
              
              <div className="flex flex-1 flex-col justify-between w-full">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-royal">{item.product.brand}</span>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{item.product.name}</h3>
                    <div className="mt-1 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Size: <strong className="text-zinc-800 dark:text-zinc-200">{item.size}</strong></span>
                      <span>Color: <strong className="text-zinc-800 dark:text-zinc-200">{item.color?.name}</strong></span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.key)} className="rounded-full p-2 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition" title="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between border-t hairline pt-3">
                  <div className="flex items-center gap-3 rounded-full border hairline px-3 py-1 bg-zinc-50 dark:bg-zinc-800">
                    <button onClick={() => updateQty(item.key, item.qty - 1)} className="text-zinc-500 hover:text-royal"><Minus size={14} /></button>
                    <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} className="text-zinc-500 hover:text-royal"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-zinc-900 dark:text-white">₹{(item.qty * item.product.finalPrice).toLocaleString("en-IN")}</span>
                    {item.product.discount > 0 && (
                      <span className="ml-2 text-xs text-zinc-400 line-through">₹{(item.qty * item.product.price).toLocaleString("en-IN")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2.5 rounded-xl border hairline p-3 bg-zinc-50 dark:bg-zinc-900">
              <Truck size={18} className="text-royal" /> Free Express Delivery ₹1,999+
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border hairline p-3 bg-zinc-50 dark:bg-zinc-900">
              <RotateCcw size={18} className="text-royal" /> 15 Days Return Policy
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border hairline p-3 bg-zinc-50 dark:bg-zinc-900">
              <ShieldCheck size={18} className="text-royal" /> 100% Secure Checkout
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="h-fit rounded-2xl border hairline bg-white p-6 shadow-sm dark:bg-zinc-900 text-zinc-900 dark:text-white">
          <h2 className="font-display text-lg font-bold border-b hairline pb-3">Order Summary</h2>

          <div className="my-4 flex items-center gap-2 rounded-full border hairline bg-zinc-50 px-3.5 py-2.5 dark:bg-zinc-800">
            <Tag size={16} className="text-zinc-400" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code (STYLE10)"
              className="w-full bg-transparent text-xs text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
            />
            {coupon ? (
              <button onClick={() => { setCoupon(null); notify("Coupon removed", "info"); }} className="text-xs font-bold text-rose-500 hover:underline">Remove</button>
            ) : (
              <button onClick={() => applyCoupon(code)} className="text-xs font-bold text-royal hover:underline">Apply</button>
            )}
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Subtotal ({cart.reduce((n, i) => n + i.qty, 0)} items)</span>
              <span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {coupon && (
              <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Discount ({coupon.code})</span>
                <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-zinc-900 dark:text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="mt-2 flex justify-between border-t hairline pt-3 text-lg font-bold text-zinc-900 dark:text-white">
              <span>Order Total</span>
              <span className="text-royal">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button onClick={() => notify("Checkout process started!")} className="mt-6 w-full rounded-full bg-royal py-4 text-sm font-bold text-white shadow-xl hover:bg-blue-600 transition">
            Proceed to Secure Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
