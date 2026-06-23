const StatsCard = ({
  title,
  value,
  subtitle
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">

      <h4 className="text-slate-500 text-sm">
        {title}
      </h4>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-xs text-slate-400 mt-1">
        {subtitle}
      </p>

    </div>
  );
};

export default StatsCard;