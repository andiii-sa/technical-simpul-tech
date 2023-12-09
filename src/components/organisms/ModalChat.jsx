import {
  IconArrowBack,
  IconArrowDown,
  IconClose,
  IconLoadingSmall,
  IconMore,
  IconPerson,
} from "assets/icons";
import Button from "components/atoms/Button";
import Circle from "components/atoms/Circle";
import Modal from "components/atoms/Modal";
import SearchBar from "components/atoms/SearchBar";
import TypeBar from "components/atoms/TypeBar";
import StateLoading from "components/molecules/StateLoading";
import { ChatContext, MenuContext, user } from "constants";
import { listInbox } from "constants/dummyData";
import moment from "moment";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ModalChat = () => {
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState("list");
  const [idChat, setIdChat] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Modal className={panel === "detail" ? "!py-0 !px-0" : ""}>
      <ChatContext.Provider value={{ setPanel, setIdChat }}>
        {panel === "list" && <ListChat loading={loading} />}
        {panel === "detail" && <DetailChat loading={loading} chatId={idChat} />}
      </ChatContext.Provider>
    </Modal>
  );
};

export default ModalChat;

const ListChat = ({ loading }) => {
  const { setPanel, setIdChat } = useContext(ChatContext);
  return (
    <>
      <SearchBar />
      {loading ? (
        <StateLoading />
      ) : (
        <div className="flex flex-col w-full overflow-y-auto">
          {listInbox?.map((inbox, idx) => (
            <div
              key={idx}
              className={`flex gap-[17px] items-center py-[24px] cursor-pointer ${
                idx === 0 ? "" : "border-t border-t-gray-3"
              }`}
              onClick={() => {
                setPanel("detail");
                setIdChat(inbox.id);
              }}
            >
              <div
                className={`w-[51px] flex flex-none relative self-start ${
                  inbox.isGroup ? "" : "justify-center"
                }`}
              >
                {inbox?.isGroup ? (
                  <>
                    <Circle className="!w-[34px] !h-[34px] bg-gray-5">
                      <IconPerson
                        color="fill-[#0000008A]"
                        className="w-3 h-3"
                      />
                    </Circle>
                    <Circle className="!w-[34px] !h-[34px] bg-blue-1 z-10 absolute right-0">
                      <IconPerson color="fill-white" className="w-3 h-3" />
                    </Circle>
                  </>
                ) : (
                  <Circle className="!w-[34px] !h-[34px] bg-blue-1 z-10">
                    <span className="font-bold text-white">
                      {inbox.name?.[0]}
                    </span>
                  </Circle>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex w-full gap-2">
                  <span className="text-blue-1 font-bold text-base">
                    {inbox.isGroup ? inbox.title : inbox.name}
                  </span>
                  <span className="text-gray-2 font-normal whitespace-nowrap">
                    {moment(inbox.date).format("MMMM D,YYYY HH:mm")}
                  </span>
                </div>
                {inbox.isGroup && (
                  <span className="font-bold text-sm">{`${
                    inbox.messages?.[inbox.messages.length - 1].sender
                  } :`}</span>
                )}
                <span className="text-gray-2">
                  {inbox.messages?.[inbox.messages.length - 1].content}
                </span>
              </div>
              {!inbox.isRead && (
                <div className="w-[10px] h-[10px] flex-none rounded-full bg-indicator-red ml-auto" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const DetailChat = ({ chatId }) => {
  const refNewMessage = useRef();
  const refWrapMessage = useRef();
  const refBottomMessage = useRef();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingConnect, setLoadingConnect] = useState(false);
  const { setPanel } = useContext(ChatContext);
  const { handleCloseMenu } = useContext(MenuContext);
  const [chat, setChat] = useState();
  const color = [
    {
      text: "text-chat-orange-2",
      background: "bg-chat-orange-1",
    },
    {
      text: "text-chat-green-2",
      background: "bg-chat-green-1",
    },
  ];

  const colorBuble = chat?.participants
    ?.filter((f) => f !== user)
    .map((name, idx) => ({
      name: name,
      color: color[idx],
    }));

  const isHaveNewMessage = useMemo(() => {
    return chat?.messages?.some((s) => (s?.isRead === false ? true : false));
  }, [chat?.messages]);

  useEffect(() => {
    function handleScroll() {
      if (isHaveNewMessage) {
        const { bottom: nm } = refNewMessage.current.getBoundingClientRect();
        const { bottom: wm } = refWrapMessage.current.getBoundingClientRect();
        if (nm > wm) {
          setShowNewMessage(true);
        } else {
          setShowNewMessage(false);
        }
      }
    }
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [isHaveNewMessage]);

  const toBottomMessage = () => {
    refBottomMessage.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    toBottomMessage();
  }, [chat?.messages]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const temp = listInbox.find((f) => f.id === chatId);
      setChat(temp);
      setLoading(false);
    }, 1000);
  }, [chatId]);

  useEffect(() => {
    if (chat?.isGroup === false) {
      setLoadingConnect(true);
      setTimeout(() => {
        setLoadingConnect(false);
      }, 1000);
    }
  }, [chat?.isGroup]);

  return loading ? (
    <StateLoading />
  ) : (
    <>
      <div className="flex pl-[25px] gap-[14px] items-center pr-[21px] py-[19px] border-b border-b-gray-4">
        <IconArrowBack
          color="fill-gray-1"
          className="w-4 h-4 cursor-pointer"
          onClick={() => setPanel("list")}
        />
        <div className="flex flex-col gap-[10px]">
          <span className="text-blue-1 font-bold text-base">
            {chat?.isGroup ? chat?.title : chat?.name}
          </span>
          {chat?.isGroup && (
            <span className="text-gray-1 text-xs">{`${chat?.participants?.length} Participants`}</span>
          )}
        </div>
        <IconClose
          color="fill-gray-1"
          className="w-[14px] h-[14px] ml-auto cursor-pointer"
          onClick={handleCloseMenu}
        />
      </div>
      <div
        ref={refWrapMessage}
        className="flex flex-col relative overflow-y-auto ml-[9px] px-5 my-[14px] gap-3"
      >
        {chat?.messages?.length ? (
          <>
            {chat?.messages?.map((message, idx) => (
              <Fragment key={idx}>
                {moment(message?.date).format("MMMM DD, YYYY") !==
                moment(chat?.messages?.[idx - 1]?.date).format(
                  "MMMM DD, YYYY"
                ) ? (
                  <div className="flex justify-center items-center gap-4">
                    <div className="w-full h-[1px] bg-gray-2" />
                    <span className="text-gray-2 font-bold whitespace-nowrap">
                      {`${
                        moment().format("MMMM DD, YYYY") ===
                        moment(message?.date).format("MMMM DD, YYYY")
                          ? "Today "
                          : ""
                      } ${moment(message?.date).format("MMMM DD, YYYY")}`}
                    </span>
                    <div className="w-full h-[1px] bg-gray-2" />
                  </div>
                ) : null}

                {!message?.isRead ? (
                  !message?.isRead ===
                  !chat?.messages?.[idx - 1]?.isRead ? null : (
                    <div
                      ref={refNewMessage}
                      className="flex justify-center items-center gap-4"
                    >
                      <div className="w-full h-[1px] bg-indicator-red" />
                      <span className="text-indicator-red font-bold whitespace-nowrap">
                        New Message
                      </span>
                      <div className="w-full h-[1px] bg-indicator-red" />
                    </div>
                  )
                ) : null}

                <ItemMessage
                  isSender={message?.sender === user ? true : false}
                  sender={message?.sender}
                  date={message?.date}
                  content={message.content}
                  isGroup={chat?.isGroup}
                  textColor={
                    colorBuble?.find?.((f) => f?.name === message?.sender)
                      ?.color?.text
                  }
                  backgroundColor={
                    colorBuble?.find?.((f) => f?.name === message?.sender)
                      ?.color?.background
                  }
                />
              </Fragment>
            ))}
            {showNewMessage && (
              <div
                className="flex justify-center sticky bottom-0 items-center gap-2 bg-sticker-blue px-3 py-2 w-fit self-center rounded-md cursor-pointer"
                onClick={toBottomMessage}
              >
                <span className="text-blue-1 font-bold whitespace-nowrap">
                  New Message
                </span>
                <IconArrowDown className="w-4 h-4" color="fill-blue-1" />
              </div>
            )}
            <div ref={refBottomMessage} />
          </>
        ) : null}
      </div>

      {loadingConnect && (
        <div className="flex gap-[11px] items-center p-[10px] bg-sticker-blue mt-auto rounded-[5px] mx-5">
          <IconLoadingSmall className="animate-spin" />
          <span className="text-gray-2">
            Please wait while we connect you with one of our team
          </span>
        </div>
      )}
      <div
        className={`flex gap-2 items-center mx-5 mb-5 ${
          loadingConnect ? "!mt-3" : "!mt-auto"
        }`}
      >
        <TypeBar />
        <Button>Send</Button>
      </div>
    </>
  );
};

const ItemMessage = ({
  isSender,
  sender,
  date,
  content,
  isGroup,
  textColor,
  backgroundColor,
}) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <div
      className={`flex flex-col gap-0.5 w-4/5 ${
        isSender ? "items-end self-end" : "items-start"
      }`}
    >
      <span
        className={`font-bold ${
          !isSender
            ? isGroup
              ? textColor
              : "text-gray-1"
            : "text-chat-violet-2"
        }`}
      >
        {isSender ? "You" : sender}
      </span>
      <div className={`flex gap-1 ${isSender ? "" : "flex-row-reverse"}`}>
        <div className="w-4 relative">
          <div className="cursor-pointer" onClick={() => setIsMore(!isMore)}>
            <IconMore className="w-4 flex-none self-start" />
          </div>
          <div
            className={`absolute flex-col border border-gray-3 rounded-md top-2 overflow-hidden ${
              isMore ? "flex" : "hidden"
            }`}
          >
            <div className="py-[6px] px-[19px] text-xs text-blue-1 bg-white cursor-pointer">
              Edit
            </div>
            <div className="bg-gray-3 h-[1px] w-full my-0 py-0" />
            <div className="py-[6px] px-[19px] text-xs text-indicator-red bg-white cursor-pointer">
              Delete
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col rounded-[5px] p-[10px] ${
            !isSender
              ? isGroup
                ? backgroundColor
                : "bg-gray-7"
              : "bg-chat-violet-1"
          }`}
        >
          <span className="text-gray-2 text-sm">{content}</span>
          <span className="text-gray-2 text-xs">
            {moment(date).format("HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
};
