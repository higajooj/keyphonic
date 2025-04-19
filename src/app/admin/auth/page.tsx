import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="grow flex items-center justify-center">
      <div className="bg-[#F7F7F7] p-8 flex flex-col rounded-xl w-full m-8 max-w-[495px]">
        <h1 className="font-bold text-3xl text-center mb-8">KeyPhonic</h1>
        <div className="space-y-2.5 mb-5">
          <Input name="email" label="E-mail" />
          <Input name="password" label="Senha" type="password" />
        </div>
        <Button>Entrar</Button>
      </div>
    </div>
  );
}
