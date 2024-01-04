import { useLocation, useNavigate } from "react-router-dom";
import NavbarAdmin from "../component/NavbarAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

function Edit() {
  const [file, setFile] = useState("");
  const location = useLocation();
  const data = location.state;
  const [preview, setPreview] = useState(data?.simulasis[0]?.url);
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
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
        const response = await axios.get("http://localhost:5000/token");
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

  function handleChange(event) {
    const image = event.target.files[0];
    setFile(event.target.files[0]);
    formik.setFieldValue("simulasis[0].foto_teknik", event.target.files[0]);
    setPreview(URL.createObjectURL(image));
  }

  const formik = useFormik({
    initialValues: data,

    validationSchema: Yup.object({
      nama_teknik: Yup.string()
        .required("Nama teknik harus diisi")
        .matches(/^[^\d]+$/, "Jangan menggunakan angka"),
      tingkat_kesulitan: Yup.string().required("Tingkat kesulitan harus diisi"),
      deskripsi_teknik: Yup.string().required("Deskripsi teknik harus diisi"),
      simulasis: Yup.array().of(
        Yup.object().shape({
          video_teknik: Yup.string().required("Video harus diisi"),
          foto_teknik: Yup.string().required("Foto teknik is a required field"),
          deskripsi_video: Yup.string().required("Deskripsi video harus diisi"),
        })
      ),
    }),

    onSubmit: async (values) => {
      console.log("test", values.simulasis[0].foto_teknik);

      try {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }
        const trimmedVideoTeknik =
          values.simulasis[0].video_teknik.includes("&t=") &&
          values.simulasis[0].video_teknik.includes("v=")
            ? values.simulasis[0].video_teknik.split("&t=")[0].split("v=")[1]
            : values.simulasis[0].video_teknik;

        // Tambahkan data lain ke formData
        formData.append("video_teknik", trimmedVideoTeknik);
        formData.append("deskripsi_video", values.simulasis[0].deskripsi_video);
        formData.append("nama_teknik", values.nama_teknik);
        formData.append("deskripsi_teknik", values.deskripsi_teknik);
        formData.append("tingkat_kesulitan", values.tingkat_kesulitan);
        formData.append("teknikId", values.id);

        // Lakukan pembaruan di dalam onSubmit
        await axios.patch(
          `http://localhost:5000/alldata/${values.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data berhasil diperbarui!",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log("Detail berhasil diperbarui!");
        navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          Swal.fire({
            title: "Maaf!",
            text: "Anda belum memilih foto!",
            icon: "error",
          });
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    },
  });

  return (
    <div>
      <NavbarAdmin />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white px-8 mt-20 sm:grid sm:grid-cols-2 sm:gap-4"
      >
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama Teknik
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nama_teknik"
            type="text"
            placeholder="Nama Teknik"
            name="nama_teknik"
            value={formik.values?.nama_teknik}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nama_teknik && formik.errors.nama_teknik && (
            <div className="text-red-700">{formik.errors.nama_teknik}</div>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tingkat_kesulitan"
            name="tingkat_kesulitan"
            onBlur={formik.handleBlur}
            value={formik.values?.tingkat_kesulitan}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Mudah">Mudah</option>
            <option value="Susah">Susah</option>
            <option value="Sangat Susah">Sangat Susah</option>
          </select>
          {formik.touched.tingkat_kesulitan &&
            formik.errors.tingkat_kesulitan && (
              <div className="text-red-700">
                {formik.errors.tingkat_kesulitan}
              </div>
            )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Deskripsi Teknik
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deskripsi_teknik"
            placeholder="Deskripsi Teknik"
            name="deskripsi_teknik"
            value={formik.values?.deskripsi_teknik}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.deskripsi_teknik &&
            formik.errors.deskripsi_teknik && (
              <div className="text-red-700">
                {formik.errors.deskripsi_teknik}
              </div>
            )}
        </div>
        {formik?.values?.simulasis?.map((simulasi, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deskripsi Video
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`simulasis[${index}].deskripsi_video`}
              placeholder="Deskripsi Teknik"
              name={`simulasis[${index}].deskripsi_video`}
              value={formik.values?.simulasis[index].deskripsi_video}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.simulasis &&
              formik.touched.simulasis[index] &&
              formik.errors.simulasis &&
              formik.errors.simulasis[index] &&
              formik.errors.simulasis[index].deskripsi_video && (
                <div className="text-red-700">
                  {formik.errors.simulasis[index].deskripsi_video}
                </div>
              )}
          </div>
        ))}

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto
          </label>
          <input
            className="shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline"
            id="simulasis[0].foto_teknik"
            type="file"
            placeholder="Foto"
            name="simulasis[0].foto_teknik"
            onChange={handleChange}
            onBlur={formik.handleBlur}
          />

          {preview ? (
            <img src={preview} className="w-44 h-22 mt-3" alt="Preview Image" />
          ) : (
            ""
          )}
        </div>

        {formik?.values?.simulasis.map((simulasi, index) => (
          <div className="mb-2" key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Video
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`simulasis[${index}].video_teknik`}
              name={`simulasis[${index}].video_teknik`}
              type="text"
              placeholder="Video"
              value={formik.values.simulasis[index].video_teknik}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.simulasis &&
              formik.touched.simulasis[index] &&
              formik.errors.simulasis &&
              formik.errors.simulasis[index] &&
              formik.errors.simulasis[index].video_teknik && (
                <div className="text-red-700">
                  {formik.errors.simulasis[index].video_teknik}
                </div>
              )}
          </div>
        ))}
        <div className="flex max-sm:items-center max-sm:justify-center max-sm:col-span-2 py-5">
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase sm:w-52 w-max"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
