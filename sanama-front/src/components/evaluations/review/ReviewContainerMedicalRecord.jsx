"use client";
import React, { useState } from "react";
import useMedicalRecordForm from "@/hooks/useMedicalRecordForm";
import ReviewFormEvaluation from "./ReviewFormEvaluation";
import { toast } from "sonner";

const ReviewContainerMedicalRecord = ({ hojaMedicaData }) => {
  const { medicalRecordData, setMedicalRecordData, validateMedicalRecordForm } =
    useMedicalRecordForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-max w-full">
      <ReviewFormEvaluation hojaMedicaData={hojaMedicaData} />
      <div className="flex flex-row-reverse">
        <button
          onClick={handleSubmit}
          className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-l w-full sm:w-auto px-5 py-3 text-center"
        >
          Volver
        </button>
      </div>
    </form>
  );
};

export default ReviewContainerMedicalRecord;
