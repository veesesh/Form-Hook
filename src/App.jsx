import React, { useMemo } from "react";
import formData from "./data/formData.json";
import useDntelForm from "./hooks/useDntelForm";
import DntelFormRenderer from "./components/DntelFormRenderer";

function App() {
  const memoizedFormData = useMemo(() => formData, []);
  const formId = "demo-form";
  const {
    sectionRefs,
    changes,
    changeValue,
    expandedSections,
    toggleSection,
    activeSection,
    expandAll,
    collapseAll,
    scrollToSection,
    reset,
    clearLS,
    lastChanged,
    editMode,
    setEditMode,
  } = useDntelForm(memoizedFormData, formId);

  return (
    <div className="p-8 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">📋 Dntel Form</h1>
        <div className="space-x-2">
          <button
            onClick={expandAll}
            className="px-3 py-1 bg-green-100 border border-green-400 rounded-md hover:bg-green-200"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1 bg-yellow-100 border border-yellow-400 rounded-md hover:bg-yellow-200"
          >
            Collapse All
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 bg-red-100 border border-red-400 rounded-md hover:bg-red-200"
          >
            Reset
          </button>
        </div>
      </header>

      <DntelFormRenderer
        initialData={memoizedFormData}
        sectionRefs={sectionRefs}
        changes={changes}
        changeValue={changeValue}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        activeSection={activeSection}
        editMode={editMode}
      />

      <footer className="text-sm text-gray-500 pt-4 border-t">
        <div>
          🕒 Last Changed:{" "}
          {lastChanged ? new Date(lastChanged).toLocaleString() : "Never"}
        </div>
        <div>🛠️ Edit Mode: {editMode ? "Enabled" : "Disabled"}</div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-2 px-3 py-1 bg-blue-100 border border-blue-400 rounded-md hover:bg-blue-200"
        >
          Toggle Edit Mode
        </button>
        <button
          onClick={clearLS}
          className="mt-2 px-3 py-1 bg-blue-100 border border-blue-400 rounded-md hover:bg-blue-200"
        >
          Clear LocalStorage
        </button>
      </footer>
    </div>
  );
}

export default App;
