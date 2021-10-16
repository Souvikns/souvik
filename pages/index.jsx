import Intro from "../components/intro";
import Navbar from "../components/navbar";

export default () => {
  return (
    <div>
      <Navbar />

      <div className="py-10">
        <Intro />
      </div>
    </div>
  );
};
