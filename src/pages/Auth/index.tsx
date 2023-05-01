import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "./schema";
import { z } from "zod";

const Auth: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center items-center bg-neutral-900 p-6 gap-4 rounded-sm w-72"
      >
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-indigo-50 text-2xl">Authorization</h1>
          <span className="text-indigo-50 text-lg">
            log in to jellyfin server
          </span>
        </div>
        <input
          type="text"
          placeholder="Username"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md text-violet-50 w-full"
          {...register("username")}
        />
        {errors.username && (
          <span className="text-red-400 w-full text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
            {errors.username.message}
          </span>
        )}
        <input
          type="password"
          placeholder="••••••••"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md text-violet-50 w-full"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-400 w-full text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
            {errors.password.message}
          </span>
        )}
        <button
          type="submit"
          className="bg-violet-600 px-4 py-2 rounded-sm text-violet-50 w-full font-medium"
        >
          LOG IN
        </button>
        <Link className="text-violet-300" to="/">
          go to home
        </Link>
      </form>
    </div>
  );
};

export default Auth;
