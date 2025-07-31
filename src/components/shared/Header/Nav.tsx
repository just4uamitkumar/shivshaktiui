import { Link } from "react-router";

const Nav: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/about">Pages</Link>
          </li>
          <li>
            <Link to="/Jyotirling">Jyotirlings</Link>
          </li>

          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li>
            <Link to="/Gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
