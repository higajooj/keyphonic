"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("e-mail inválido"),
  password: z.string().min(1, "* obrigatório"),
});

type loginFormType = z.infer<typeof loginFormSchema>;

export default function Page() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = async (data: loginFormType) => {
    await login(data);
  };

  return (
    <div className="grow flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#F7F7F7] p-8 flex flex-col rounded-xl w-full m-8 max-w-[495px]"
      >
        <h1 className="font-bold text-3xl text-center mb-8">KeyPhonic</h1>
        <div className="space-y-2.5 mb-5">
          <Input
            label="E-mail"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
