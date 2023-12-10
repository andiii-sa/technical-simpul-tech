const Modal = ({ children, className }) => {
  return (
    <div
      className={`w-[calc(100vw-80px)] flex flex-col md:w-[734px] h-[734px] max-h-[calc(100vh-150px)] border border-gray-4 absolute bottom-[83px] bg-white rounded py-6 px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Modal;
