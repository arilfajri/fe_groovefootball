import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

function Navvbar() {
  return (
    <div>
      <Navbar fluid className="bg-black text-white fixed z-50 w-full">
        <Navbar.Brand href="">
          <span className="self-center whitespace-nowrap text-xl font-bold text-red-700">
            Groove
          </span>
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            Football
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button color="failure">
            {" "}
            <Link to={"/login"}>LOGIN</Link>{" "}
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" className="text-white">
            Home
          </Navbar.Link>
          <Navbar.Link href="/dribbling" className="text-white">
            Dribbling
          </Navbar.Link>
          <Navbar.Link href="/tackling" className="text-white">
            Tackling
          </Navbar.Link>
          <Navbar.Link href="/passing" className="text-white">
            Passing
          </Navbar.Link>
          <Navbar.Link href="/shooting" className="text-white">
            Shooting
          </Navbar.Link>
          <Navbar.Link href="/stop" className="text-white">
            Stop
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navvbar;
