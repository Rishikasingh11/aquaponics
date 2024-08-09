import { FaDroplet } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-primary dark:text-primary">
      <span className="h-8 flex items-center text-2xl">
        <FaDroplet className="mr-2" />
        <Link to="/">Aquaponics</Link>
      </span>
    </div>
  );
};

export default Logo;
