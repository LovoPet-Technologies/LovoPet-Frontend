import React from "react";
import { TextField, SelectField } from "./FormFields";

export default function PersonalInfoStep({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#3D1E5C]">1. Personal Information</h2>

      <TextField
        name="fullName"
        label="Full Name"
        required
        value={data.fullName}
        onChange={onChange}
        error={errors.fullName}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          name="gender"
          label="Gender"
          value={data.gender}
          onChange={onChange}
          options={["Male", "Female", "Other", "Prefer not to say"]}
          error={errors.gender}
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth}
          onChange={onChange}
          error={errors.dateOfBirth}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="mobileNumber"
          label="Mobile Number"
          required
          type="tel"
          value={data.mobileNumber}
          onChange={onChange}
          error={errors.mobileNumber}
        />
        <TextField
          name="email"
          label="Email Address"
          required
          type="email"
          value={data.email}
          onChange={onChange}
          error={errors.email}
        />
      </div>

      <TextField
        name="languagesSpoken"
        label="Languages Spoken"
        required
        placeholder="e.g. English, Hindi, Bengali"
        value={data.languagesSpoken}
        onChange={onChange}
        error={errors.languagesSpoken}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <TextField
          name="city"
          label="City"
          required
          value={data.city}
          onChange={onChange}
          error={errors.city}
        />
        <TextField
          name="state"
          label="State"
          required
          value={data.state}
          onChange={onChange}
          error={errors.state}
        />
        <TextField
          name="pinCode"
          label="PIN Code"
          required
          value={data.pinCode}
          onChange={onChange}
          error={errors.pinCode}
        />
      </div>

      <TextField
        name="address"
        label="Address"
        required
        value={data.address}
        onChange={onChange}
        error={errors.address}
      />
    </div>
  );
}
