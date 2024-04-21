import kirklin from "@kirklin/eslint-config";

export default kirklin({
  unocss: true,
  formatters: {
    css: true,
    html: true,
    "prettier"
  },
});
