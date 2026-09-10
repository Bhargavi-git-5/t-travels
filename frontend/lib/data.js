// Static reference data - vehicle categories and a fallback demo list
// used only if the backend API isn't reachable yet (e.g. before you've
// run `npm run seed` on the backend, or while working on the UI alone).
export const VEHICLE_CATEGORIES = [
  { type: "JCB", imageKey: "jcb", blurb: "Digging, trenching, site clearing" },
  { type: "Tractor", imageKey: "tractor", blurb: "Farm and haulage work" },
  { type: "Lorry", imageKey: "lorry", blurb: "Material and goods transport" },
  { type: "Excavator", imageKey: "excavator", blurb: "Deep digging, demolition" },
  { type: "Crane", imageKey: "crane", blurb: "Lifting and placement" },
  { type: "Bulldozer", imageKey: "bulldozer", blurb: "Grading and land clearing" },
  { type: "Loader", imageKey: "loader", blurb: "Loading loose material" },
  { type: "Trailer", imageKey: "trailer", blurb: "Flatbed and long hauls" },
];

export const FALLBACK_VEHICLES = [
  { _id: "demo-1", name: "JCB 3DX Super", type: "JCB", imageKey: "jcb", pricePerHour: 800, availabilityStatus: "available", driverName: "Ramesh Kumar", driverPhone: "7569617637" },
  { _id: "demo-2", name: "Mahindra Arjun 605", type: "Tractor", imageKey: "tractor", pricePerHour: 450, availabilityStatus: "available", driverName: "Ramesh Kumar", driverPhone: "7569617637" },
  { _id: "demo-3", name: "Tata 1109 Lorry", type: "Lorry", imageKey: "lorry", pricePerHour: 650, availabilityStatus: "booked", driverName: "Ramesh Kumar", driverPhone: "7569617637" },
  { _id: "demo-4", name: "Tata Hitachi Crane 14T", type: "Crane", imageKey: "crane", pricePerHour: 1400, availabilityStatus: "available", driverName: "Ramesh Kumar", driverPhone: "7569617637" },
];

export const HOW_IT_WORKS_STEPS = [
  { step: 1, title: "Find the right equipment", description: "Filter by type, availability and price to find a vehicle near your site." },
  { step: 2, title: "Pick your hours", description: "Choose how many hours you need it for and see the total cost instantly." },
  { step: 3, title: "Book and confirm", description: "Send the booking. The driver is notified immediately and confirms availability." },
  { step: 4, title: "Get to work", description: "The driver arrives at the agreed time. Pay for exactly the hours you booked." },
];
