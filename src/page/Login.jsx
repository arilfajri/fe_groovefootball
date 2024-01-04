import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("https://be-groovefootball.vercel.app/login", {
          email: values.email,
          password: values.password,
        });
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login successfully",
        });
        const response = await axios.get(
          "https://be-groovefootball.vercel.app/token"
        );
        console.log(response.data.accessToken);
        // navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email atau password salah!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Handle login error, e.g., show error message
          console.error("Login failed:", error.response.data.msg);
        }
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4 text-white uppercase">
        Login{" "}
        <span className="text-3xl font-bold mb-4 uppercase text-red-700">
          form
        </span>
      </h1>
      <Card className="md:w-3/12 mx-auto">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Username" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-700">{formik.errors.email}</div>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-700">{formik.errors.password}</div>
            )}
          </div>

          <Button type="submit" color="dark" className="uppercase">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
