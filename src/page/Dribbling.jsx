import axios from "axios";
import Footter from "../component/Footter";
import Navvbar from "../component/Navbar";
import { useEffect, useState } from "react";

function Dribbling() {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://be-groovefootball.vercel.app/alldata/${1}`
        );
        setDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [1]);

  return (
    <div>
      <Navvbar />
      <div className="container mx-auto pt-10">
        <div className="md:flex py-10">
          <div className="md:w-1/2">
            <img
              src={detail?.simulasis[0]?.url}
              alt=""
              className="lg:w-[400px] md:w-[300px] mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <div className="flex gap-2 py-2">
              <h1 className="text-2xl uppercase font-bold text-red-700">i</h1>
              <h1 className="text-2xl uppercase font-bold">
                {detail?.nama_teknik}
              </h1>
            </div>
            <p className="capitalize">
              tingkat kesulitan : {detail?.tingkat_kesulitan}
            </p>
            <p className="text-justify lg:w-[400px]">
              {detail?.deskripsi_teknik}
            </p>
          </div>
        </div>
        <h1 className="text-2xl uppercase font-bold text-center">Video</h1>\
        <iframe
          className="md:w-[800px] md:h-[400px] mx-auto pb-10 pt-3 w-full h-[400px]"
          src={`https://www.youtube.com/embed/${detail?.simulasis[0].video_teknik}`}
          allowFullScreen
        ></iframe>
        {/* <img
          src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D"
          alt=""
          className="md:w-[800px] md:h-[400px] mx-auto py-10"
        /> */}
        <p className="text-justify lg:w-[800px] mx-auto pb-10">
          {detail?.simulasis[0]?.deskripsi_video}
        </p>
      </div>
      <Footter />
    </div>
  );
}

export default Dribbling;
