type ChoiceGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  columns?: number;
};

export function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: ChoiceGroupProps<T>) {
  return (
    <div>
      <label className="block text-midnight-lighter text-sm mb-3">{label}</label>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
              value === opt.value
                ? "bg-fire border-fire text-white"
                : "bg-midnight-dark border-midnight-light text-midnight-lighter hover:border-fire"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
