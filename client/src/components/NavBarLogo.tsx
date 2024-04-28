const NavBarLogo = () => {
  return (
    <div className="px-6 py-4 shadow-md flex flex-col items-center justify-center w-64 min-h-[10rem] rounded-xl bg-primary-foreground">
      <h1 className="text-2xl font-bold">
        <span className="text-lt-green-2">Little</span> Things
      </h1>
      <p className="text-md">
        Tracking the <span className="text-lt-green-2">little</span> things
      </p>
    </div>
  );
};

export default NavBarLogo;
