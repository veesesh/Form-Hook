import { useRef, useState, useEffect } from "react";

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
    setActiveSection(sectionKey);
  };

  return {
    sectionRefs,
    changes,
    changeValue,
    expandedSections,
    toggleSection,
    activeSection,
  };
}
