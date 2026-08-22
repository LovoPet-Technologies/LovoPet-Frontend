import React from "react";
import { TextField, TextAreaField, CheckboxGroupField } from "./FormFields";

const COLLABORATION_TYPES = [
  "Online consultation",
  "Offline consultation",
  "Home visit",
  "Emergency support",
  "Animal welfare/rescue activities",
  "Educational/content collaboration",
  "Other",
];

export default function ProfessionalInfoStep({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#3D1E5C]">2. Professional Information</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="qualification"
          label="Qualification"
          required
          placeholder="e.g. B.V.Sc. & A.H."
          value={data.qualification}
          onChange={onChange}
          error={errors.qualification}
        />
        <TextField
          name="additionalQualification"
          label="Additional Qualification"
          value={data.additionalQualification}
          onChange={onChange}
          error={errors.additionalQualification}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="yearOfPassing"
          label="Year of Passing"
          required
          type="number"
          value={data.yearOfPassing}
          onChange={onChange}
          error={errors.yearOfPassing}
        />
        <TextField
          name="yearsOfExperience"
          label="Years of Experience"
          required
          type="number"
          value={data.yearsOfExperience}
          onChange={onChange}
          error={errors.yearsOfExperience}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="stateVeterinaryCouncil"
          label="State Veterinary Council"
          required
          value={data.stateVeterinaryCouncil}
          onChange={onChange}
          error={errors.stateVeterinaryCouncil}
        />
        <TextField
          name="registrationNumber"
          label="Registration Number"
          required
          value={data.registrationNumber}
          onChange={onChange}
          error={errors.registrationNumber}
        />
      </div>

      <TextField
        name="yearOfRegistration"
        label="Year of Registration"
        required
        type="number"
        value={data.yearOfRegistration}
        onChange={onChange}
        error={errors.yearOfRegistration}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="clinicName"
          label="Clinic/Hospital Name"
          value={data.clinicName}
          onChange={onChange}
          error={errors.clinicName}
        />
        <TextField
          name="currentRole"
          label="Current Role"
          value={data.currentRole}
          onChange={onChange}
          error={errors.currentRole}
        />
      </div>

      <TextAreaField
        name="collaborationReason"
        label="Why are you interested in collaborating with LovoPet?"
        value={data.collaborationReason}
        onChange={onChange}
        error={errors.collaborationReason}
      />

      <CheckboxGroupField
        name="collaborationTypes"
        label="Type of collaboration you're interested in"
        required
        values={data.collaborationTypes}
        onChange={onChange}
        options={COLLABORATION_TYPES}
        error={errors.collaborationTypes}
      />
    </div>
  );
}
