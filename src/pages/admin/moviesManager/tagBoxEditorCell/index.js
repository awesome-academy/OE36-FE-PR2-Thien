import { TagBox } from "devextreme-react";
import React from "react";
import PropTypes from "prop-types";

TagBoxEditorCell.propTypes = {
  data: PropTypes.object,
};

function TagBoxEditorCell({ data }) {
  const onValueChanged = (e) => {
    data.setValue(e.value);
  };

  const onSelectionChanged = () => {
    data.component.updateDimensions();
  };
  return (
    <TagBox
      dataSource={data.column.lookup.dataSource}
      defaultValue={data.value}
      valueExpr="value"
      displayExpr="label"
      showSelectionControls={true}
      maxDisplayedTags={3}
      showMultiTagOnly={false}
      applyValueMode="useButtons"
      searchEnabled={true}
      onValueChanged={onValueChanged}
      onSelectionChanged={onSelectionChanged}
    />
  );
}

export default TagBoxEditorCell;
