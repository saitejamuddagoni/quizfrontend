import { Route } from "react-router-dom";
import { useRoutes } from "use-routes";
import jwt_decode from "jwt-decode";
import SCardGrid from "./SCardGrid";
import SubjectCardPage from "./SubjectCardPage";
import TopicGridPage from "./TopicGridPage";
import MockTestGridPage from "./MockTestGridPage";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import YourTestsPage from "./YourTestsPage";
import CreateTestPage from "./CreateTestPage";
import BeginCreatePage from "./BeginCreatePage";
import TLeaderBoard from "./TLeaderBoard";

const ProtectedRoute = ({ path, roles, element }) => {
  const token = localStorage.getItem("jwtToken");
  const userRole = token ? jwt_decode(token).role : null;

  if (!token || (roles && !roles.includes(userRole))) {
    return null;
  }

  return <Route path={path} element={element} />;
};

const ProtectedRoutes = () => {
  return useRoutes([
    <ProtectedRoute path="/home" roles={["student"]} element={<SCardGrid />} />,
    <ProtectedRoute
      path="/:examName/subjects"
      roles={["student"]}
      element={<SubjectCardPage />}
    />,
    <ProtectedRoute
      path="/:examName/:subjectName/topics"
      roles={["student"]}
      element={<TopicGridPage />}
    />,
    <ProtectedRoute
      path="/:examName/:subjectName/:topicName"
      roles={["student"]}
      element={<MockTestGridPage />}
    />,
    <ProtectedRoute
      path="/:mocktestId/mocktest"
      roles={["student"]}
      element={<QuestionPage />}
    />,
    <ProtectedRoute
      path="/:mockTestId/leaderboard"
      roles={["student"]}
      element={<LeaderBoard />}
    />,
    <ProtectedRoute
      path="/yourtests"
      roles={["student"]}
      element={<YourTestsPage />}
    />,

    <ProtectedRoute
      path="/create-test"
      roles={["teacher"]}
      element={<CreateTestPage />}
    />,
    <ProtectedRoute
      path="/begin-creation"
      roles={["teacher"]}
      element={<BeginCreatePage />}
    />,
    <ProtectedRoute
      path="/t-leaderboard"
      roles={["teacher"]}
      element={<TLeaderBoard />}
    />,
  ]);
};

export default ProtectedRoutes;
