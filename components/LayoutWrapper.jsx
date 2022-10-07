import Navbar from "./Navbar";
import SectionContainer from "./SectionContainer";

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <Navbar />
      <main className="mb-auto">{children}</main>
    </SectionContainer>
  );
};

export default LayoutWrapper;
