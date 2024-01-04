import { useEffect, useState } from "react";
import NavbarAdmin from "../component/NavbarAdmin";
import { BsFillPenFill, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
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
      console.log(decoded);
      setExpire("decode", decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  console.log(token);

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

  const [teknik, setTeknik] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teknikData = await axios.get(
          "https://be-groovefootball.vercel.app/alldata"
        );
        setTeknik(teknikData?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log("id", teknik);

  return (
    <div>
      <NavbarAdmin />
      <div className="flex justify-center items-center h-screen">
        <table className="divide-y divide-gray-200 rounded shadow">
          <thead>
            <tr>
              <th className="w-16 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {teknik.map((item) => (
              <tr key={item.id}>
                <td className="w-16 px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.id}
                </td>
                <td className="w-96 px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {item.nama_teknik}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-2">
                  <div className="bg-[#00A3FF] hover:bg-[#006eff] h-8 w-8 flex items-center justify-center rounded">
                    <Link to={`/detail/${item.id}`} state={item}>
                      <BsEye color="white" />
                    </Link>
                  </div>
                  <div className="bg-[#FCC419] hover:bg-[#fcac19] h-8 w-8 flex items-center justify-center rounded">
                    <Link to={`/edit/${item.id}`} state={item}>
                      <BsFillPenFill color="white" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
