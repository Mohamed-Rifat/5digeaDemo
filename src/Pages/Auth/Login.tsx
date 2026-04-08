import AuthForm from './../../Components/Auth/AuthForm';
import WavyBackground from './../../Components/Auth/WavyBackground';

const Login = () => {
  return (
    <div className=" flex flex-col lg:flex-row">
      <div className="lg:w-1/2 min-h-[40vh] lg:min-h-screen">
        <WavyBackground />
      </div>
      <div className="lg:w-1/2 flex items-center justify-center bg-background min-h-[60vh] lg:min-h-screen">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
