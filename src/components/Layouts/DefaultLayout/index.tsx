import PlayerBar from "../../PlayerBar";
import Sidebar from "../../Sidebar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full overflow-auto">
        <Sidebar />
        <div className="w-full overflow-hidden">{children}</div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default DefaultLayout;
