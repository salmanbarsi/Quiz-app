import backgroundimage from "./background.jpg";
import { Link } from 'react-router-dom'

const Error = () => {
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
        <div
          className="flex ml-auto mr-20 text-white font-medium"
          style={{ listStyle: "none" }}>
        </div>
      </nav>
    
    <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="bg-black/80 w-4/12 p-8 rounded-lg shadow-lg shadow-pink-500/50 text-center">
                <Link to={"/"}><i className="fa-solid fa-house text-white mb-4"></i></Link>
                <div className="bg-gradient-to-r from-black via-pink-600 to-black text-center">
                    <h1 className="text-white p-2 font-bold text-2xl font-mono">Error Page Not Found</h1>
                </div>
                {/* <div>
                    <Link to={"/Quizguide"}><i className="fa-solid fa-right-to-bracket rotate-180 text-white mb-4"></i></Link>
                </div> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Error