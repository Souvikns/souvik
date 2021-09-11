import Intro from "../components/intro";
import Navbar from "../components/navbar";

export default () => {
  return <div>
	  <div className="container mx-auto lg:px-44 my-12">
		  <Navbar />
	  </div>

	  <div className="container mx-auto lg:px-40">
		  <Intro />
	  </div>

  </div>
};
