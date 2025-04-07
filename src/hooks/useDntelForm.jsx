import { useRef, useState, useEffect } from "react";
import DntelFormRenderer from "../components/DntelFormRenderer";

export default function useDntelForm(initialData) {
  const sectionRefs = useRef({});
  const [changes, setChanges] = useState({});
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (initialData?.sections) {
      setExpandedSections(Object.keys(initialData.sections));
    }
  }, [initialData]);

  const changeValue = (key, value) => {
    setChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((key) => key !== sectionKey)
        : [...prev, sectionKey]
    );
    setActiveSection(sectionKey); // mark the section as active
  };

  if (!initialData || !initialData.sections) {
    console.warn(
      "useDntelForm: initialData is missing or invalid",
      initialData
    );
    return {
      FormComponent: () => <div> Invalid or empty form data</div>,
    };
  }

  const FormComponent = () => (
    <DntelFormRenderer
      initialData={initialData}
      sectionRefs={sectionRefs}
      changes={changes}
      changeValue={changeValue}
      expandedSections={expandedSections}
      toggleSection={toggleSection}
      activeSection={activeSection}
    />
  );

  return {
    FormComponent,
    changes,
    changeValue,
    expandedSections,
    toggleSection,
    sectionRefs,
    activeSection,
  };
}
