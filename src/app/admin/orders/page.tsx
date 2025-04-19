import { Chart } from "@/components/admin/chart";

export default function Page() {
  return (
    <div className="grow flex flex-col gap-8">
      <div className="flex gap-5">
        <div className="grow aspect-[1024/430] border rounded-xl p-5">
          <Chart />
        </div>
        <div className="bg-gray-500 min-w-[412px]"> statistics </div>
      </div>
      <div className="bg-amber-500 grow">table</div>
    </div>
  );
}
