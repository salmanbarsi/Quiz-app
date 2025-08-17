import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import backgroundimage from "./background.jpg"
import { useQuery } from "@tanstack/react-query";

const Qusetionans = () => {
const { category, difficulty } = useParams();
const [qcount, setQcount] = useState(0);
const [Score, setScore] = useState(0);
const navigate = useNavigate();
const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
const [submitted, setSubmitted] = useState(false);
const [timeLeft, setTimeLeft] = useState(10);
const [qna, setQna] = useState<any[]>([]);


function Apicall() {
    let apiurl = ""
    if (difficulty === "any"){
        apiurl = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
    }
    else{
        apiurl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    }
  return fetch(apiurl)
    .then(res => res.json())
    .then(json => json.results);
}

const { data, isLoading, error } = useQuery({
  queryKey: ["quiz", difficulty],
  queryFn: Apicall,
  refetchOnWindowFocus: false,   
  gcTime: 0,
  staleTime: 0,               
//   refetchOnMount: "always",
//   placeholderData: undefined,
});


function Question() {

    useEffect(() => {
        if (submitted){
            return;
        }
        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }
        const timer = setInterval(() => { setTimeLeft(prev => prev - 1);}, 1000);
        return () => clearInterval(timer);}, [timeLeft, submitted]);

    function handleAutoSubmit() {
        setSubmitted(true);
    }

    if (error) {
        return (
            <>
                <hr className="mt-4 text-pink-600 mb-4" />
                <p className="text-red-500 text-center">Error fetching data</p>
                <hr className="text-pink-600 mt-4" />
            </>
        );
    }
  
    if (isLoading) {
        return (
            <>
                <hr className="mt-4 text-pink-600 mb-4" />
                <p className="text-white text-center mt-3">Loading...</p>
                <hr className="text-pink-600 mt-4" />
            </>
        );
    }

    const current = data[qcount];
    let question = current.question;
    let answers = [...current.incorrect_answers, current.correct_answer];
    answers = answers.sort();
    const canswer = current.correct_answer;
    let options = ["A", "B", "C", "D"];
    function handleAnswerClick(ans: string) {
        if (!submitted) {
            setSelectedAnswer(ans);
        }
    }
    function handleButtonClick() {
        if (!submitted) {
            setSubmitted(true);
        }
        else {
            const newEntry = { ques: question, sans: selectedAnswer, cans: canswer };
            setQna((prev) => [...prev, newEntry]);
            let newscore = Score;
            if (selectedAnswer === canswer) {
                newscore = Score + 1;
                setScore(newscore); 
            }
            if (qcount === 9){
                navigate(`/Qusetionans/Result/${newscore}`, { state: { qna: [...qna, newEntry] } });
            }
 
            else {
                setQcount(qcount + 1);
                setSelectedAnswer(null);
                setSubmitted(false);
                setTimeLeft(10);
            }
        }
    }

    return (
        <>
            <div className="flex mt-4">
                <p className="text-white pt-3 pl-2 font-bold font-mono">Quiz website tutorial</p>
                <div className="bg-pink-500 p-2 ml-auto rounded-md">
                    <h2 className="text-white font-bold font-mono">
                        Score :<span> {Score}</span> / 10
                    </h2>
                </div>
            </div>
            <hr className="mt-4 text-pink-600 mb-4" />
            <p className="text-white text-center font-mono font-bold mt-3">
                Time : {timeLeft}
            </p>
            <div className="text-white text-left p-3 font-medium font-mono" style={{ listStyle: "none" }}>
                <h1 className="text-xl">{qcount + 1}. {question}</h1>
                {answers.map((ans, idex) => {
                    let bordercolor = "border-slate-600";

                    if (!submitted && ans === selectedAnswer) {
                        bordercolor = "border-pink-500";
                    }
                    if (submitted) {
                        if (ans === canswer) {
                            bordercolor = "border-green-500";
                        } else if (ans === selectedAnswer) {
                            bordercolor = "border-red-500";
                        }
                    }

                    return (
                        <div key={idex} onClick={() => handleAnswerClick(ans)} className={`p-2 border-2 rounded-md mb-2 mt-4 cursor-pointer ${bordercolor}`}>
                            <li className="select-none">
                                {options[idex]}. {ans}
                            </li>
                        </div>
                    );
                })}
            </div>
            <hr className="mt-4 text-pink-600" />
            <div className="flex mt-4">
                <p className="text-white pt-3 pl-2 font-bold font-mono">
                    <span>{qcount + 1} </span>of 10 Questions
                </p>
                <button onClick={handleButtonClick} disabled={!selectedAnswer && !submitted}  className="bg-pink-500 p-2 ml-auto border-2 border-pink-500 rounded-md text-white font-mono font-bold w-24 hover:border-pink-500 hover:bg-black">
                    {!submitted ? "Submit" : qcount === 9 ? "Finish" : "Next"}
                </button>
            </div>
        </>
    );
}


  return (
    <>
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundimage})` }}>
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/30"></div>
      <nav className="relative p-4 flex z-10">
        <h1 className="text-white font-mono font-bold text-2xl ml-10">
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
            <span className="relative text-white">Quiz.</span>
          </span>
        </h1>
        <div className="flex ml-auto mr-20 text-white font-medium" style={{ listStyle: "none" }}>
        </div>
      </nav>
    
    <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="bg-black/80 w-4/12 p-8 rounded-lg shadow-lg shadow-pink-500/50 text-center">
                <Link to={"/"}><i className="fa-solid fa-house text-white mb-4"></i></Link>
                <div className="bg-gradient-to-r from-black via-pink-600 to-black text-center">
                    <h1 className="text-white p-2 font-bold text-3xl font-mono">Quiz</h1>
                </div>
                <div>
                    <Question />
                </div>
                <div>
                    <Link to={"/Quizguide"}><i className="fa-solid fa-right-to-bracket rotate-180 text-white mb-4"></i></Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Qusetionans