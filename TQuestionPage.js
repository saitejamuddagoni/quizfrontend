import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../../api";

function TQuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { mockTestId } = useParams();
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  var email = decoded.email;

  useEffect(() => {
    api
      .post(`/api/teacher/tquestion`, {
        email: email,
        mockTestId: mockTestId
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, mockTestId]);

  const handlePrevClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <div className="fixed w-3/4 top-20 bottom-10 left-10 right-30 bg-white text-blue-500 p-6 rounded-lg shadow-lg">
        <h3 className="font-bold">{questions[currentQuestionIndex]?.text}</h3>
        {questions[currentQuestionIndex]?.options?.map((option, index) => (
          <div key={index} className="bg-blue-200 my-2 p-2 rounded-md">
            <input
              type="radio"
              id={index}
              value={option}
              checked={questions[currentQuestionIndex]?.correctOption === index}
              readOnly
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
    </>
  );
}
export default TQuestionPage;

// ... The rest of the code remains unchanged


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

