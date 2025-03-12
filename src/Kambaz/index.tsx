/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kambaz() {
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  return (
    <div id="wd-kambaz">
      <table width="100%">
        <tr>
          <td valign="top">
            <KambazNavigation />
          </td>
          <td valign="top">
            <div className="wd-main-content-offset p-3">
              <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route
                  path="/Dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard course={course} setCourse={setCourse} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/Courses/:cid/*" element={<Courses />} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/History" element={<h1>History</h1>} />
                <Route path="/Help" element={<h1>Help</h1>} />
                <Route path="/Commons" element={<h1>Commons</h1>} />
              </Routes>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
