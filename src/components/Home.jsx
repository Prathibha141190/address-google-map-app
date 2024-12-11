import {Link} from "react-router-dom"
const Home = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">Welcome to the Location/Address Flow</h1>
        <div className="mt-4 space-x-4">
        <Link to="/modal" className="px-4 py-2 bg-red-500 text-white rounded">Lets check your Location !!</Link>
          <Link to="/address" className="px-4 py-2 bg-blue-500 text-white rounded">Set Address</Link>
          <Link to="/manage" className="px-4 py-2 bg-green-500 text-white rounded">Manage Addresses</Link>
        </div>
      </div>
    );
  };
  
  export default Home;