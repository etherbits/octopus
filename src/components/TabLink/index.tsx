import { Link, To, useLocation } from "react-router-dom";

interface Props {
  to: To;
  iconPath: string;
  label: string;
}

const TabLink: React.FC<Props> = ({ to, iconPath, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <div
        className={`flex items-center px-2 py-1 gap-3 rounded-md group 
        hover:bg-neutral-900
          ${isActive ? "bg-neutral-900" : ""}`}
      >
        <div
          className={`bg-neutral-200 w-5 h-5 group-hover:bg-orange-300 
          ${isActive ? "bg-orange-300" : ""}`}
          style={{ maskImage: `url(${iconPath})` }}
        />
        <span
          className={`text-neutral-200 group-hover:text-orange-300 ${
            isActive ? "text-orange-300" : ""
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default TabLink;
