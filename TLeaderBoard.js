import { useState, useEffect } from "react";

import api from "../../api";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
function TLeaderBoard() {
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("authToken")
  const decoded = jwtDecode(token)
  var email = decoded.email
  const {mocktestId} = useParams()

  useEffect(() => {
    api
      .post(`/api/teacher/t-leaderboard`, {
        teacherEmail: email,
        mockTestId: mocktestId,
      })
      .then((response) => {
        setRows(response.data.leaderboard);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email,mocktestId]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">LeaderBoard</h1>

      <div>
        <table className="w-full bg-white shadow-md rounded-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Score</th>
              <th className="p-4 font-semibold">Rank</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {rows.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="p-4">{row.name}</td>
                <td className="p-4">{row.score}</td>
                <td className="p-4">{row.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TLeaderBoard;
