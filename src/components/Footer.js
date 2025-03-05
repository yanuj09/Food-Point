import { LOGO_URL } from "../utils/constants"
import { GITHUB_LOGO , Linkdin_LOGO, MAIL_LOGO} from "../utils/constants";
import { Link } from "react-router-dom";

const Footer = () =>{
    return(

        <div className=" footer bg-blue-950 h-96 p-10 flex justify-evenly text-white">

            <div className="mt-14">
                <img className="w-40 " src={LOGO_URL}></img>
                <h1 className=" p-1">© 2024 FOOD POINT</h1>
            </div>

            <div className= "mt-24  ml-28 flex  ">
                <ul className=" flex space-x-8">
                    <li>
                        <Link to= "/" >Home</Link> 
                    </li>

                    <li>
                        <Link to= "/about">About us</Link>
                    </li>

                    <li>
                        FAQ
                    </li>

                    <li>
                        <Link to = "/cart">Cart</Link>
                    </li>
                </ul>
            </div>

            <div className="mt-14" >
                <h3>SOCIAL LINKS</h3>
                <div className="flex">
                    <img className="w-[65px] h-14 " src= {Linkdin_LOGO} ></img>
                    <img className="w-[60px] h-14 " src= {GITHUB_LOGO} ></img>
                    <img className="w-[60px] h-14 " src= {MAIL_LOGO} ></img>
                </div>
                

            </div>
        </div>
    )
}

export default Footer;