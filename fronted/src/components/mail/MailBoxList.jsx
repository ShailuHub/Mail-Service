const MailBoxList = () => {
  return (
    <div className="px-4 py-2 ">
      <div className="flex items-center justify-between border-b border-gray-300 py-2 space-x-6">
        <div className="flex flex-1 items-center space-x-2 font-roboto">
          <input type="checkbox" className="mr-2 h-6 w-6" />
          <div className="flex flex-1 space-x-8 items-center justify-start">
            <p className="font-semibold text-firstColor text-lg font-montserrat">
              shailesh.respond
            </p>
            <p className="text-white-400 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[48rem] font-palanquin">
              <span className="font-semibold">
                A new job oppertunities from amazone for you visit
              </span>
              <span> - </span>
              <span className="text-fourthColor">
                A new job oppertunities from amazone for you visit .....
              </span>
            </p>
          </div>
        </div>
        <p className="text-sm text-white">Jan 01</p>
      </div>
    </div>
  );
};

export default MailBoxList;
