import Metrics from "./metrics";

const size = {
  font6: (Metrics.screenWidth * 6) / 365,
  font8: (Metrics.screenWidth * 8) / 365,
  font10: (Metrics.screenWidth * 10) / 365,
  font12: (Metrics.screenWidth * 12) / 365,
  font14: (Metrics.screenWidth * 14) / 365,
  font16: (Metrics.screenWidth * 16) / 365,
  font18: (Metrics.screenWidth * 18) / 365,
  font20: (Metrics.screenWidth * 20) / 365,
  font22: (Metrics.screenWidth * 22) / 365,
  font24: (Metrics.screenWidth * 24) / 365,
  font26: (Metrics.screenWidth * 26) / 365,
  font28: (Metrics.screenWidth * 28) / 365,
  font30: (Metrics.screenWidth * 30) / 365,
};

const weight = {
  bold: "900",
  semibold: "700",
  regular: "500",
  semilight: "300",
  light: "100",
};

export default { size, weight };
