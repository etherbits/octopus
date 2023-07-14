import PlayerBar from "../../PlayerBar";
import Sidebar from "../../Sidebar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-grow-[1] overflow-hidden">
        <Sidebar />
        <div className="flex-grow-[1]">{children}</div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default DefaultLayout;
