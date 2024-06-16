import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api";

function TopicGridPage() {
  const [topics, setTopics] = useState([]);
  const { subject, exam} = useParams()

  useEffect(() => {

    api
      .post(`/api/exams/topics`, {
        "examName": exam,
        "subjectName": subject
      })
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exam, subject]);

  return (<>
  <div className="ss-card w-full h-20 bg-white flex justify-center mt-10 shadow-lg rounded-lg">

    <h1 className="text-2xl font-bold text-violet-900"><br />Select A Topic</h1>
  </div>
    <div className="grid grid-cols-4 gap-10 justify-center mt-20">

      {topics.map((topic, index) => (
        <TopicCard key={index} topic={topic.name} cost={topic.cost} sname={subject} ename={exam} />
      ))}
    </div>
  </>
  );
}

function TopicCard(props) {
  const navigate = useNavigate()
  return (
    <div className="ss-card w-64 h-20 bg-white text-blue-500 shadow-lg cursor-pointer mb-4 flex items-center justify-center rounded-lg  hover:shadow-2xl hover:shadow-blue-200"
      onClick={() => navigate(`/${props.ename}/${props.sname}/${props.topic}`)}>
      <br />
      <h4 className="text-xl font-bold">{props.topic}</h4>
    </div>
  );
}

export default TopicGridPage;
