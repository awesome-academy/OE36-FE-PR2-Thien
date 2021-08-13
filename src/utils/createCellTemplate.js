export const createCellTemplate = (container, options) => {
  const noBreakSpace = "\u00A0",
    text = (options.value || [])
      .map((element) => {
        if (element.name) {
          if (element.number) {
            return element.name + "×" + element.number;
          }
          return element.name;
        }
        return options.column.lookup.calculateCellValue(element);
      })
      .join(", ");
  container.textContent = text || noBreakSpace;
  container.title = text;
};
