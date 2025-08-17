import { Link } from "react-router-dom"
import backgroundimage from "./background.jpg"

const Home = () => {
  return (
    <>
    <div className="bg-cover max-h-full" style={{backgroundImage: `url(${backgroundimage})`}}>
        <nav className="p-4 flex">
            <h1 className="text-white font-mono font-bold text-2xl ml-10">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                    <span className="relative text-white">Quiz.</span>
                </span>
            </h1>
            <div className="flex ml-auto mr-20 text-white font-medium" style={{listStyle:"none"}}>
                <Link to={"/"}><li className="ml-10 text-pink-500">Home</li></Link>
                <li className="ml-10">About</li>
                <li className="ml-10">Service</li>
                <li className="ml-10">Contact</li>
            </div>
        </nav>
        <div className="text-center content-center h-screen">
            <h1 className="text-white font-bold text-3xl font-mono">Quiz Website</h1>
            <p className="text-white font-mono pt-2">Simple Quiz app Create Quiz Add Questions User Could save questions and review them later</p>
            <p className="text-white font-mono ">Hide answer only visible when user answer Many advanced features could be added</p>
            <p className="text-white font-mono ">Simple Quiz app</p>
            <Link to={"./Quizguide"}>
                <button className="text-white font-mono font-bold mt-4 p-2 bg-pink-500 hover:bg-pink-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">Get Started</button>
            </Link>
        </div>
    </div>
    </>
  )
}

export default Home