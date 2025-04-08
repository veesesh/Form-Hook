import React, { useMemo } from "react";
import formData from "./data/formData.json";
import useDntelForm from "./hooks/useDntelForm";
import DntelFormRenderer from "./components/DntelFormRenderer";

function App() {
  const memoizedFormData = useMemo(() => formData, []); // Only if dynamic
  const {
    sectionRefs,
    changes,
    changeValue,
    expandedSections,
    toggleSection,
    activeSection,
  } = useDntelForm(memoizedFormData);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Form you wanted</h1>
      <DntelFormRenderer
        initialData={memoizedFormData}
        sectionRefs={sectionRefs}
        changes={changes}
        changeValue={changeValue}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        activeSection={activeSection}
      />
    </div>
  );
}

export default App;
