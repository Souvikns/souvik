import Intro from '../components/home/intro';
import Navbar from "../components/home/navbar";
import LanguagesTools from '../components/home/language-tools';
import Blogs from '../components/home/blogs';
import Stats from '../components/home/stats';

export default () => {
  return (
    <div>
      <Navbar />

      <div className="pt-10">
        <Intro />
      </div>

      <div className="pt-5">
        <LanguagesTools />
      </div>

      <div className="pt-10">
        <Blogs />
      </div>

      <div className="pt-5">
        <Stats />
      </div>

      <section id="footer" className="py-20">

      </section>
    </div>
  );
};
