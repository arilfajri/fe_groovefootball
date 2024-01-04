import axios from "axios";
import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("https://be-groovefootball.vercel.app/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar fluid className="bg-white shadow fixed z-50 w-full top-0">
        <Navbar.Brand href="/dashboard">
          <span className="self-center whitespace-nowrap text-xl font-bold text-red-700">
            Groove
          </span>
          <span className="self-center whitespace-nowrap text-xl font-bold">
            Football
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="font-bold uppercase" color="red" onClick={Logout}>
            logout
          </Button>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarAdmin;
