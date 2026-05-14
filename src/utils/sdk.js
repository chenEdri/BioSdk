// SDK utility wrapper for cdApi
// Provides safe access to the cdApi global object loaded from the external script

export function setCustomerSessionId(csid) {
  if (window.cdApi && typeof window.cdApi.setCustomerSessionId === "function") {
    window.cdApi.setCustomerSessionId(csid);
    console.log("[SDK] setCustomerSessionId:", csid);
  } else {
    console.warn("[SDK] cdApi not available - setCustomerSessionId skipped");
  }
}

export function changeContext(context) {
  if (window.cdApi && typeof window.cdApi.changeContext === "function") {
    window.cdApi.changeContext(context);
    console.log("[SDK] changeContext:", context);
  } else {
    console.warn("[SDK] cdApi not available - changeContext skipped");
  }
}
