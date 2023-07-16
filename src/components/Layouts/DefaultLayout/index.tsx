import Header from "../../Header";
import PlayerBar from "../../PlayerBar";
import QueueList from "../../QueueList";
import Sidebar from "../../Sidebar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-grow-[1] overflow-hidden">
        <Sidebar />
        <div id="layout-content" className="relative flex flex-col flex-grow-[1] bg-neutral-900">
          <Header />
          {children}
        </div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default DefaultLayout;
