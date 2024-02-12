function MailForm() {
  return (
    <section className="max-w-screen-lg mx-auto">
      <form className="">
        <div className="flex space-x-2 flex-1 border-b-2 border-gray-900  bg-gray-700">
          <label htmlFor="email" className="py-2 px-4 text-lg text-firstColor">
            To
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full text-md p-2  bg-gray-700 outline-none"
          />
        </div>
        <div className="flex space-x-2 flex-1 border-b-2   bg-gray-700">
          <label
            htmlFor="subject"
            className="py-2 px-4 text-lg  text-firstColor "
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full text-md p-2  bg-gray-700 outline-none"
          />
        </div>
      </form>
    </section>
  );
}

export default MailForm;
