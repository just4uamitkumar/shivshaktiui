import { Stack } from "@mui/material";
import TypoGraphy from "../../../common/TypoGraphy";

interface Props {
  password: string;
}

const PasswordRule: React.FC<Props> = ({ password }) => {
  return (
    <>
      {password.length > 0 && (
        <Stack className="mt-2">
          <ul className="password-rules">
            <li>
              <TypoGraphy
                variant="body2"
                typeClass={password.length >= 8 ? "green-text" : "danger-text"}
              >
                {"Password must be at least 8 characters long."}
              </TypoGraphy>
            </li>
            <li>
              <TypoGraphy
                variant="body2"
                typeClass={
                  /[A-Z]/.test(password) ? "green-text" : "danger-text"
                }
              >
                {"Password must contain at least one uppercase letter."}
              </TypoGraphy>
            </li>
            <li>
              <TypoGraphy
                variant="body2"
                typeClass={
                  /[a-z]/.test(password) ? "green-text" : "danger-text"
                }
              >
                {"Password must contain at least one lowercase letter."}
              </TypoGraphy>
            </li>
            <li>
              <TypoGraphy
                variant="body2"
                typeClass={
                  /[0-9]/.test(password) ? "green-text" : "danger-text"
                }
              >
                {"Password must contain at least one number."}
              </TypoGraphy>
            </li>
            <li>
              <TypoGraphy
                variant="body2"
                typeClass={
                  /[!@#$]/.test(password) ? "green-text" : "danger-text"
                }
              >
                {"Password must contain at least one special character (!@#$)."}
              </TypoGraphy>
            </li>
          </ul>
        </Stack>
      )}
    </>
  );
};

export default PasswordRule;
