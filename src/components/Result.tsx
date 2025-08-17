import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import backgroundimage from "./background.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

const Result = () => {
  const { scoreper } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const qna = location.state ? location.state.qna : null;
  useEffect(() => {
    if (qna === null){
    navigate("../src/components/Error.tsx")
  }
  }, [qna === null]);
  
  const [activeTab, setActiveTab] = useState("status");
  let mark = Number(scoreper) * 10;
  


  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundimage})` }}>
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/30"></div>
      <nav className="relative p-4 flex z-10">
        <h1 className="text-white font-mono font-bold text-2xl ml-10">
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
              <span className="relative text-white">Quiz.</span>
            </span>
          </h1>
      </nav>

      <div className="relative z-10 flex justify-center items-center">
        <div className="relative z-10 bg-black flex w-7/12 border-2 border-pink-500/50 p-2 text-center">
          <div
            onClick={() => setActiveTab("status")}
            className={`w-2/4 border-r-2 cursor-pointer ${activeTab === "status" ? "bg-pink-500/50" : ""}`}
          >
            <h1 className="text-white font-mono font-bold text-lg">Status</h1>
          </div>
          <div
            onClick={() => setActiveTab("qna")}
            className={`w-2/4 border-l-2 cursor-pointer ${activeTab === "qna" ? "bg-pink-500/50" : ""}`}
          >
            <h1 className="text-white font-mono font-bold text-lg">QNA</h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center">
        <div className="bg-black/80 w-7/12 p-8 rounded-b-lg shadow-lg shadow-pink-500/50 text-center">
          {activeTab === "status" && (
            <>
              <div className="bg-gradient-to-r from-black via-pink-600 to-black text-center">
                    <h1 className="text-white p-2 font-bold text-2xl font-mono">Quiz Result!</h1>
                </div>
              <div className="flex justify-center p-5">
                <div className="w-40 h-40">
                  <CircularProgressbar
                    value={mark}
                    text={`${mark}%`}
                    styles={buildStyles({ textSize: "16px", pathColor: "#cc30a8c2", textColor: "#fff" })}
                  />
                </div>
              </div>
              <h1 className="font-mono text-white font-bold text-xl">Your Score {scoreper} out of 10</h1>
            </>
          )}

          {activeTab === "qna" && (
            <>
              <div className="bg-gradient-to-r from-black via-pink-600 to-black text-center">
                <h1 className="text-white p-2 font-bold text-2xl font-mono">QNA Section</h1>
              </div>
              <div className="text-white font-mono mt-8 overflow-x-auto">
                <table className="border-collapse w-full text-sm">
                  <thead className="border-2 border-white text-pink-500">
                    <tr>
                      <th className="border-2 p-2">No.</th>
                      <th className="border-2 p-2">Question</th>
                      <th className="border-2 p-2">Your Answer</th>
                      <th className="border-2 p-2">Correct Answer</th>
                      <th className="border-2 p-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qna.map((item:any, index:any) => (
                      <tr key={index} className="border border-white text-sky-500 hover:bg-slate-900">
                        <td className="border p-2">{index + 1}.</td>
                        <td className="border p-2">{item.ques}</td>
                        <td className="border p-2">{item.sans}</td>
                        <td className="border p-2">{item.cans}</td>
                        <td className="border p-2">{item.sans === item.cans ? 1 : 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="flex justify-center p-5">
            <Link to={"/Quizguide"}>
              <button className="mr-2 text-pink-500 border-2 border-pink-500 font-bold mt-4 p-2 bg-black hover:bg-pink-500 hover:text-white">
                Try Again
              </button>
            </Link>
            <Link to={"/"}>
              <button className="ml-2 text-pink-500 border-2 border-pink-500 font-bold mt-4 p-2 bg-black hover:bg-pink-500 hover:text-white">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
