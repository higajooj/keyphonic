"use client";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginFormSchema = z.object({
  name: z.string(),
  email: z.string().email("e-mail inválido"),
  password: z.string().min(1, "* obrigatório"),
});

type loginFormType = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  // TODO: redirect to root
  const onSubmit = async (formValues: loginFormType) => {


    console.log(formValues);
  };

  return (
    <div className="flex grow items-center justify-center">
      <form
        className="m-8 flex w-full max-w-[495px] flex-col rounded-xl bg-[#F7F7F7] p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-8 text-center font-bold text-3xl">KeyPhonic</h1>

        <div className="mb-5 space-y-2.5">
          <Input label="Nome" {...register("name")} error={errors.name?.message} />
          <Input label="E-mail" {...register("email")} error={errors.email?.message} />
          <Input label="Senha" type="password" {...register("password")} error={errors.password?.message} />
        </div>

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
