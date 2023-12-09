import {
  IconChromeReader,
  IconLightning,
  IconQuestionAnswer,
} from "assets/icons";
import Circle from "components/atoms/Circle";
import ModalChat from "components/organisms/ModalChat";
import ModalTask from "components/organisms/ModalTask";
import { MenuContext } from "constants";
import { useMemo, useState } from "react";

const initActive = {
  title: "",
  icon: <></>,
  classActiveCircle: "",
  classActiveIcon: "",
};
const FloatButton = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(initActive);

  const menus = [
    {
      title: "Task",
      icon: IconChromeReader,
      classActiveCircle: "!bg-indicator-orange",
      classActiveIcon: `!fill-white`,
    },
    {
      title: "Inbox",
      icon: IconQuestionAnswer,
      classActiveCircle: "!bg-violet-1",
      classActiveIcon: `!fill-white`,
    },
  ];

  const isActiveMenu = useMemo(() => (active?.title ? true : false), [active]);

  const handleCloseMenu = () => {
    setActive(initActive);
  };

  return (
    <div className="absolute bottom-[27px] right-[34px] flex items-end flex-row-reverse">
      {/* Modal */}
      <MenuContext.Provider value={{ handleCloseMenu }}>
        {active?.title === "Inbox" ? <ModalChat /> : null}
        <ModalTask />

        <Circle
          className={`bg-primary-blue transition-all duration-500 ${
            isActiveMenu ? "!w-0" : ""
          }`}
          onClick={() => setOpen(!open)}
        >
          <IconLightning />
        </Circle>
      </MenuContext.Provider>

      <div
        className={`flex relative items-end gap-6 transition-all duration-500 w-0 overflow-hidden ${
          open
            ? `${
                isActiveMenu
                  ? "pr-0 !w-full pl-[15px]"
                  : "pr-6 !w-[calc(100%-68px)]"
              }`
            : ""
        }`}
      >
        <Circle
          className={`bg-gray-2 bottom-0 right-[15px] absolute ${
            isActiveMenu ? "block" : "hidden"
          }`}
          onClick={() => setActive(initActive)}
        />

        {menus?.map((menu, idx) => (
          <div
            key={idx}
            className={`flex-col gap-3 items-center z-10 ${
              active?.title === menu?.title ? "hidden" : "flex "
            }`}
          >
            {!isActiveMenu && (
              <span className="text-gray-6 font-bold">{menu?.title}</span>
            )}
            <Circle className="bg-gray-6" onClick={() => setActive(menu)}>
              {<menu.icon />}
            </Circle>
          </div>
        ))}

        {/* Show Active Menu */}
        <div
          className={`flex-col gap-3 items-center z-10 ${
            isActiveMenu ? "flex" : "hidden"
          }`}
        >
          <Circle
            className={`bg-gray-6 ${active?.classActiveCircle}`}
            onClick={() => setActive(initActive)}
          >
            {isActiveMenu ? (
              <active.icon className={active?.classActiveIcon} />
            ) : null}
          </Circle>
        </div>
      </div>
    </div>
  );
};

export default FloatButton;
