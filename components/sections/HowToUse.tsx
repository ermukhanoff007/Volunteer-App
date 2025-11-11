import Link from "next/link";

export default function HowToUse() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8 text-amber-800">How to Use Volunteer App</h2>
        <p className="text-lg text-gray-600 mb-12">
          Getting started is simple — find opportunities, join events, and make an impact in just a
          few steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/register"
            className="p-6 bg-white shadow-lg rounded-xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-amber-600 text-5xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Create an Account</h3>
            <p className="text-gray-600">Sign up as a volunteer or an organizer to get started.</p>
          </Link>

          <div className="p-6 bg-white shadow-lg rounded-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="text-amber-600 text-5xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Find Events</h3>
            <p className="text-gray-600">
              Browse events by city, category, or date that match your interests.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="text-amber-600 text-5xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Join & Participate</h3>
            <p className="text-gray-600">
              Register for an event and start making a difference in your community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
