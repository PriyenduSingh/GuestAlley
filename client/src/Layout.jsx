import { Outlet } from "react-router-dom";
import Header from "./Header";
import ChatBot from "./components/ChatBot/ChatBot";

export default function Layout(){
    return(
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header/>
      <Outlet/>
      <ChatBot/>
      </div>
    )
}