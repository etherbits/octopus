import TabLink from "../TabLink";
import Search from "../Search";
import TabGroup from "../TabGroup";

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
      <Search />
      <TabGroup label="views">
        <TabLink label="Home" to="/" iconPath="/assets/icons/home.svg" />
        <TabLink
          label="Albums"
          to="/albums"
          iconPath="/assets/icons/disc.svg"
        />
        <TabLink label="Songs" to="/songs" iconPath="/assets/icons/music.svg" />
        <TabLink
          label="Artists"
          to="/artists"
          iconPath="/assets/icons/users.svg"
        />
      </TabGroup>
    </div>
  );
};

export default Sidebar;
