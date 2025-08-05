import { Link } from "react-router";
import type { navListType } from "./type";

const Nav: React.FC = () => {
  const navList:navListType[] = [
    { name: "Jyotirlings", path: "/Jyotirling" },
    { name: "Products", path: "/Products" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Contact", path: "/Contact" },
    { name: "Blog", path: "/Blog" },
  ];
  return (
    <>
      <nav>
        <ul>
          {navList.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
