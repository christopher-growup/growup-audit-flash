import { motion } from "framer-motion";
import {
  Receipt,
  BarChart3,
  FileText,
  Users,
  UserPlus,
  Clipboard,
} from "lucide-react";
import type { ProcessId } from "../types/audit";
import { PROCESSES } from "../lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  receipt: Receipt,
  "bar-chart-3": BarChart3,
  "file-text": FileText,
  users: Users,
  "user-plus": UserPlus,
  clipboard: Clipboard,
};

type ProcessPickerProps = {
  onSelect: (processId: ProcessId) => void;
};

export function ProcessPicker({ onSelect }: ProcessPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Quel processus vous fait perdre le plus de temps ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESSES.map((process, i) => {
            const Icon = ICONS[process.icon];
            return (
              <motion.button
                key={process.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => onSelect(process.id)}
                className="group bg-midnight-dark border border-midnight-light rounded-xl p-6 text-left cursor-pointer
                  hover:border-fire hover:-translate-y-1 hover:shadow-lg hover:shadow-fire/10 transition-all duration-200"
              >
                <Icon className="w-8 h-8 text-fire mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">{process.title}</h3>
                <p className="text-midnight-lighter text-sm">{process.tagline}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
