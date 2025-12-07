const StatBar = ({ stat }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-sm">
      <span className="capitalize font-medium">
        {stat.name.replace("-", " ")}:
      </span>
      <span className="font-bold">{stat.base_stat}</span>
    </div>
    <div className="w-full bg-white/30 rounded-full h-2">
      <div
        className="bg-linear-to-r from-purple-400 to-pink-400 h-2 rounded-full shadow-inner transition-all duration-500"
        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
      />
    </div>
  </div>
);
export default StatBar;
