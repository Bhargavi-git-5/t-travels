import Link from "next/link";

// One shared button component so every CTA in the app looks and
// behaves consistently. `as="link"` renders an <a>-backed Next Link,
// otherwise it's a real <button> - important for forms/onClick handlers.
export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm font-body font-medium text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-signal text-ink hover:bg-signaldark",
    dark: "bg-ink text-concrete hover:bg-steel",
    outline: "border border-ink text-ink hover:bg-ink hover:text-concrete",
    ghost: "text-ink hover:bg-concretedark",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href && disabled) {
    // A disabled action should never navigate - render a non-interactive
    // span rather than a Link that would still be clickable.
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
