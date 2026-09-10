// Populates the database with demo data so the frontend has something
// real to fetch. Run with: npm run seed
// Safe to run multiple times - it wipes and recreates the demo records.
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

const DEMO_DRIVER_PHONE = "7569617637";

async function seed() {
  await connectDB();

  console.log("Clearing existing demo data...");
  await Vehicle.deleteMany({});
  await User.deleteMany({ email: { $in: ["driver@ttravels.demo", "customer@ttravels.demo"] } });

  console.log("Creating demo users...");
  const driver = await User.create({
    name: "Ramesh Kumar",
    email: "driver@ttravels.demo",
    password: "password123",
    role: "driver",
    phone: DEMO_DRIVER_PHONE,
  });

  await User.create({
    name: "Bhargavi",
    email: "customer@ttravels.demo",
    password: "password123",
    role: "customer",
    phone: "9876543210",
  });

  console.log("Creating demo vehicles...");
  const vehicles = [
    { name: "JCB 3DX Super", type: "JCB", imageKey: "jcb", pricePerHour: 800, availabilityStatus: "available" },
    { name: "Mahindra Arjun 605", type: "Tractor", imageKey: "tractor", pricePerHour: 450, availabilityStatus: "available" },
    { name: "Tata 1109 Lorry", type: "Lorry", imageKey: "lorry", pricePerHour: 650, availabilityStatus: "booked" },
    { name: "Hyundai R140 Excavator", type: "Excavator", imageKey: "excavator", pricePerHour: 950, availabilityStatus: "available" },
    { name: "Tata Hitachi Crane 14T", type: "Crane", imageKey: "crane", pricePerHour: 1400, availabilityStatus: "available" },
    { name: "Komatsu D51 Bulldozer", type: "Bulldozer", imageKey: "bulldozer", pricePerHour: 1200, availabilityStatus: "offline" },
    { name: "CAT 906 Loader", type: "Loader", imageKey: "loader", pricePerHour: 700, availabilityStatus: "available" },
    { name: "Heavy Duty Trailer 40ft", type: "Trailer", imageKey: "trailer", pricePerHour: 500, availabilityStatus: "available" },
  ];

  for (const v of vehicles) {
    await Vehicle.create({
      ...v,
      owner: driver._id,
      driverName: driver.name,
      driverPhone: DEMO_DRIVER_PHONE,
      description: `${v.name} available for hourly rental. Well-maintained, experienced operator included.`,
      location: "Machilipatnam, Andhra Pradesh",
    });
  }

  console.log("Seed complete.");
  console.log("Demo driver login:   driver@ttravels.demo / password123");
  console.log("Demo customer login: customer@ttravels.demo / password123");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
