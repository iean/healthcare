"use client";

import { MdFavorite, MdOutlineHome, MdAccessibility } from "react-icons/md";

const options = [
  {
    icon: <MdAccessibility size={40} className="text-accent" />,
    title: "Personal Care",
    text: "Assistance with daily routines such as washing, dressing and mobility.",
  },
  {
    icon: <MdOutlineHome size={40} className="text-accent" />,
    title: "Household Help",
    text: "Support with shopping, meal preparation and light housework.",
  },
  {
    icon: <MdFavorite size={40} className="text-accent" />,
    title: "Companionship",
    text: "Friendly carers to provide company and social interaction.",
  },
];

const ServiceOptions = () => (
  <section className="py-16 bg-theme-light">
    <div className="container">
      <h2 className="text-center text-3xl font-bold text-primary mb-8">Our Services</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {options.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold text-accent mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceOptions;
