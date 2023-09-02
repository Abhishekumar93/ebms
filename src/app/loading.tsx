import { ILoading } from "@/interface/loading.interface";

export default function Loading({
  darkColor = "dark:after:bg-slate-300",
  color = "after:bg-slate-700",
  loadingText = "LOADING",
}: ILoading) {
  const showLoadingContent = () => {
    return loadingText.split("").map((item, index) => {
      if (item === " ") {
        return (
          <span
            key={`${item === " " ? "&nbsp" : item}-${index}`}
            className="loading_text_span"
            dangerouslySetInnerHTML={{ __html: "&nbsp;" }}
          />
        );
      } else {
        return (
          <span key={`${item}-${index}`} className="loading_text_span">
            {item}
          </span>
        );
      }
    });
  };
  return (
    <div
      className="overflow-hidden bg-[size:100%] h-full grid place-content-center"
      id="loadingPage"
    >
      <div
        className={`loading_text text-center text-xl relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:rounded-[10px] after:animate-movingLine ${darkColor} ${color}`}
      >
        {showLoadingContent()}
      </div>
    </div>
  );
}
