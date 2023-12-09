import {
  IconArrowDown,
  IconBookmarks,
  IconEdit,
  IconExpand,
  IconMore,
} from "assets/icons";
import Button from "components/atoms/Button";
import Checkbox from "components/atoms/Checkbox";
import DatepickerCustom from "components/atoms/DatepickerCustom";
import Dropdown from "components/atoms/Dropdown";
import Modal from "components/atoms/Modal";
import StateLoading from "components/molecules/StateLoading";
import { listTags, listTask } from "constants/dummyData";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";

const initTask = {
  id: 1,
  type: 1,
  title: "Type task title",
  isDone: false,
  date: "",
  tags: [],
  description: "No Description",
};

const ModalTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const refBottomTask = useRef();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTasks(listTask);
      setLoading(false);
    }, 1000);
  }, []);

  const listMyTasks = [
    {
      label: "Personal Errands",
      onClick: () => setFilter(1),
    },
    {
      label: "Urgent To Do",
      onClick: () => setFilter(2),
    },
  ];

  const handleChange = (id, value, type) => {
    let temp = [...tasks];
    const findIdx = temp.findIndex((fi) => fi?.id === id);
    temp[findIdx] = {
      ...temp[findIdx],
      [type]: value,
    };
    setTasks(temp);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev?.filter((f) => f?.id !== id));
  };

  const handleNewTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        ...initTask,
        id: tasks?.length + 1,
        type: filter || 1,
      },
    ]);
    toBottomTask();
  };

  const toBottomTask = () => {
    refBottomTask.current?.scrollIntoView({ behavior: "smooth" });
  };

  const listTasks = useMemo(() => {
    if (filter) {
      return tasks?.filter((f) => f?.type === filter);
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  return (
    <Modal className="">
      <div className="flex justify-between">
        <Dropdown
          label={
            <div className="cursor-pointer flex items-center gap-2 px-[14px] py-[10px] rounded-[5px] border border-gray-3">
              <span className="text-gray-2 font-bold">My Task</span>
              <IconArrowDown color="fill-gray-2" className="w-3 h-3" />
            </div>
          }
          lists={listMyTasks}
        />
        <Button onClick={handleNewTask}>New Task</Button>
      </div>
      {loading ? (
        <StateLoading />
      ) : (
        <div className="flex flex-col overflow-y-auto my-3">
          {listTasks?.map((task, idx) => (
            <ItemTask
              key={idx}
              showBorder={idx !== 0 ? true : false}
              data={task}
              handleDelete={() => handleDelete(task?.id)}
              handleChangeTitle={(val) => handleChange(task?.id, val, "title")}
              handleCheckbox={(val) => handleChange(task?.id, val, "isDone")}
              handleDate={(val) => handleChange(task?.id, val, "date")}
              handleTags={(val) => handleChange(task?.id, val, "tags")}
              handleDescription={(val) =>
                handleChange(task?.id, val, "description")
              }
            />
          ))}
          <div ref={refBottomTask} />
        </div>
      )}
    </Modal>
  );
};

export default ModalTask;

const ItemTask = ({
  showBorder = false,
  data,
  handleChangeTitle,
  handleCheckbox,
  handleDelete,
  handleDate,
  handleDescription,
  handleTags,
}) => {
  const [show, setShow] = useState(true);

  const rangeDate = () => {
    const now = moment(new Date()).format("YYYY-MM-DD");
    const dateData = moment(data?.date, "DD/MM/YYYY").format("YYYY-MM-DD");
    const range = moment(dateData, "YYYY-MM-DD").diff(now, "days");
    if (range <= 10 && range > 0) {
      return range;
    } else {
      return 0;
    }
  };

  return (
    <div
      className={`flex relative gap-5 py-3 ${
        showBorder ? "border-t border-t-gray-3" : ""
      }`}
    >
      <Checkbox
        value={data?.isDone}
        handleChange={(val) => handleCheckbox(val)}
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex">
          <TitleField
            value={data?.title}
            handleChange={(val) => handleChangeTitle(val)}
            isDone={data?.isDone}
          />
          <div className="flex flex-none ml-auto self-start">
            {rangeDate() ? (
              <span className="text-indicator-red flex-none">
                {rangeDate()} Days left
              </span>
            ) : null}
            <span className="ml-5 text-gray-2 flex-none">{data?.date}</span>
            <IconExpand
              className={`ml-3 w-[10px] cursor-pointer flex-none transition-all ${
                show ? "rotate-180" : ""
              }`}
              color="fill-gray-2"
              onClick={() => setShow(!show)}
            />
            <Dropdown
              className="flex-none"
              label={
                <IconMore
                  className="ml-[15px] w-[14px] cursor-pointer"
                  color="fill-gray-3"
                />
              }
              lists={[
                {
                  label: "Delete",
                  onClick: () => handleDelete(),
                  className: "text-indicator-red",
                },
              ]}
              classNameContent="right-0"
            />
          </div>
        </div>
        <div
          className={`flex flex-col gap-2 transition-all overflow-hidden duration-300 ${
            show ? "h-full" : "h-0"
          }`}
        >
          <DatepickerCustom
            date={data?.date}
            handleDate={(val) => handleDate(val)}
          />
          <DescriptionField
            value={data?.description}
            handleChange={(val) => handleDescription(val)}
          />
          <TagField
            value={data?.tags}
            handleChange={(val) => handleTags(val)}
          />
        </div>
      </div>
    </div>
  );
};

const TitleField = ({ value, handleChange, isDone }) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <textarea
      value={value}
      onChange={(val) => handleChange(val.target.value)}
      onBlur={() => {
        setEdit(!edit);
      }}
      onMouseOut={() => setEdit(!edit)}
      rows="2"
      className="w-full border border-gray-5 rounded-md p-2 mr-2"
      placeholder="Type task title"
    />
  ) : (
    <span
      onDoubleClick={() => setEdit(!edit)}
      className={`text-gray-2 mr-2 ${isDone ? "line-through" : ""}`}
    >
      {value}
    </span>
  );
};

const DescriptionField = ({ value, handleChange = () => {} }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex gap-2 items-center p-2">
      <IconEdit
        className="w-[17px] h-[17px] flex-none self-start cursor-pointer"
        onClick={() => setEdit(!edit)}
      />
      {edit ? (
        <textarea
          value={value}
          onChange={(val) => handleChange(val.target.value)}
          onBlur={() => {
            setEdit(!edit);
          }}
          rows="4"
          className="w-full border border-gray-5 rounded-md p-2"
          placeholder="Description"
        />
      ) : (
        <p className="text-gray-2">{value}</p>
      )}
    </div>
  );
};

const TagField = ({ value = [], handleChange = () => {} }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex gap-2 items-center bg-blue-2 p-2">
      <IconBookmarks
        className="w-[17px] h-[17px] flex-none self-start cursor-pointer"
        color={value?.length ? "fill-blue-1" : "fill-gray-3"}
        onClick={() => setEdit(!edit)}
      />
      {edit && (
        <div className="absolute ml-7 bg-white border top-full -mt-2 border-gray-3 p-3 rounded-md z-10 flex flex-col gap-2">
          {listTags?.map((tag, idx) => (
            <ItemTag
              key={idx}
              color={tag?.color}
              text={tag?.name}
              className={`cursor-pointer ${
                value?.some((s) => s === tag?.name)
                  ? "border border-blue-1"
                  : ""
              }`}
              onClick={() => {
                if (value?.some((s) => s === tag?.name)) {
                  let temp = value?.filter((f) => f !== tag?.name);
                  handleChange(temp);
                } else {
                  let temp = [...value, tag?.name];
                  handleChange(temp);
                }
              }}
            />
          ))}
        </div>
      )}
      <div className="flex gap-2 items-center flex-wrap">
        {value?.map((tag, idx) => (
          <ItemTag
            color={listTags?.find((f) => f.name === tag)?.color}
            text={tag}
          />
        ))}
      </div>
    </div>
  );
};

const ItemTag = ({ className, color, text = "-", ...props }) => {
  return (
    <div
      className={`px-3 py-2 rounded-[5px] ${
        color || "bg-sticker-blue"
      } ${className}`}
      {...props}
    >
      <span className="text-gray-2 font-bold">{text}</span>
    </div>
  );
};
