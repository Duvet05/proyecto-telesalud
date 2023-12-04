import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExplorationTab = ({ setMedicalRecordData }) => {
  const [visibleSections, setVisibleSections] = useState({
    exGeneral: false,
    pielYFaneras: false,
    cabezaYCuello: false,
    toraxYPulmones: false,
    cardiovascular: false,
    abdomen: false,
    urogenital: false,
    extremidades: false,
    snc: false,
  });

  const sectionNames = [
    "examenGeneral",
    "pielYFaneras",
    "cabezaYCuello",
    "toraxYPulmones",
    "cardiovascular",
    "abdomen",
    "urogenital",
    "extremidades",
    "snc",
  ];

  const handleOnBlurChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecordData((prevData) => {
      const sections = name.split(".");
      if (sections.length === 2) {
        const section = sections[1];
        return {
          ...prevData,
          evaluacionMedica: {
            ...prevData.evaluacionMedica,
            [section]: value,
          },
        };
      }
      return prevData;
    });
  };

  const toggleSectionVisibility = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderCheckbox = (label, section, key) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center ml-12 mb-2 "
      transition={{ duration: 0.2 }}
    >
      <input
        type="checkbox"
        checked={visibleSections[section]}
        onChange={() => toggleSectionVisibility(section)}
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </motion.div>
  );

  const renderTextArea = (label, name, section, key) => {
    if (!visibleSections[section]) return null;
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="flex col-span-2 ml-12"
      >
        <label
          htmlFor={name}
          className="block resize-none text-sm font-medium text-gray-700 w-1/6"
        >
          {label}
        </label>
        <span className="mr-4">:</span>
        <textarea
          id={name}
          name={`evaluacionMedica.${section}`}
          onBlur={handleOnBlurChange}
          className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={3}
        />
      </motion.div>
    );
  };

  return (
    <div className="ml-4 col-span-2">
      <h5 className="text-base font-medium text-gray-700 my-4">
        Añadir Exploración:
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {sectionNames.map((section) =>
          renderCheckbox(
            section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            section,
            `checkbox-${section}`
          )
        )}
      </div>
      <h5 className="text-base font-medium text-gray-700 mb-2">
        Exploraciones:
      </h5>
      <AnimatePresence>
        <div className="resize-none grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionNames.map((section) =>
            renderTextArea(
              section
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
              `evaluacionMedica.${section}`,
              section,
              `textarea-${section}`
            )
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ExplorationTab;
