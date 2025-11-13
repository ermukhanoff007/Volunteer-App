export default function About() {
  return (
    <div className="relative  py-20 flex items-center justify-center text-black">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h2 className="text-4xl font-bold mb-6">About Volunteer App</h2>
        <p className="text-lg mb-10 opacity-90">
          We help people find events, share kindness, and make a difference together.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:bg-white/20 transition">
            <h3 className="text-2xl font-semibold mb-2">10k+</h3>
            <p className="text-sm opacity-80">Active Volunteers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:bg-white/20 transition">
            <h3 className="text-2xl font-semibold mb-2">500+</h3>
            <p className="text-sm opacity-80">Events Hosted</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:bg-white/20 transition">
            <h3 className="text-2xl font-semibold mb-2">12k+</h3>
            <p className="text-sm opacity-80">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
