import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Lock } from "lucide-react";
import type { RadarScores, ProcessId } from "../../types/audit";
import { PROCESSES } from "../../lib/constants";

type Props = {
  radarScores: RadarScores;
  selectedProcess: ProcessId;
  potentialAdditionalCost: number;
};

export function MaturityRadar({ radarScores, selectedProcess }: Props) {
  const data = PROCESSES.map((p) => ({
    process: p.title,
    score: radarScores[p.id].score,
    locked: radarScores[p.id].locked,
    fullMark: 5,
  }));

  return (
    <div className="py-10">
      <h3 className="text-xl font-bold text-center mb-6">Votre radar de maturité opérationnelle</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#4c7093" />
            <PolarAngleAxis
              dataKey="process"
              tick={{ fill: "#ccd6e0", fontSize: 11 }}
            />
            <Radar
              dataKey="score"
              stroke="#e3943b"
              fill="#e3943b"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {PROCESSES.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
              p.id === selectedProcess
                ? "bg-fire/20 text-fire"
                : "bg-midnight-dark text-midnight-light"
            }`}
          >
            {radarScores[p.id].locked && <Lock className="w-3 h-3" />}
            <span>{p.title}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-midnight-lighter text-sm mt-6">
        Vous êtes totalement à l'aveugle sur vos 5 autres processus.
        Prenez rendez-vous avec l'Architecte pour déverrouiller l'audit complet.
      </p>
    </div>
  );
}
