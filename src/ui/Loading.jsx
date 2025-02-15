import { ThreeDots } from "react-loader-spinner";

function Loading({ width = "75", height = "40" }) {
  return (
    <div className="h-full  absolute top-1/2 left-1/2 -translate-x-1/2 ">
      <ThreeDots
        height={height}
        width={width}
        radius={9}
        color="rgb(var(--color-primary-900))"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
        }}
        visible={true}
      />
    </div>
  );
}
export default Loading;
