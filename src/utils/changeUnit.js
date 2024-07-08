export const changeUnit = (unit, setUnit) => {
  setUnit(!unit);
  localStorage.setItem("toggle", JSON.stringify(unit));
};
