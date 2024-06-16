
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../api";
import jwtDecode from "jwt-decode";

function YourTestsPage() {

  return (
    <>
      <h1 className="font-bold text-blue-500 text-2xl">Your Tests</h1>
      <YCardGrid  />
  
    </>
  );
}
function YExamCard(props) {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center w-100 h-56 bg-white  text-blue-500 rounded-lg shadow-lg  hover:shadow-2xl hover:shadow-blue-200">
     
      <h4 className="text-2xl font-bold text-indigo-600">{props.name}</h4>
      <button onClick={()=>navigate(`/${props.id}/mocktest`)}
              className="w-60 p-2 mb-4 bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
              >Re-take Test</button>
    </div>
  );
}

function YCardGrid() {
  const [exams, setExams] = useState([]);
  const token = localStorage.getItem("authToken")
  const decoded = jwtDecode(token)
  var email = decoded.email

  useEffect(() => {
    api
      .post(`/api/exams/yourtests`,{ "email" :email })
      .then((response) => {
        console.log(response.data)
        setExams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[email]);

  return (
    <div  className="grid grid-cols-4 gap-10 justify-center mt-20">
      {exams.map((exam) => (
        <YExamCard key={exam.id} name={exam.name} id={exam.id} />
      ))}
    </div>
  );
}

export default YourTestsPage;
