import { ClipLoader } from "react-spinners";

const override = {
  posution: "absolute",
  top: "auto",
  margin: " auto 50vh ",
  borderColor: "black",
};

const Loader = () => {
  return (
    <ClipLoader
      color={"black"}
      loading={true}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
