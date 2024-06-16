import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../../api";

function MockTestGridPage() {
  const [tests, setTests] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const { exam, subject, chapter } = useParams();
  var email = decoded.email;

  useEffect(() => {
    api
      .post(`/api/exams/mock-tests-details`, {
        examName: exam,
        subjectName: subject,
        chapterName: chapter,
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        setTests(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exam, subject, chapter, email]);

  const buyTest = (testid) => {
    api
      .post(`/api/exams/purchase-test`, {
        email: email,
        mockTestId: testid,
      })
      .then((res) => {
        setTests((prevTests) =>
          prevTests.map((test) =>
            test._id === testid ? { ...test, bought: true } : test
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="ss-card w-full h-20 bg-white flex justify-center mt-10 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-violet-900">
          <br />
          Select A MockTest
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-10 justify-center mt-20">
        {tests &&
          tests.map((test, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-100 h-60 bg-white text-blue-500 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-200"
            >
              <h2 className="text-2xl font-bold text-indigo-600">
                {test.name}
              </h2>
              <br />
              <h3 className="text-xl font-bold text-fuchsia-400">
                Author: {test.author.name}
              </h3>
              <br />
              <h4 className="font-bold text-green-700">
                {test.bought ? "Purchased" : "Price :" + test.price + " Coins"}
              </h4>
              <br />
              <button
                className="w-60 p-2 mb-4 bg-blue-400 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() =>
                  test.bought
                    ? navigate(`/${test._id}/mocktest`)
                    : buyTest(test._id)
                }
              >
                {test.bought ? "Practice Your Test" : "Buy Test"}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default MockTestGridPage;
