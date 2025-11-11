//Footer for the volunteer app
export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-6 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Volunteer App. All rights reserved.</p>
      </div>
    </footer>
  );
}
