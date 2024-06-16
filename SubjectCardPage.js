import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api";

function Subject({ name, exam }) {
  const navigate = useNavigate();
  return (
    <div
      className="ss-card w-64 h-20 bg-white text-blue-500 shadow-lg cursor-pointer mb-4 flex items-center justify-center rounded-lg  hover:shadow-2xl hover:shadow-blue-200"
      onClick={() => navigate(`/${exam}/${name}`)}
    >
      <h2 className="text-xl font-bold">{name}</h2>
    </div>
  );
}

function SubjectCardPage() {
  const [subjects, setSubjects] = useState([]);
  const { exam } = useParams();

  useEffect(() => {
    api
      .post(`/api/exams/subjects`, { name: exam })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (<>
  <div className="ss-card w-full h-20 bg-white flex justify-center mt-10 shadow-lg rounded-lg">
    
    <h1 className="text-2xl font-bold text-violet-900"><br/>Select A Subject</h1>
    </div>
    <div className="grid grid-cols-4 gap-10 justify-center mt-20">
      {subjects.map((subject) => (
        <Subject key={subject._id} name={subject.name} exam={exam} />
      ))}

    </div>
    </>
  );
}

export default SubjectCardPage;
