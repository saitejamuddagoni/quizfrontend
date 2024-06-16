import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api";
function SCardGrid() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .get(`/api/exams/`)
      .then((res) => setCards(res.data));
  }, []);
  return (<>
  <div className="crt flex flex-col justify-center items-center h-56 w-full bg-blue-100 shadow-lg">
      <h2 className="text-3xl font-bold text-violet-900">Welcome to MockTest Marketplace</h2><br/>
      <h2 className="text-xl font-bold text-red-400">Your go-to platform for top-quality mock tests, tailored to boost your exam preparation journey</h2>
  </div>
   <div className="ss-card w-full h-20 bg-white flex justify-center mt-10 shadow-lg rounded-lg">
    
    <h1 className="text-2xl font-bold text-violet-900"><br/>Select An Exam</h1>
    </div>
    <div className="grid grid-cols-4 gap-10 justify-center mt-20">
      {cards.map((name, index) => (
        <ExamCard exname={name} key={index} />
      ))}
    </div>
    </>
  );
}
function ExamCard(props) {
  const navigate = useNavigate();
  return (<div className="flex flex-col items-center justify-center w-50 h-32 bg-white  text-blue-500 rounded-lg shadow-lg  hover:shadow-2xl hover:shadow-blue-200"
         onClick={() => navigate(`/${props.exname}`)}>
        <h2 className="text-xl font-bold">{props.exname}</h2>      
    </div>
    
  );
}

export default SCardGrid;
