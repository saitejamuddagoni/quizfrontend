import { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../../api";
import jwtDecode from "jwt-decode";

export default function BeginCreatePage() {
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [name, setMT ] = useState("")
  const [price, setPrice] = useState("");
  const [formFilled, setFormFilled] = useState(false);
  const token = localStorage.getItem("authToken")
  const decoded = jwtDecode(token)
  var email = decoded.email



  const handleProceed = (e) => {
    e.preventDefault();
    setFormFilled(true);
  };
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctOption: null,
  });

  const handleTextChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, text: e.target.value });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCorrectOptionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, correctOption: parseInt(e.target.value) });
  };

  const handleAddMore = () => {
    if (currentIndex < questions.length) {
      const newQuestions = [...questions];
      newQuestions.push(currentQuestion);
      setQuestions(newQuestions);
    } else {
      setQuestions([...questions, currentQuestion]);
    }
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion({
      text: "",
      options: ["", "", "", ""],
      correctOption: null,
    });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentQuestion(questions[currentIndex - 1]);
    }
  };


  const handleFinalSubmit = (e) => {
    if (
      exam === "" ||
      subject === "" ||
      topic === "" ||
      email === "" ||
      questions.length === 0
    ) {
      alert("Please fill in all the fields and add at least one question.");
    }

    var data = {
      exam,
      subject,
      topic,
      email,
      questions,
      name,
      price
    };
    console.log(data)
    api
      .post("/api/teacher/mock-tests/create", data)
      .then((res) => {
        console.log(res)
        alert("MockTest Created Succesfully")
        navigate("/home")
      
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-96 mx-auto mt-20 p-6 bg-white text-blue-500 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-4">Fill the Details</h1>
      {!formFilled && (
        <form>
          <input
            type="text"
            placeholder="Enter Mock Test Name"
            className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={name}
            onChange={(e) => setMT(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Category"
            className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Subject"
            className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Topic"
            className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Cost in Rupees"
            className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            className="w-full p-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </form>
      )}
      {formFilled && (
        <>
         <div className="fixed w-3/4 top-20 bottom-10 left-10 right-30 bg-white text-blue-500 p-6 rounded-lg shadow-lg">
            <div className="bg-red-200 my-2 p-2 rounded-md">
              <input
                type="text"
                className="w-full p-2 bg-white border-2 border-blue-500 focus:outline-none focus:border-blue-700 rounded-md"
                placeholder={"Enter Question...!!!"}
                value={currentQuestion.text}
                onChange={handleTextChange}
              />
            </div>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="bg-blue-200 my-2 p-2 rounded-md">
                <input
                  type="text"
                  className="w-full p-2 bg-white border-2 border-blue-500 focus:outline-none focus:border-blue-700 rounded-md"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                />
              </div>
            ))}
            <div className="bg-blue-200 my-2 p-2 rounded-md">
              <label htmlFor="correct-option" className="font-semibold">Correct option: </label>
              <input
                type="number"
                id="correct-option"
                className="ml-2 w-10 p-1 bg-white border-2 border-blue-500 focus:outline-none focus:border-blue-700 rounded-md"
                value={currentQuestion.correctOption !== null ? currentQuestion.correctOption : ""}
                onChange={handleCorrectOptionChange}
              />
            </div>
            <button className="w-64 p-2 mb-4 bg-pink-500 absolute left-3 hover:bg-pink-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={handlePrevious}>
              Previous
            </button>
            <button className="w-64 p-2 mb-4 relative left-72 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
                    onClick={handleFinalSubmit}>
              Submit
            </button>
            <button
              className="w-64 p-2 mb-4 bg-blue-500 hover:bg-blue-700 absolute right-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={handleAddMore}
            >
              {currentIndex < questions.length ? "Update" : "Add More"}
            </button>
          </div>
          <CountQ
            questions={questions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </>
      )}
    </div>
  );
}

function CountQ({ questions, currentIndex, setCurrentIndex }) {
  return (
    <div className="fixed top-20 right-2 w-1/5 h-2/5 grid grid-cols-4 gap-2 bg-white p-4 rounded-md shadow-lg">
      {Array.from({ length: questions.length }, (_, index) => (
        <CButton
          key={index}
          index={index}
          isSelected={index === currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ))}
    </div>
  );
}

function CButton({ index, isSelected, setCurrentIndex }) {
  const handleClick = () => {    
    setCurrentIndex(index);
  };

  return (
    <button
      className={`w-10 h-10 rounded-full bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${isSelected ? "bg-blue-700" : ""}`}
      onClick={handleClick}
    >
      {index + 1}
    </button>
  );
}

   
