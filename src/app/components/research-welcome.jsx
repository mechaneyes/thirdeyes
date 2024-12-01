const ResearchWelcome = () => {
  return (
    <div className="research-inner relative h-full w-11/12 pr-4 text-base text-darkslateblue-200 leading-6 whitespace-pre-wrap">
      <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
        Research: Welcome
      </h3>
      <div className="pb-4">
        Welcome to Thirdeyes Research! You can use this tool to find information
        about artists, bands, or other topics.
      </div>
      <div className="pb-4">
        On first run the Wikipedia information associated with the artist
        you&apos;re working on is presented.
      </div>
      <div className="pb-4">
        Behind the scenes more information is being fetched about the artist. As
        it becomes available, that info can be accessed using the buttons below.
      </div>
      <div>
        To get started, enter an artist name in the form in the Strategies panel
        on the left.
      </div>
    </div>
  );
};

export default ResearchWelcome;
