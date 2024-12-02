const ResearchWelcome = () => {
  return (
    <div className="research-inner relative h-full w-11/12 pr-4 text-base text-darkslateblue-200 leading-6 whitespace-pre-wrap">
      <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
        Research: Welcome
      </h3>
      <div className="mt-1">
        Welcome to Thirdeyes Research! You can use this tool to find information
        about artists, bands, or other topics.
      </div>
      <div className="mt-4">
        As you work, behind the scenes information about the artist is being
        fetched. As it becomes available that info can be accessed using the
        buttons below.
      </div>
      <div className="mt-4">
        To get started, search for an artist in the Strategies panel on the
        left.
      </div>
    </div>
  );
};

export default ResearchWelcome;
