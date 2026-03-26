type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
};

export function Slider({ min, max, step = 1, value, onChange, label, unit }: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-midnight-lighter text-sm">{label}</label>
        <span className="text-3xl font-bold font-mono text-fire">
          {value}
          {unit && <span className="text-lg text-midnight-lighter ml-1">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-midnight-dark accent-fire"
      />
    </div>
  );
}
