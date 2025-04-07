import React from "react";

export default function DntelFormRenderer({
  initialData,
  sectionRefs,
  changes,
  changeValue,
  expandedSections,
  toggleSection,
}) {
  if (!initialData || !initialData.sections) {
    return (
      <div className="text-red-600">⚠️ No sections found in initialData</div>
    );
  }

  const sectionEntries = Object.entries(initialData.sections).sort(
    ([, a], [, b]) => a.order - b.order
  );

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sectionEntries.map(([sectionKey, section]) => {
        const isExpanded = expandedSections.includes(sectionKey);
        const filledFields = Object.entries(section.fields).filter(
          ([, field]) => changes[field.key]
        ).length;

        const totalFields = Object.keys(section.fields).length;

        return (
          <div
            key={sectionKey}
            ref={(el) => (sectionRefs.current[sectionKey] = el)}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(sectionKey)}
            >
              <h2 className="text-lg font-semibold text-green-700">
                {section.title} ({filledFields}/{totalFields})
              </h2>
              <span className="text-gray-500">{isExpanded ? "🔽" : "▶️"}</span>
            </div>

            {isExpanded && (
              <div className="mt-4 space-y-4">
                {Object.entries(section.fields).map(([fieldKey, field]) => {
                  const value = changes[field.key] ?? "";

                  return (
                    <div key={field.key}>
                      <label
                        htmlFor={field.key}
                        className="block text-sm font-medium text-gray-600"
                      >
                        {field.title}
                      </label>
                      <input
                        id={field.key}
                        type="text"
                        value={value}
                        placeholder={field.placeholder || ""}
                        onChange={(e) => changeValue(field.key, e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
}
