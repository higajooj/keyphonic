"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const signUpFormSchema = z.object({
  name: z.string(),
  email: z.string().email("e-mail inválido"),
  password: z.string().min(1, "* obrigatório"),
});

type SignUpFormType = z.infer<typeof signUpFormSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { signUp } = useAuth();

  const onSubmit = async (formValues: SignUpFormType) => {
    try {
      await signUp(formValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message ||
          "Houve um erro ao criar Conta. Tente novamente mais tarde",
      );
    }
  };

  return (
    <div className="flex grow items-center justify-center">
      <form
        className="m-8 flex w-full max-w-[495px] flex-col rounded-xl bg-[#F7F7F7] p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-8 text-center text-3xl font-bold">KeyPhonic</h1>

        <div className="mb-5 space-y-2.5">
          <Input
            label="Nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="E-mail"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
