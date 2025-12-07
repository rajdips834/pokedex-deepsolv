const TypeBadge = ({ type, slot }) => (
  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-2xl shadow-lg border border-white/30 flex items-center gap-1">
    <span
      className={`w-2 h-2 rounded-full bg-white/50 flex-shrink-0 ${
        slot === 1 ? "bg-yellow-300" : "bg-gray-300"
      }`}
    />
    {type}
  </span>
);
export default TypeBadge;
