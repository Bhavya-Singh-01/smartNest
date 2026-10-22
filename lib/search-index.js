// Static keyword index so the header search can jump straight to the right
// page/section without a backend.
export const SEARCH_INDEX = [
  // Basics
  { title: "What Is a Smart Home?", section: "Smart Home Basics", url: "/basics#what-is-smart-home", tags: ["smart home", "basics", "introduction", "what is"] },
  { title: "What Is IoT?", section: "Smart Home Basics", url: "/basics#what-is-iot", tags: ["iot", "internet of things", "basics"] },
  { title: "Smart Devices", section: "Smart Home Basics", url: "/basics#smart-devices", tags: ["smart device", "sensor", "actuator"] },
  { title: "The Smart Home Ecosystem", section: "Smart Home Basics", url: "/basics#ecosystem", tags: ["ecosystem", "diagram", "hub", "cloud"] },
  { title: "Wi-Fi", section: "Wireless Protocols", url: "/basics#protocols", tags: ["wifi", "wi-fi", "2.4ghz", "protocol"] },
  { title: "Bluetooth / BLE", section: "Wireless Protocols", url: "/basics#protocols", tags: ["bluetooth", "ble", "protocol"] },
  { title: "Zigbee", section: "Wireless Protocols", url: "/basics#protocols", tags: ["zigbee", "mesh", "protocol"] },
  { title: "Z-Wave", section: "Wireless Protocols", url: "/basics#protocols", tags: ["z-wave", "zwave", "protocol"] },
  { title: "Thread", section: "Wireless Protocols", url: "/basics#protocols", tags: ["thread", "border router", "protocol"] },
  { title: "Matter", section: "Wireless Protocols", url: "/basics#protocols", tags: ["matter", "cross-ecosystem", "protocol", "certification"] },
  { title: "How Devices Communicate", section: "Smart Home Basics", url: "/basics#communication", tags: ["communication", "message flow", "trigger"] },
  { title: "Smart Hubs", section: "Smart Home Basics", url: "/basics#hubs", tags: ["hub", "bridge", "gateway"] },
  { title: "Cloud vs. Local Control", section: "Smart Home Basics", url: "/basics#cloud-local", tags: ["cloud", "local control", "offline"] },
  { title: "Device Compatibility Checklist", section: "Smart Home Basics", url: "/basics#compatibility", tags: ["compatibility", "checklist", "before you buy"] },

  // Devices
  { title: "Smart Bulbs & Switches", section: "Device Manual", url: "/devices#guide-bulbs", tags: ["bulb", "switch", "lighting", "dimmer"] },
  { title: "Smart Plugs", section: "Device Manual", url: "/devices#guide-plugs", tags: ["plug", "outlet", "energy monitoring"] },
  { title: "Smart Locks", section: "Device Manual", url: "/devices#guide-locks", tags: ["lock", "smart lock", "deadbolt", "keyless"] },
  { title: "Security Cameras", section: "Device Manual", url: "/devices#guide-cameras", tags: ["camera", "security camera", "cctv", "video"] },
  { title: "Door/Window Sensors", section: "Device Manual", url: "/devices#guide-doorsensors", tags: ["door sensor", "window sensor", "contact sensor"] },
  { title: "Motion Sensors", section: "Device Manual", url: "/devices#guide-motion", tags: ["motion sensor", "pir", "occupancy"] },
  { title: "Smart Speakers", section: "Device Manual", url: "/devices#guide-speakers", tags: ["speaker", "voice assistant", "alexa", "google home"] },
  { title: "Smart Thermostats / Climate Control", section: "Device Manual", url: "/devices#guide-thermostat", tags: ["thermostat", "climate", "ac controller", "hvac"] },
  { title: "Energy Monitoring Devices", section: "Device Manual", url: "/devices#guide-energy", tags: ["energy monitor", "power usage", "ct clamp"] },

  // Installation
  { title: "Pre-Installation Checklist", section: "Installation Manual", url: "/installation#prereq", tags: ["installation", "checklist", "prerequisites"] },
  { title: "Network Requirements", section: "Installation Manual", url: "/installation#network-reqs", tags: ["network", "wifi requirements", "installation"] },
  { title: "Installation Steps", section: "Installation Manual", url: "/installation#install", tags: ["installation", "steps", "how to install"] },
  { title: "Pairing & Connecting Devices", section: "Installation Manual", url: "/installation#pairing", tags: ["pairing", "connecting", "installation"] },
  { title: "Testing & Verification", section: "Installation Manual", url: "/installation#testing", tags: ["testing", "verification", "installation checklist"] },
  { title: "Common Installation Errors", section: "Installation Manual", url: "/installation#errors", tags: ["installation error", "troubleshooting", "won't pair"] },

  // Automation
  { title: "Morning Routine", section: "Automation Guide", url: "/automation#morning", tags: ["morning", "automation", "routine"] },
  { title: "Good Night Routine", section: "Automation Guide", url: "/automation#goodnight", tags: ["good night", "automation", "routine"] },
  { title: "Coming Home Routine", section: "Automation Guide", url: "/automation#cominghome", tags: ["coming home", "geofence", "automation"] },
  { title: "Leaving Home Routine", section: "Automation Guide", url: "/automation#leavinghome", tags: ["leaving home", "away mode", "automation"] },
  { title: "Security Routine", section: "Automation Guide", url: "/automation#security", tags: ["security automation", "alert", "away"] },
  { title: "Motion-Based Lighting", section: "Automation Guide", url: "/automation#motion", tags: ["motion lighting", "automation"] },
  { title: "Energy-Saving Routine", section: "Automation Guide", url: "/automation#energy", tags: ["energy saving", "automation"] },

  // Security
  { title: "Secure Wi-Fi", section: "Security & Privacy", url: "/security#wifi", tags: ["wifi security", "wpa", "router"] },
  { title: "Strong Passwords", section: "Security & Privacy", url: "/security#passwords", tags: ["password", "security"] },
  { title: "Two-Factor Authentication", section: "Security & Privacy", url: "/security#2fa", tags: ["2fa", "two-factor", "authentication"] },
  { title: "Firmware Updates", section: "Security & Privacy", url: "/security#firmware", tags: ["firmware", "updates", "security"] },
  { title: "Camera Privacy", section: "Security & Privacy", url: "/security#camera-privacy", tags: ["camera privacy", "surveillance"] },
  { title: "Guest Networks", section: "Security & Privacy", url: "/security#guest-network", tags: ["guest network", "vlan", "segmentation"] },
  { title: "Safe Device Disposal", section: "Security & Privacy", url: "/security#disposal", tags: ["disposal", "factory reset", "recycle"] },
  { title: "Security Checklist", section: "Security & Privacy", url: "/security#checklist", tags: ["security checklist"] },

  // Troubleshooting
  { title: "Device Won't Connect", section: "Troubleshooting Center", url: "/troubleshooting#connect", tags: ["won't connect", "pairing failure", "troubleshooting"] },
  { title: "Device Offline", section: "Troubleshooting Center", url: "/troubleshooting#offline", tags: ["offline", "disconnected", "troubleshooting"] },
  { title: "Wi-Fi Problems", section: "Troubleshooting Center", url: "/troubleshooting#wifi-issues", tags: ["wifi problems", "troubleshooting"] },
  { title: "Sensor Not Responding", section: "Troubleshooting Center", url: "/troubleshooting#sensor-issues", tags: ["sensor not responding", "troubleshooting"] },
  { title: "Automation Not Triggering", section: "Troubleshooting Center", url: "/troubleshooting#automation-issues", tags: ["automation not working", "troubleshooting"] },
  { title: "Voice Command Failure", section: "Troubleshooting Center", url: "/troubleshooting#voice-issues", tags: ["voice command", "alexa not working", "troubleshooting"] },

  // Build
  { title: "Starter Smart Home", section: "Build Your Smart Home", url: "/build#starter", tags: ["starter setup", "budget", "build"] },
  { title: "Smart Security Home", section: "Build Your Smart Home", url: "/build#security-setup", tags: ["security setup", "build"] },
  { title: "Energy-Saving Home", section: "Build Your Smart Home", url: "/build#energy-setup", tags: ["energy saving setup", "build"] },
  { title: "Fully Automated Home", section: "Build Your Smart Home", url: "/build#automated-setup", tags: ["fully automated", "build"] },

  // Planner / Compare / FAQ
  { title: "Smart Home Planner", section: "Planner", url: "/planner", tags: ["planner", "budget", "recommendation"] },
  { title: "Device Comparison", section: "Compare", url: "/compare", tags: ["compare", "comparison", "device comparison"] },
  { title: "Glossary", section: "FAQ & Support", url: "/faq#glossary", tags: ["glossary", "matter", "thread", "zigbee", "hub", "sensor", "automation", "definitions"] },
  { title: "FAQ", section: "FAQ & Support", url: "/faq#faq-section", tags: ["faq", "questions"] },
  { title: "Contact Support", section: "FAQ & Support", url: "/faq#support", tags: ["support", "contact", "help"] },
  { title: "My SmartNest dashboard", section: "My SmartNest", url: "/app", tags: ["account", "dashboard", "my smartnest", "reminders"] },
  { title: "My Home & devices", section: "My SmartNest", url: "/app/devices", tags: ["my devices", "warranty", "maintenance", "rooms"] },
  { title: "Report a problem (SmartNest Care)", section: "Support", url: "/app/tickets/new", tags: ["support ticket", "report problem", "help", "care"] },
  { title: "About SmartNest / Our Services", section: "Home", url: "/#about", tags: ["about", "smartnest solutions", "services", "business"] }
];
