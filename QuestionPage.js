
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../../api";



function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);
  const {mockTestId} = useParams()
  const token = localStorage.getItem("authToken")
    const decoded = jwtDecode(token)
    var email = decoded.email
    const [rows, setRows] = useState({});
    const [submitted, SetSubmitted] = useState(false)
 

    const handleSubmit = () => {
      if (selectedOption !== "") {
        setAnswers((prevAnswers) => {
          const newAnswers = [...prevAnswers];
          newAnswers[currentQuestionIndex] = selectedOption;
          return newAnswers;
        });
      }
    
      const data = {
        email: email,
        mockTestId: mockTestId,
        correctAnswers: answers,
      };
    
      api
        .post(`/api/exams/mock-test-submit`, data)
        .then((response) => {
          console.log(response.data);
          setRows(response.data);
          SetSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    

  useEffect(() => {
    api
      .post(`/api/exams/mock-test-get`, {
        email: email,
        mockTestId: mockTestId,
      })
      .then((response) => {
        setQuestions(response.data.mockTest.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, mockTestId]);
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleNextClick = () => {
    if (selectedOption !== "") {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = selectedOption;
        return newAnswers;
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption("");
    } else {
      alert("Please select an option");
    }
  };

  const handlePrevClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOption("");
  };

  return (
    <>
        {!submitted &&<> <div className="fixed w-3/4 top-20 bottom-10 left-10 right-30 bg-white text-blue-500 p-6 rounded-lg shadow-lg">

        <h3 className="font-bold">{questions[currentQuestionIndex]?.text}</h3>
        {questions[currentQuestionIndex]?.options?.map((option, index) => (
          <div key={index} className="bg-blue-200 my-2 p-2 rounded-md">
          <input
            type="radio"
            id={index}
            value={option}
            checked={selectedOption === index }
            onChange={() => handleOptionSelect(index )}
            className="mr-2"
          />
          <label htmlFor={index}>{option}</label>
        </div>
        
        ))}

        <button
          className="w-64 p-2 mb-4 bg-pink-500 absolute left-3 hover:bg-pink-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={currentQuestionIndex === 0}
          onClick={handlePrevClick}
        >
          Previous
        </button>
        <button
          className="w-64 p-2 mb-4 bg-blue-500 hover:bg-blue-700 absolute right-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={currentQuestionIndex === questions.length - 1}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
      <CountQ
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
      
      <div className="fixed  bottom-10 h-2/5 w-1/5 right-2 left-75 right-10 bg-white p-6 rounded-lg shadow-lg text-center">

        <button className="relative top-15 w-11/12 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
                onClick={handleSubmit}>
          <h3>Finish Test</h3>
        </button>
        <br/><br/>
        <Timer numQuestions={questions.length}/>
      </div></>}
        { submitted && <LeaderBoard rows={rows} length={questions.length} />}
    </>
  );
}
export default QuestionPage;

function CountQ({ totalQuestions, currentQuestionIndex, setCurrentQuestionIndex }) {
  return (
    <div className="fixed top-20 right-2 w-1/5 h-2/5 grid grid-cols-4 gap-2 bg-white p-4 rounded-md shadow-lg">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <CButton
          key={index}
          index={index}
          isSelected={index === currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
      ))}
    </div>
  );
}

function CButton({ index, isSelected, setCurrentQuestionIndex }) {
  const handleClick = () => {
    setCurrentQuestionIndex(index);
  };

  return (
    <button
      className={`w-10 h-10 rounded-full bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
        isSelected ? "bg-blue-700" : ""
      }`}
      onClick={handleClick}
    >
      {index + 1}
    </button>
  );
}


function Timer({numQuestions}) {
  const [hours, setHours] = useState(Math.floor(numQuestions*2*60/3600));
  const [minutes, setMinutes] = useState(Math.floor((numQuestions*2*60 % 3600) / 60));
  const [seconds, setSeconds] = useState(Math.floor((numQuestions*2*60)%60));

  const intervalIdRef = useRef(null);
  
  useEffect(() => {
    let time = numQuestions*2*60;

    intervalIdRef.current = setInterval(() => {
      time -= 1;
      const ss = time % 60;
      const hs = Math.floor(time / 3600);
      const ms = Math.floor((time % 3600) / 60);

      setHours(hs);
      setMinutes(ms);
      setSeconds(ss);
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [numQuestions]);

  return (
    <div className="bg-blue-50 bottom-1shadow-lg p-4 rounded-md">
  <h3 className="text-blue-500 text-lg font-semibold">Remaining Time:</h3>
  <h1 className="text-blue-700 text-2xl font-bold">
    {hours.toString().padStart(2, "0")}:
    {minutes.toString().padStart(2, "0")}:
    {seconds.toString().padStart(2, "0")}
  </h1>
</div>

  );
}


function LeaderBoard({rows, length}) {


  const navigate = useNavigate()

  


  return (
    <>
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">LeaderBoard</h1>

      <div >
        <table className="w-full bg-white shadow-md rounded-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Score</th>
              <th className="p-4 font-semibold">Rank</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {rows.leaderboard &&
              rows.leaderboard.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="p-4">{row.name}</td>
                  <td className="p-4">{row.score}/{length}</td>
                  <td className="p-4">{row.rank}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <br/>
        <button className="w-60 p-2 mb-4 bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={()=>navigate('/home')} 
                > Back To Home </button>
      </div>
    </>
  );
}



