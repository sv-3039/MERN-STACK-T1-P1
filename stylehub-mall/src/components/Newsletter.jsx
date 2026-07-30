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
    <div className="border-b hairline bg-ink dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-10"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-royal/20 text-royal">
          <Mail size={20} />
        </div>
        <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">Join the inner circle</h3>
        <p className="max-w-md text-sm text-white/60">Get early access to new drops, styling edits and members-only offers. No spam, just style.</p>
        <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-royal"
          />
          <button type="submit" className="shrink-0 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white transition hover:bg-royal-700">
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  );
}
