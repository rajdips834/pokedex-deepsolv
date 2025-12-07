const InfoSection = ({ title, color, children }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      {title}
    </h3>
    <div
      className={`p-6 rounded-2xl bg-linear-to-r ${color} text-white shadow-xl`}
    >
      {children}
    </div>
  </div>
);
export default InfoSection;
