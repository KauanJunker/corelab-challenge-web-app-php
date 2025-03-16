import Logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const schema = z.object({
  email: z.string().email("Endereço de e-mail invalido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginUserSchema = z.infer<typeof schema>;

function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { signIn } = useAuth();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (data: LoginUserSchema) => {
    signIn({ email: data.email, password: data.password });

    if (isAuthenticated === true) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="w-full flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-6 w-6" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Faça o login</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Endereço de E-mail"
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Senha"
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Criar conta?{" "}
          <a href="/register" className="text-blue-600">
            Criar
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginView;
