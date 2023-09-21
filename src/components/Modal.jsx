// import Button from "../Abstract/Button";

function Model({ className, show = false, setShow, children, buttons }) {
  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } fixed w-full h-full min-h-screen min-w-full bg-gray-700/30 z-50 justify-center items-center`}
      onClick={() => setShow(false)}
    >
      <div
        className={`flex flex-grow-0  flex-col bg-white w-auto h-auto rounded-xl p-5 justify-center items-center ${className}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
        {buttons ? (
          <div className="flex flex-1 mt-4 self-end">
            {/* <Button
							value={"Cancel"}
							Class={"bg-white text-gray-400 mx-2 px-5 border-gray-400/70 border"}
							onPress={() => setShow(false)}
						/>
						<Button
							value={"Ok"}
							Class={"px-8"}
							onPress={() => setShow(false)}
						/> */}
            <button
              className="bg-white text-gray-400 mx-2 px-5 border border-gray-400/70"
              onClick={setShow(false)}
            >
              Cancel
            </button>
            <button className="px-8"  onClick={setShow(false)}>
              Ok
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Model;
