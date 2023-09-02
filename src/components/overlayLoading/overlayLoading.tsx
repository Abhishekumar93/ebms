import Loading from "@/app/loading";
import { ILoading } from "@/interface/loading.interface";

export const OverlayLoading = ({
  darkColor = "dark:after:bg-slate-900",
  color = "after:bg-slate-900",
  loadingText,
}: ILoading) => {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-gray-200 bg-opacity-80 z-50 text-slate-900">
      <Loading darkColor={darkColor} color={color} loadingText={loadingText} />
    </div>
  );
};
