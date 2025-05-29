const ServicesPage = () => {
  return (
    <div className="bg-[#636363] text-white min-h-screen pb-20">
      {/* Remove the Header section completely */}

      {/* Main Content */}
      <div className="container mx-auto px-6 space-y-12 pt-20">
        {/* Training & Education */}
        <section>
          <h2 className="text-4xl font-semibold text-center mb-8">
            Training & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Sustainable Beekeeping Training */}
            <div className="bg-[#f5d08c] rounded-lg p-6 text-center text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Sustainable Beekeeping
              </h3>
              <p className="text-sm">
                Learn eco-friendly beekeeping practices to protect bees and
                ecosystems.
              </p>
            </div>

            {/* Card 2: Community Workshops */}
            <div className="bg-[#f5d08c] rounded-lg p-6 text-center text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Community Workshops
              </h3>
              <p className="text-sm">
                Join our workshops to promote sustainable livelihoods and
                environmental stewardship.
              </p>
            </div>
          </div>
        </section>

        {/* Bee Farm Management */}
        <section>
          <h2 className="text-4xl font-semibold text-center mb-8">
            Bee Farm Management
          </h2>
          <div className="bg-[#4d4d4d] rounded-lg p-6 text-center">
            <p className="text-lg">
              We manage bee farms using eco-friendly methods to ensure minimal
              impact on nature while maximizing productivity.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
