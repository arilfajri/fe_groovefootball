import Footter from "../component/Footter";
import Navvbar from "../component/Navbar";

function Home() {
  return (
    <div>
      <Navvbar />
      <div className="md:h-96 h-72 relative flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full object-cover md:h-96 md:w-full lg:w-full lg:h-full h-72 brightness-50"
        />
        <div className="text-white text-center absolute">
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold uppercase">
            Train
          </h1>
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold uppercase">
            LIKE A{" "}
            <span className="lg:text-5xl md:text-3xl text-2xl font-bold uppercase text-red-700">
              CHAMP
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="p-12 text-justify">
        <h1 className="text-2xl text-center font-semibold">About Us</h1>
        <p className="pt-2">
          Selamat datang di GrooveFootball, destinasi online yang menyajikan
          panduan komprehensif untuk mengembangkan keterampilan sepak bola Anda.
          Di sini, kami menghadirkan serangkaian tutorial interaktif, video
          demonstratif, dan informasi mendalam untuk membantu pemain dari
          berbagai tingkatan meningkatkan kemampuan teknis dan taktis mereka.
          Dengan fokus pada teknik dasar seperti dribbling, tackling, shooting,
          stop, dan passing, setiap teknik memiliki tingkat kesulitan yang
          terkategorikan dari mudah hingga sangat sulit, memungkinkan pengguna
          untuk mengkustomisasi latihan sesuai tingkat keahlian mereka. Melalui
          video instruksional dan deskripsi khusus yang mendalam, GrooveFootball
          tidak hanya memberikan panduan praktis tetapi juga memberikan konteks
          serta saran ahli untuk memaksimalkan hasil. Bergabunglah dengan
          komunitas kami, dapatkan berita terkini tentang dunia sepak bola, dan
          mulailah perjalanan Anda menuju peningkatan keterampilan sepak bola
          bersama GrooveFootball.
        </p>
      </div>
      <div className="bg-black h-50 justify-center items-center flex h-44">
        <h1 className="text-white text-center lg:text-5xl md:text-3xl text-2xl font-bold uppercase">
          Never{" "}
          <span className="text-red-700 text-center lg:text-5xl md:text-3xl text-2xl font-bold uppercase">
            Give
          </span>{" "}
          up
        </h1>
      </div>
      <div className="container mx-auto py-5">
        <h1 className="text-2xl text-center font-semibold">Lorem Ipsum</h1>
        <div className="md:flex justify-center gap-12 pt-5">
          <div className="mb-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-44 h-44 rounded-full mx-auto"
            />
          </div>
          <div className="mb-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-44 h-44 rounded-full mx-auto"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-44 h-44 rounded-full mx-auto"
            />
          </div>
        </div>
        <div className="md:flex justify-center gap-12 py-5">
          <div className="mb-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-44 h-44 rounded-full mx-auto"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover w-44 h-44 rounded-full mx-auto"
            />
          </div>
        </div>
      </div>
      <Footter />
    </div>
  );
}

export default Home;
