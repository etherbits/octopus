const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 w-72 text-neutral-200 bg-neutral-950 p-4">
      <div className="flex items-center gap-2">
        <img
          src="/assets/icons/octopus.svg"
          className="w-[18px] h-[18px]"
          alt="logo"
        />
        <h2 className="text-lg text-neutral-50">Octopus</h2>
      </div>
      <input
        className="bg-neutral-900 rounded-md py-1 px-2 w-full"
        placeholder="Search"
      />
      <div>
        <h6 className="text-neutral-600">views</h6>
        <button>Home</button>
      </div>
    </div>
  );
};

export default Sidebar;
