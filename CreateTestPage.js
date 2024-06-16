import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import jwtDecode from "jwt-decode";

function CreateTestPage() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
  const decoded = jwtDecode(token)
  var email = decoded.email
  useEffect(() => {
    api
      .post(`/api/teacher/mock-tests/`, { email: email })
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  return (
    <div >
      <div className="crt flex justify-center items-center h-56 w-full bg-blue-100">
      <button
          className="btn2 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={() => navigate("/begin-creation")}
        >
          <h2>Create a Test</h2>
        </button>
      </div>
      <div >
        <h1 className="text-2xl font-bold text-blue-600">
          Your Creations{" "}
        </h1>
        <CardGrid tests={tests} />
      </div>
    </div>
  );
}

function CardGrid({ tests }) {
  return (
    <div className="grid w-full grid-cols-4 gap-10 justify-center mt-20">
      {tests.map((test) => (
        <ExamCard key={test._id} id={test._id} name={test.name} />
      ))}
    </div>
  );
}

function ExamCard({ name, id }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-100 h-60 bg-white  text-blue-500 rounded-lg shadow-lg  hover:shadow-2xl hover:shadow-blue-200">
      <br />
      <h4 className="text-2xl font-bold text-indigo-600">{name}</h4>
      <button className="w-60 p-2 mb-4 bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => navigate(`/${id}/tquestion`)}>View Test</button>
      <button className="w-60 p-2 mb-4 bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => navigate(`/${id}/t-leaderboard`)}>leaderboard</button>
    </div>
  );
}

export default CreateTestPage;
