import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TimelineSection = () => {
  return (
    <>
      {/* TIMELINE SECTION STARTS HERE */}

      {/* Approach */}
      <div className="bg-background dark:bg-neutral-900">
        {/* End of Approach */}
        <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto">
          {/* Title */}
          <div className="max-w-3xl mb-10 lg:mb-14">
            <h2 className="dark:text-neutral-50 text-neutral-700 font-semibold text-2xl md:text-4xl md:leading-tight">
              How It Works: Creating Your Event
            </h2>
            <p className="mt-1 dark:text-neutral-50 text-neutral-700">
              Ready to make your event a success? Let's get started!
            </p>
          </div>
          {/* End Title */}

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
            <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
              <img
                className="w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1587614203976-365c74645e83?q=80&w=480&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image Description"
                loading="lazy"
              />
            </div>
            {/* End Col */}

            {/* Timeline */}
            <div>
              {/* Heading */}
              <div className="mb-4">
                <h3 className="text-primary dark:text-primary text-xs font-medium uppercase">
                  Steps
                </h3>
              </div>
              {/* End Heading */}

              {/* Item */}
              <div className="flex gap-x-5 ms-1">
                {/* Icon */}
                <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div className="relative z-10 size-8 flex justify-center items-center">
                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-primary dark:text-primary font-semibold text-xs uppercase rounded-full">
                      1
                    </span>
                  </div>
                </div>
                {/* End Icon */}

                {/* Right Content */}
                <div className="grow pt-0.5 pb-8 sm:pb-12">
                  <p className="text-sm lg:text-base dark:text-neutral-50 text-neutral-700">
                    <span className="text-primary">
                      Create an account with us:&nbsp;
                    </span>
                    Sign Up! it's quick and easy. Provide basic details about
                    yourself.
                  </p>
                </div>
                {/* End Right Content */}
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="flex gap-x-5 ms-1">
                {/* Icon */}
                <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div className="relative z-10 size-8 flex justify-center items-center">
                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-primary dark:text-primary font-semibold text-xs uppercase rounded-full">
                      2
                    </span>
                  </div>
                </div>
                {/* End Icon */}

                {/* Right Contnet */}
                <div className="grow pt-0.5 pb-8 sm:pb-12">
                  <p className="text-sm lg:text-base dark:text-neutral-50 text-neutral-700">
                    <span className="text-primary">Event Details:&nbsp;</span>
                    Tell us about your event. What's the occasion? How many
                    guests are you expecting? Any special requests?
                  </p>
                </div>
                {/* End right content */}
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="flex gap-x-5 ms-1">
                {/* Icon */}
                <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div className="relative z-10 size-8 flex justify-center items-center">
                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-primary dark:text-primary font-semibold text-xs uppercase rounded-full">
                      3
                    </span>
                  </div>
                </div>
                {/* End Icon */}

                {/* Right Contnet */}
                <div className="grow pt-0.5 pb-8 sm:pb-12">
                  <p className="text-sm md:text-base dark:text-neutral-50 text-neutral-700">
                    <span className="text-primary">Choose a Venue:&nbsp;</span>
                    Browse our venue options and select the perfect backdrop for
                    your event. Need assistance? Our team is here to guide you.
                  </p>
                </div>
                {/* End right content */}
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="flex gap-x-5 ms-1">
                {/* Icon */}
                <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                  <div className="relative z-10 size-8 flex justify-center items-center">
                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-primary dark:text-primary font-semibold text-xs uppercase rounded-full">
                      4
                    </span>
                  </div>
                </div>
                {/* End Icon */}

                {/* Right Contnet */}
                <div className="grow pt-0.5 pb-8 sm:pb-12">
                  <p className="text-sm md:text-base dark:text-neutral-50 text-neutral-700">
                    <span className="text-primary">
                      Promote and Sell: &nbsp;
                    </span>
                    Spread the word! Share your event on social media, email
                    invitations, and start selling tickets. We'll handle the
                    rest.
                  </p>
                </div>
                {/* End right content */}
              </div>
              {/* End Item */}
              <Link
                to="/signup"
                className="inline-flex items-center gap-x-2 py-3 px-3 bg-primary dark:bg-primary font-medium text-sm dark:text-neutral-800 text-primary-foreground rounded-full focus:outline-none hover:opacity-75"
              >
                <FaAnglesRight /> Get Started! <FaAnglesRight />
              </Link>
            </div>
            {/* End Timeline */}
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Approach */}

      {/* TIMELINE SECTION ENDS HERE */}
    </>
  );
};

export default TimelineSection;
