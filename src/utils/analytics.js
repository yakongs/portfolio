const STORAGE_KEY = "soso-portfolio-analytics-v1";

const readAnalytics = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? {
      events: {},
    };
  } catch {
    return { events: {} };
  }
};

const trackInteraction = (eventName) => {
  try {
    const analytics = readAnalytics();
    const currentEvent = analytics.events[eventName] ?? { count: 0 };

    analytics.events[eventName] = {
      count: currentEvent.count + 1,
      lastTrackedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics));
  } catch {
    // Analytics must never block navigation or downloads.
  }
};

export { readAnalytics, trackInteraction };
