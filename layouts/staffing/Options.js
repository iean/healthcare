"use client";

import { MdSchedule, MdGroup, MdPerson } from "react-icons/md";

const options = [
  {
    icon: <MdSchedule size={40} className="text-accent" />,
    title: "Temporary Staffing",
    text: "Qualified professionals available for short-term cover and urgent needs.",
  },
  {
    icon: <MdPerson size={40} className="text-accent" />,
    title: "Permanent Placement",
    text: "Find the right carers and nurses to join your team long term.",
  },
  {
    icon: <MdGroup size={40} className="text-accent" />,
    title: "Home Care Staffing",
    text: "Compassionate carers to support clients within their own homes.",
  },
];

const StaffingOptions = () => (
  <section className="py-16 bg-theme-light">
    <div className="container">
      <h2 className="text-center text-3xl font-bold text-primary mb-8">
        Staffing Options
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {options.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold text-accent mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StaffingOptions;
