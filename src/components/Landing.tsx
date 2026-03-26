import { motion } from "framer-motion";

type LandingProps = {
  onStart: () => void;
};

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Chaque mois, votre entreprise{" "}
          <span className="text-fire">brûle du cash</span> sans que vous le
          voyiez.
        </h1>
        <p className="text-lg md:text-xl text-midnight-lighter mb-10">
          En 2 minutes, identifiez votre plus grosse fuite opérationnelle et son
          coût réel.
        </p>
        <button
          onClick={onStart}
          className="bg-fire hover:bg-fire-dark text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Lancer l'audit
        </button>
      </motion.div>
      <footer className="absolute bottom-8 text-sm text-midnight-light">
        Conçu par un ex-DAF & architecte en automatisation —{" "}
        <span className="text-fire">Grow Up Consulting</span>
      </footer>
    </div>
  );
}
