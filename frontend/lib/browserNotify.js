// Wraps the browser's built-in Notification API so a real OS-level
// popup can appear even if the T-Travels tab isn't focused - e.g. the
// driver is in another app and a booking comes in.
//
// Support varies by platform: works well on desktop Chrome/Firefox/Edge
// and Android Chrome. iOS Safari does NOT support this in a normal
// browser tab - only inside a site added to the home screen (iOS 16.4+),
// and even then behavior is limited. There is no way around this from
// the web platform side; it's an Apple restriction, not a bug here.

export function notificationsSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function getPermission() {
  if (!notificationsSupported()) return "unsupported";
  return Notification.permission; // "granted" | "denied" | "default"
}

export async function requestPermission() {
  if (!notificationsSupported()) return "unsupported";
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

// Shows a popup only if permission was granted AND the tab is currently
// in the background - if the person is already looking at the dashboard,
// the in-app notification + sound is enough; a popup on top would just
// be redundant.
export function showBackgroundNotification(title, body) {
  if (!notificationsSupported()) return;
  if (Notification.permission !== "granted") return;
  if (document.visibilityState === "visible") return;

  try {
    const notification = new Notification(title, {
      body,
      icon: "/favicon.ico",
      tag: "t-travels-notification", // collapses rapid repeats into one popup
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch {
    // Some browsers throw if called from a context they don't like -
    // safe to ignore, this is a nice-to-have, not critical functionality.
  }
}
