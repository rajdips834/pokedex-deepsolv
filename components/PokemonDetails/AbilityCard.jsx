const AbilityCard = ({ ability }) => (
  <div className="group flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30 hover:border-white/50">
    <span className="font-semibold capitalize text-white/90 group-hover:text-white">
      {ability.name.replace("-", " ")}
    </span>
    {ability.is_hidden && (
      <span className="px-2 py-1 bg-yellow-400/80 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
        Hidden
      </span>
    )}
  </div>
);
export default AbilityCard;
