export const trackEvent = (
  eventName: 'page_view' | 'click_cta' | 'open_quote_agent' | 'submit_quote_agent' | 'change_language',
  properties?: Record<string, any>
) => {
  // In a real application, this would integrate with Google Analytics, Plausible, Mixpanel, etc.
  console.log(`[Analytics] Event: ${eventName}`, properties || {});
};
