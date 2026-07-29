const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  iconBg,
  iconColor,
  borderColor,
}) => {
  return (
    <div
      className={`
        group
        rounded-3xl
        border
        bg-white
        px-5
        py-3.5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-slate-300
        ${borderColor}
      `}
    >

      {/* Top */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              ${iconBg}
            `}
          >
            <Icon
              size={20}
              className={iconColor}
            />
          </div>

          <p className="text-base font-semibold text-slate-700">

            {title}

          </p>

        </div>

      </div>

      {/* Value */}

      <div className="mt-3">

        <h2 className="text-[36px] font-bold leading-none text-slate-900">

          {value}

        </h2>

        <p className="mt-2 text-sm text-slate-400">

          {subtitle}

        </p>

      </div>

    </div>
  );
};

export default StatCard;