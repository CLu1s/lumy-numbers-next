import SyncLoader from "react-spinners/SyncLoader";
import clsx from "clsx";
export enum LoadingType {
  FULL_PAGE = "FULL_PAGE",
  INLINE = "INLINE",
}

type Props = {
  type?: LoadingType;
};

const Loading = ({ type = LoadingType.INLINE }: Props) => {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center w-full h-full",
        type === LoadingType.FULL_PAGE && "h-screen",
        type === LoadingType.INLINE && "h-full mt-4"
      )}
    >
      <div className="flex justify-center items-center">
        <SyncLoader size={15} color={"#9734ea"} loading={true} />
      </div>
    </div>
  );
};

export default Loading;
