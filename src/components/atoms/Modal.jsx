const Modal = ({ children, className }) => {
  return (
    <div
      className={`w-full flex flex-col lg:w-[734px] h-[734px] border border-gray-4 absolute bottom-[83px] bg-white rounded py-6 px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Modal;
