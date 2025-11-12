export function PCBTraces() {
  return (
    <>
      {/* Decorative PCB trace lines */}
      <div className="absolute left-12 top-24 w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute right-16 top-1/3 w-0.5 h-40 bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
      <div className="absolute left-1/4 bottom-32 w-24 h-0.5 bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-transparent" />
      <div className="absolute right-1/3 bottom-24 w-0.5 h-32 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

      {/* Circuit connection nodes */}
      <div className="absolute left-12 top-24 w-1.5 h-1.5 rounded-full bg-amber-500/50" />
      <div className="absolute right-16 top-1/3 w-1.5 h-1.5 rounded-full bg-green-500/50" />
      <div className="absolute left-1/4 bottom-32 w-1.5 h-1.5 rounded-full bg-orange-500/50" />
    </>
  );
}
