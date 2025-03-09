import { Loader } from "lucide-react";

export const LoadingScreen = ({ enableBackground = false }: { enableBackground?: boolean }) => {
  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center ${
        enableBackground
          ? "bg-[url('/neuCampusBlurred.png')] " +
            "overflow-hidden bg-cover bg-center bg-no-repeat ]"
          : " "
      } `}
    >
      <div className="h-1/2 w-1/2 flex justify-center items-center">
        <Loader className="h-1/8 w-1/8 animate-spin duration-1000 text-theme" />
      </div>
    </div>
  );
};
