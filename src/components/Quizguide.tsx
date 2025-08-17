import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backgroundimage from "./background.jpg";

const Quizguide = () => {
  const [selecteValue, setSelecteValue] = useState("any");
  const [categoryvalue, setCategoryvalue] = useState("0");
  const [catapi, setCatapi] = useState<any[]>([]);
  const [error,setError] = useState<any>("");
  const [any,setAny] = useState<any>("");
  const navigate = useNavigate();

  function handleChange(event: any) {
    setSelecteValue(event.target.value);
  }

  function handleChange1(event: any) {
    setCategoryvalue(event.target.value);
  }

  function Clickbtn1() {
    if (error) {
      alert("Fetch Error so,you did not select category");
    }
    else {
      navigate(`/Qusetionans/${categoryvalue}/${selecteValue}`);

    }
    
  }


  useEffect(() => {
  fetch("https://opentdb.com/api_category.php")
    .then((res) => res.json())
    .then((data) => setCatapi(data.trivia_categories))
    .catch(() => {
      setError("Required Error fetching categories")
    });
}, []);

useEffect(() => {
  if (!error) {
    setAny(<option value="0">Any Category</option>);
  }
  else{
    setAny(<option>Fetch Error</option>)
  }
}, [error]);


  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/30"></div>
        <nav className="relative p-4 flex z-10">
          <h1 className="text-white font-mono font-bold text-2xl ml-10">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
              <span className="relative text-white">Quiz.</span>
            </span>
          </h1>
          <div
            className="flex ml-auto mr-20 text-white font-medium"
            style={{ listStyle: "none" }}
          >
            <Link to={"/"}>
              <li className="ml-10 text-pink-500">Home</li>
            </Link>
            <li className="ml-10">About</li>
            <li className="ml-10">Service</li>
            <li className="ml-10">Contact</li>
          </div>
        </nav>

        <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="bg-white w-4/12 p-8 rounded-lg shadow-lg shadow-pink-500/50 text-center">
            <h1 className="text-pink-500 text-left font-bold text-3xl font-mono text-center">
              Quiz Guide
            </h1>
            <div className="text-left p-3 font-bold font-mono" style={{ listStyle: "none" }}>
              <li>1. Each question must be answered within 10 seconds.</li>
              <li>2. There are 10 questions in this exam.</li>
              <li>3. Questions are multiple choice.</li>
              <li>4. If you are not ready, click Exit quiz.</li>
              <li>5. Choose difficulty & category to start.</li>
            </div>

            <div className="pl-3 pr-3 text-left">
              <select value={selecteValue} onChange={handleChange} className="text-black border-2 border-pink-500 font-mono font-bold p-2 w-full focus:outline-none focus:border-pink-500">
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="pl-3 pr-3 mt-5 text-left">
              <select value={categoryvalue} onChange={handleChange1} className="text-black border-2 border-pink-500 font-mono font-bold p-2 w-full focus:outline-none focus:border-pink-500">
                {any}
                {catapi.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}

              </select>
              <p className="text-red-600">{error}</p>
            </div>

            <div className="p-3">
              <Link to={"/"}>
                <button className="text-pink-500 font-mono border-2 border-pink-500 font-bold mt-4 p-2 bg-white hover:bg-pink-500 hover:text-white">Exit Quiz</button>
              </Link>
              <button onClick={Clickbtn1} className="ml-10 text-white font-mono border-2 border-pink-500 font-bold mt-4 p-2 bg-pink-500 hover:bg-white hover:text-pink-500">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quizguide;
