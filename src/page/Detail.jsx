import { jwtDecode } from "jwt-decode";
import NavbarAdmin from "../component/NavbarAdmin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Detail() {
  const location = useLocation();
  const detail = location.state;
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://be-groovefootball.vercel.app/token"
      );
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "https://be-groovefootball.vercel.app/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  console.log(detail?.simulasis[0]?.foto_teknik);

  return (
    <div>
      <NavbarAdmin />
      <div className="flex justify-center items-center p-10">
        <table className=" mt-9">
          <tbody>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Nama Teknik
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                {detail?.nama_teknik}
              </td>
            </tr>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Tingkat Kesulitan
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                {detail?.tingkat_kesulitan}
              </td>
            </tr>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Deskripsi Teknik
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2 text-justify">
                {detail?.deskripsi_teknik}
              </td>
            </tr>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Foto
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                <img
                  src={detail?.simulasis[0]?.url}
                  alt=""
                  className="w-[300px]"
                />
              </td>
            </tr>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Video
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                <iframe
                  width="400"
                  height="200"
                  src={`https://www.youtube.com/embed/${detail?.simulasis[0].video_teknik}`}
                  allowFullScreen
                ></iframe>
              </td>
            </tr>
            <tr>
              <td className=" w-60 px-6 py-4 whitespace-no-wrap font-bold text-base">
                Deskripsi Video
              </td>
              <td className="w-1 px-6 py-4 whitespace-no-wrap">:</td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2 text-justify">
                {detail?.simulasis[0]?.deskripsi_video}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex max-sm:items-center max-sm:justify-center pl-16 pb-10">
        <Link to={"/dashboard"}>
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase sm:w-52 w-max"
            type="submit"
          >
            kembali
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;
