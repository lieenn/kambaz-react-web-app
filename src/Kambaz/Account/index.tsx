import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
export default function Account() {
  return (
    <div>
      <h2>Account</h2>
      <table width="50%">
        <tbody>
          <tr>
            <td valign="top" style={{ width: "200px", paddingRight: "20px" }}>
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/Kambaz/Account/Signin" />}
                />
                <Route path="Signin" element={<Signin />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
