// Flat-illustration placeholder "photos" for each vehicle type.
// We use hand-drawn SVGs instead of stock photography so the demo
// has no broken image links and no licensing questions, and so each
// card can carry a small, purposeful animation (an arm bobbing, a
// wheel turning) instead of a static hover-only effect.
//
// Colors are pulled from the Tailwind design tokens directly as hex
// values since raw <svg> fills can't reference Tailwind classes.
const INK = "#15181C";
const STEEL = "#3E4550";
const SIGNAL = "#D6A419";
const RUST = "#9C3B26";
const CONCRETE = "#DDD8CC";

function Ground() {
  return <rect x="0" y="86" width="160" height="4" fill={CONCRETE} />;
}

function JCB() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="20" y="55" width="55" height="26" rx="3" fill={SIGNAL} />
      <rect x="26" y="40" width="26" height="20" rx="2" fill={STEEL} />
      <rect x="30" y="43" width="16" height="12" rx="1" fill={CONCRETE} />
      <circle className="anim-wheel" cx="34" cy="82" r="9" fill={INK} />
      <circle className="anim-wheel" cx="64" cy="82" r="9" fill={INK} />
      <g className="anim-jcb-arm">
        <rect x="70" y="55" width="42" height="7" rx="3" fill={STEEL} />
        <path d="M108 58 L128 70 L120 78 L104 63 Z" fill={RUST} />
      </g>
    </svg>
  );
}

function Tractor() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="35" y="52" width="45" height="24" rx="3" fill={SIGNAL} />
      <rect x="40" y="36" width="20" height="18" rx="2" fill={STEEL} />
      <rect x="43" y="39" width="14" height="10" fill={CONCRETE} />
      <rect x="78" y="60" width="18" height="6" fill={STEEL} />
      <circle className="anim-wheel" cx="45" cy="80" r="7" fill={INK} />
      <circle className="anim-wheel" cx="92" cy="80" r="13" fill={INK} />
      <circle cx="92" cy="80" r="5" fill={CONCRETE} />
    </svg>
  );
}

function Lorry() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="18" y="45" width="20" height="30" rx="2" fill={STEEL} />
      <rect x="21" y="49" width="13" height="10" fill={CONCRETE} />
      <rect x="40" y="35" width="70" height="40" rx="2" fill={SIGNAL} />
      <circle className="anim-wheel" cx="34" cy="80" r="8" fill={INK} />
      <circle className="anim-wheel" cx="66" cy="80" r="8" fill={INK} />
      <circle className="anim-wheel" cx="94" cy="80" r="8" fill={INK} />
    </svg>
  );
}

function Excavator() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="20" y="72" width="60" height="10" rx="4" fill={INK} />
      <rect x="30" y="50" width="34" height="24" rx="3" fill={SIGNAL} />
      <rect x="34" y="53" width="18" height="12" rx="1" fill={CONCRETE} />
      <g className="anim-excavator-arm">
        <rect x="58" y="48" width="36" height="7" rx="3" fill={STEEL} />
        <rect x="88" y="50" width="24" height="6" rx="3" fill={STEEL} transform="rotate(35 88 50)" />
        <path d="M112 66 L126 70 L120 80 L106 74 Z" fill={RUST} />
      </g>
    </svg>
  );
}

function Crane() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="25" y="70" width="50" height="12" rx="3" fill={STEEL} />
      <circle className="anim-wheel" cx="36" cy="84" r="6" fill={INK} />
      <circle className="anim-wheel" cx="64" cy="84" r="6" fill={INK} />
      <rect x="46" y="20" width="6" height="52" fill={SIGNAL} />
      <g className="anim-crane-boom">
        <rect x="49" y="22" width="70" height="5" rx="2" fill={SIGNAL} />
        <g className="anim-hook">
          <line x1="115" y1="27" x2="115" y2="50" stroke={STEEL} strokeWidth="2" />
          <rect x="111" y="50" width="8" height="8" fill={RUST} />
        </g>
      </g>
    </svg>
  );
}

function Bulldozer() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="30" y="72" width="55" height="10" rx="4" fill={INK} />
      <rect x="38" y="52" width="34" height="22" rx="3" fill={SIGNAL} />
      <rect x="41" y="55" width="16" height="10" fill={CONCRETE} />
      <rect className="anim-blade" x="14" y="55" width="8" height="24" rx="1" fill={STEEL} />
      <rect className="anim-blade" x="20" y="50" width="6" height="34" fill={RUST} />
    </svg>
  );
}

function Loader() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="35" y="55" width="42" height="22" rx="3" fill={SIGNAL} />
      <rect x="39" y="58" width="16" height="10" fill={CONCRETE} />
      <circle className="anim-wheel" cx="46" cy="82" r="8" fill={INK} />
      <circle className="anim-wheel" cx="72" cy="82" r="8" fill={INK} />
      <g className="anim-loader-arm">
        <rect x="14" y="58" width="42" height="6" rx="3" fill={STEEL} />
        <path d="M14 55 L28 55 L24 70 L10 70 Z" fill={RUST} />
      </g>
    </svg>
  );
}

function Trailer() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full">
      <Ground />
      <rect x="24" y="46" width="92" height="24" rx="2" fill={SIGNAL} />
      <rect x="16" y="60" width="10" height="14" fill={STEEL} />
      <circle className="anim-wheel" cx="46" cy="80" r="7" fill={INK} />
      <circle className="anim-wheel" cx="66" cy="80" r="7" fill={INK} />
      <circle className="anim-wheel" cx="96" cy="80" r="7" fill={INK} />
      <circle className="anim-wheel" cx="116" cy="80" r="7" fill={INK} />
    </svg>
  );
}

const REGISTRY = {
  jcb: JCB,
  tractor: Tractor,
  lorry: Lorry,
  excavator: Excavator,
  crane: Crane,
  bulldozer: Bulldozer,
  loader: Loader,
  trailer: Trailer,
};

export default function VehicleIllustration({ imageKey, className = "" }) {
  const Illustration = REGISTRY[imageKey] || JCB;
  return (
    <div className={`anim-bob ${className}`}>
      <Illustration />
    </div>
  );
}
