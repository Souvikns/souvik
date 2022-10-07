
const Navbar = () => {
  return (
    <div className="flex flex-col justify-between py-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl font-mono">Souvik</h1>
        </div>
        <div className="flex items-center text-base leading-5">
          {["blogs", "projects", "about"].map((el) => (
            <h1 className="p-1 font-semibold block">{el}</h1>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
