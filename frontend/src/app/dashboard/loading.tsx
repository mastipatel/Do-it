import { DualRing } from "react-css-spinners";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <DualRing color="rgba(202,190,48,1)" size={100} thickness={7} />
    </div>
  );
}

export default Loading;
