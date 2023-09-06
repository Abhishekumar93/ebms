import { IChildrenProp } from "@/interface/childrenProps.interface";
import { PropsWithChildren } from "react";

interface IProps {
  children: IChildrenProp | JSX.Element;
  tooltipText: string;
}

const Tooltip: React.FC<PropsWithChildren<IProps>> = ({
  children,
  tooltipText,
}) => {
  return (
    <div className="group relative">
      {children}
      <span className="invisible w-fit rounded dark:bg-gray-100 bg-gray-700 text-slate-300 dark:text-slate-700 border border-gray-700 text-center py-1 px-2 absolute z-20 -top-10 group-hover:visible after:content-[''] after:absolute after:top-full after:left-1/2 after:border-[5px] after:border-t-gray-700 after:border-b-transparent after:border-x-transparent after:dark:border-t-gray-100 after:border-solid after:-ml-[5px]">
        {tooltipText}
      </span>
    </div>
  );
};

export default Tooltip;
