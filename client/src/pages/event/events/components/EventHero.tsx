const EventHero = () => {
  return (
    <>
      {/* <!-- Hero --> */}
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* <!-- Title --> */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Discover and Host &nbsp;
              <span className="bg-clip-text bg-gradient-to-tl from-primary to-green-600 text-transparent">
                Exciting Events Near You
              </span>
            </h1>
          </div>
          {/* <!-- End Title --> */}

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Find and create unforgettable events with ease, connecting with
              communities and experiences that matter to you.
            </p>
          </div>
        </div>
      </div>
      {/* <!-- End Hero --> */}
    </>
  );
};

export default EventHero;
