import SectionContainer from "./SectionContainer";

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <main className="mb-auto">{children}</main>
    </SectionContainer>
  );
};

export default LayoutWrapper;
