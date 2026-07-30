import Breadcrumb from "../components/Breadcrumb";
import FaqAccordion from "../components/FaqAccordion";
import { FAQS } from "../data/content";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "FAQ" }]} />
      <h1 className="mt-4 mb-2 font-display text-3xl font-semibold sm:text-4xl">Frequently Asked Questions</h1>
      <p className="mb-10 text-sm text-ink/55 dark:text-white/50">Everything you need to know about shopping with StyleHub Mall.</p>
      <FaqAccordion items={FAQS} />
    </div>
  );
}
