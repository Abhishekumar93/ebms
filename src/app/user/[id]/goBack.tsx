"use client";

import { useRouter } from "next/navigation";
import LeftArrowIcon from "../../../../public/svg/leftArrowIcon";

const GoBack = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()}>
      <LeftArrowIcon className="absolute left-4 h-10 w-10 cursor-pointer fill-slate-700 dark:fill-slate-300" />
    </div>
  );
};

export default GoBack;
