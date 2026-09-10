// Status badge for vehicle availability. Color is the primary signal
// here (not just text) so it reads at a glance across a grid of cards.
const STATUS_STYLES = {
  available: "bg-moss/10 text-moss border-moss/30",
  booked: "bg-rust/10 text-rust border-rust/30",
  offline: "bg-steel/10 text-steel border-steel/30",
};

const STATUS_LABEL = {
  available: "Available",
  booked: "Booked",
  offline: "Offline",
};

export default function Badge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-sm text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.offline}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "available" ? "bg-moss" : status === "booked" ? "bg-rust" : "bg-steel"
        }`}
      />
      {STATUS_LABEL[status] || status}
    </span>
  );
}
