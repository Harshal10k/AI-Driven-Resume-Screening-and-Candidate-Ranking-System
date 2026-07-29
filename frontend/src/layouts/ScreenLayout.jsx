import Navbar from "../components/Navbar";
import ScreenSidebar from "../components/ScreenSidebar";


const ScreenLayout = ({ children }) => {


  return (

    <div className="min-h-screen bg-slate-100">


      <Navbar />


      <div className="flex h-[calc(100vh-72px)]">


        <ScreenSidebar />


        <main className="flex-1 overflow-y-auto p-8">


          {children}


        </main>


      </div>


    </div>

  );

};


export default ScreenLayout;