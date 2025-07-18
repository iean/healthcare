"use client";

import {
  MdOutlineHome,
  MdAccessibility,
  MdHolidayVillage,
  MdLocalHospital,
  MdNightlight,
  MdPeople,
  MdMedicalServices,
  MdHotel,
  MdAccessibilityNew,
} from "react-icons/md";

const options = [
  {
    icon: <MdHolidayVillage size={40} className="text-accent" />,
    title: "Holiday Care",
    text: "Short-term support while family carers are away on holiday.",
  },
  {
    icon: <MdLocalHospital size={40} className="text-accent" />,
    title: "Hospital to Home",
    text: "Helping you settle back home safely after a hospital stay.",
  },
  {
    icon: <MdOutlineHome size={40} className="text-accent" />,
    title: "Live in Care",
    text: "Full-time care in your own home giving constant reassurance.",
  },
  {
    icon: <MdNightlight size={40} className="text-accent" />,
    title: "Night Care",
    text: "Overnight assistance for peace of mind and uninterrupted rest.",
  },
  {
    icon: <MdAccessibilityNew size={40} className="text-accent" />,
    title: "Personal Care",
    text: "Support with washing, dressing and other daily routines.",
  },
  {
    icon: <MdHotel size={40} className="text-accent" />,
    title: "Respite Care",
    text: "Temporary care giving family members time to recharge.",
  },
  {
    icon: <MdMedicalServices size={40} className="text-accent" />,
    title: "Specialist Care",
    text: "Bespoke services for complex medical or disability needs.",
  },
  {
    icon: <MdPeople size={40} className="text-accent" />,
    title: "Social Companionship",
    text: "Friendly company and help getting out and about.",
  },
];

const ServiceOptions = () => (
  <section className="py-16 bg-theme-light">
    <div className="container">
      <h2 className="text-center text-3xl font-bold text-primary mb-8">Our Services</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
