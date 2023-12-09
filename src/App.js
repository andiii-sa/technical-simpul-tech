import { IconSearch } from "assets/icons";
import "./App.css";
import "./assets/styles/style.scss";
import FloatButton from "components/molecules/FloatButton";

function App() {
  return (
    <div className="flex bg-gray-1 w-full min-h-screen relative">
      <FloatButton />
      <div className="w-[285px] border-r border-l-gray-6"></div>
      <div className="w-full flex flex-col">
        <div className="bg-gray-2 px-[26px] pt-[19px] pb-[23px]">
          <IconSearch className="text-[36px] w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default App;
