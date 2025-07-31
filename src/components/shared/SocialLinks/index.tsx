import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import "./styles.scss";

const SocialLinks: React.FC = () => {
  return (
    <>
      <ul className="socialLinks">
        <li>
          <IconBtn IconComponent={FaFacebookF} />
        </li>
        <li>
          <IconBtn IconComponent={FaTwitter} />
        </li>
        <li>
          <IconBtn IconComponent={FaLinkedinIn} />
        </li>
        <li>
          <IconBtn IconComponent={FaPinterestP} />
        </li>
      </ul>
    </>
  );
};

export default SocialLinks;
