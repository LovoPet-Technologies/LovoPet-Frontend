function MegaMenuPanel({ columns = [], onNavigate }) {
  if (!columns.length) return null;

  return (
    <div className="absolute left-0 right-0 border-t border-[#5C2A73]/10 bg-[#FDF8F2] shadow-lg">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8 xl:grid-cols-6">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#5C2A73]">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => onNavigate(e, item.path)}
                    className="inline-flex items-center gap-2 text-sm text-[#5C2A73]/80 transition-colors hover:text-[#E86A33]"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-[#8B9A5B] px-2 py-0.5 text-[10px] font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MegaMenuPanel;
