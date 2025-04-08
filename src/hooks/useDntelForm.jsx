import { useRef, useState, useEffect } from "react";

export default function useDntelForm(initialData, id) {
  const sectionRefs = useRef({});
  const [changes, setChanges] = useState({});
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [lastChanged, setLastChanged] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const storageKey = `dntelFormData.${id}`;

  // ⬇️ Load saved state from localStorage
  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChanges(parsed.changes || {});
        setExpandedSections(parsed.expandedSections || []);
        setActiveSection(parsed.activeSection || null);
        setLastChanged(parsed.lastChanged || null);
        setEditMode(parsed.editMode || false);
      } catch (err) {
        console.warn("⚠️ Failed to parse saved form data:", err);
      }
    } else if (initialData?.sections) {
      setExpandedSections(Object.keys(initialData.sections));
    }
  }, [id, initialData]);

  // ⬇️ Save to localStorage on state change
  useEffect(() => {
    if (!id) return;
    const dataToSave = {
      changes,
      expandedSections,
      activeSection,
      lastChanged,
      editMode,
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));

    // Uncomment this for debugging:
    // console.log("📦 Saved to localStorage:", dataToSave);
  }, [id, changes, expandedSections, activeSection, lastChanged, editMode]);

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
    localStorage.removeItem(storageKey);
  };

  const clearLS = () => {
    localStorage.removeItem(storageKey);
  };

  const toggleEditMode = (enabled) => {
    setEditMode(enabled);
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey) && activeSection === sectionKey
        ? []
        : [sectionKey]
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
