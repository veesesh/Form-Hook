import React from "react";
import formData from "./data/formData.json";
import useDntelForm from "./hooks/useDntelForm";
console.log("formData:", formData);

function App() {
  const { FormComponent } = useDntelForm(formData);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Form you wanted </h1>
      <FormComponent />
    </div>
  );
}

export default App;
