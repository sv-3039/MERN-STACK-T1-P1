import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Newsletter() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return notify("Enter a valid email address", "error");
    notify("You're subscribed — welcome to StyleHub Mall!");
    setEmail("");
  };

  return (
    <div className="border-b border-zinc-800 bg-zinc-900 dark:bg-zinc-950 dark:border-zinc-800/80 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royal/20 text-blue-400 ring-8 ring-royal/10">
          <Mail size={22} />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">Join the Inner Circle</h3>
        <p className="max-w-md text-sm text-zinc-300">Get early access to new drops, luxury styling edits, and member-only offers. No spam, just pure style.</p>
        <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-full border border-zinc-700 bg-zinc-800/80 px-5 py-3 text-sm text-white outline-none placeholder:text-zinc-400 focus:border-royal focus:ring-2 focus:ring-royal/30"
          />
          <button type="submit" className="shrink-0 rounded-full bg-royal px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600">
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  );
}
