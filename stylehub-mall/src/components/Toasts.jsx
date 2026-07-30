import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Heart, Info, XCircle } from "lucide-react";
import { useStore } from "../context/StoreContext";

const ICONS = {
  success: <CheckCircle2 size={16} className="text-emerald-500" />,
  wishlist: <Heart size={16} className="fill-royal text-royal" />,
  info: <Info size={16} className="text-royal" />,
  error: <XCircle size={16} className="text-rose-500" />,
};

export default function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed top-20 right-4 z-[100] flex flex-col gap-2 sm:right-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="flex items-center gap-2 rounded-xl border hairline bg-white px-4 py-3 text-xs font-medium shadow-lg dark:bg-neutral-900"
          >
            {ICONS[t.kind] || ICONS.success}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
