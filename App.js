import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./components/PublicComponents/NavBar";
import Error404 from "./components/PublicComponents/Error404";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import SCardGrid from "./components/StudentComponents/SCardGrid";
import YourTestsPage from "./components/StudentComponents/YourTestsPage";
import SubjectCardPage from "./components/StudentComponents/SubjectCardPage";
import TopicGridPage from "./components/StudentComponents/TopicGridPage";
import CreateTestPage from "./components/TeacherComponents/CreateTestPage";
import BeginCreatePage from "./components/TeacherComponents/BeginCreatePage";
import MockTestGridPage from "./components/StudentComponents/MockTestGridPage";
import QuestionPage from "./components/StudentComponents/QuestionPage";
import TLeaderBoard from "./components/TeacherComponents/TLeaderBoard";
import jwt_decode from "jwt-decode";
import TQuestionPage from "./components/TeacherComponents/TQuestionPage";

export default function App() {
  const [role, setUserRole] = useState(getUserRole());
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newToken = localStorage.getItem("authToken");
      if (newToken !== token) {
        setToken(newToken);
        setUserRole(getUserRole());

      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <NavBar role={role} setRole= {setUserRole}/>
        <div className="container mx-auto px-4 pt-14">
          <Routes>
            
           {!role && <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>}
              {role === "student" ? (
              <>
                <Route path="/shome" element={<SCardGrid />} />
                <Route path="/:exam" element={<SubjectCardPage />} />
                <Route path="/:exam/:subject" element={<TopicGridPage />} />
                <Route path="/:exam/:subject/:chapter" element={<MockTestGridPage />} />
                <Route path="/:mockTestId/mocktest" element={<QuestionPage />} />
                <Route path="/your-tests" element={<YourTestsPage />} />
              </>
            ) : null}

            {role === "teacher" ? (
              <>
                <Route path="/thome" element={<CreateTestPage />} />
                <Route path="/begin-creation" element={<BeginCreatePage />} />
                <Route path="/:mockTestId/tquestion" element={<TQuestionPage/>} />
                <Route path="/:mocktestId/t-leaderboard" element={<TLeaderBoard />} />
              </>
            ) : null}

            {/* Redirect to 404 page for unknown routes */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function getUserRole() {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const decodedToken = jwt_decode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        return null;
      }

      return decodedToken.role;
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  } return null }

