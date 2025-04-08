import { useRef, useState, useEffect } from "react";

export default function useDntelForm(initialData) {
  const sectionRefs = useRef({});
  const [changes, setChanges] = useState({});
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [lastChanged, setLastChanged] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
    setLastChanged(Date.now());
  };

  const expandAll = () => {
    if (initialData?.sections) {
      setExpandedSections(Object.keys(initialData.sections));
    }
  };
  const collapseAll = () => {
    setExpandedSections([]);
  };
  const expandSection = (id) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveSection(id);
  };
  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };
  const reset = () => {
    setChanges({});
    setLastChanged(null);
    setActiveSection(null);
    setExpandedSections([]);
    setEditMode(false);
  };
  const clearLS = () => {
    localStorage.removeItem("dntelFormData"); // or "dntelFormData.{id}" if you have multiple
  };
  // Already built-in because `setEditMode` is exposed directly
  // You can also wrap it:
  const toggleEditMode = (enabled) => {
    setEditMode(enabled);
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections(
      (prev) =>
        prev.includes(sectionKey) && activeSection === sectionKey
          ? [] // Collapse if already active
          : [sectionKey] // Expand only this one
    );

    setActiveSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  return {
    changes,
    activeSection,
    expandedSections,
    lastChanged,
    editMode,
    setEditMode,
    changeValue,
    expandAll,
    collapseAll,
    scrollToSection,
    expandSection,
    reset,
    clearLS,
    toggleSection,
    toggleEditMode,

    sectionRefs,
  };
}
