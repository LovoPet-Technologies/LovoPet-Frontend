import React from "react";
import { TextField, SelectField } from "./FormFields";

export default function ClinicalInfoStep({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#3D1E5C]">3. Clinical Information</h2>

      <TextField
        name="primaryCategory"
        label="Primary Category of Practice"
        required
        placeholder="e.g. Small Animal, Large Animal, Exotic"
        value={data.primaryCategory}
        onChange={onChange}
        error={errors.primaryCategory}
      />

      <TextField
        name="areasOfSpecialization"
        label="Areas of Specialization"
        required
        placeholder="e.g. Dermatology, Surgery, Nutrition"
        value={data.areasOfSpecialization}
        onChange={onChange}
        error={errors.areasOfSpecialization}
      />

      <TextField
        name="speciesTreated"
        label="Species Treated"
        required
        placeholder="e.g. Dogs, Cats, Birds"
        value={data.speciesTreated}
        onChange={onChange}
        error={errors.speciesTreated}
      />

      <TextField
        name="servicesOffered"
        label="Services Offered"
        required
        placeholder="e.g. Vaccination, Surgery, Grooming advice"
        value={data.servicesOffered}
        onChange={onChange}
        error={errors.servicesOffered}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          name="onlineConsultationFee"
          label="Online Consultation Fee"
          required
          type="number"
          value={data.onlineConsultationFee}
          onChange={onChange}
          error={errors.onlineConsultationFee}
        />
        <TextField
          name="homeVisitFee"
          label="Home Visit Fee"
          required
          type="number"
          value={data.homeVisitFee}
          onChange={onChange}
          error={errors.homeVisitFee}
        />
      </div>

      <SelectField
        name="preferredConsultationDuration"
        label="Preferred Consultation Duration"
        required
        value={data.preferredConsultationDuration}
        onChange={onChange}
        options={["15 minutes", "20 minutes", "30 minutes", "45 minutes", "60 minutes"]}
        error={errors.preferredConsultationDuration}
      />

      <TextField
        name="preferredConsultationTime"
        label="Preferred Consultation Days/Time"
        required
        placeholder="e.g. Mon–Fri, 6 PM – 9 PM"
        value={data.preferredConsultationTime}
        onChange={onChange}
        error={errors.preferredConsultationTime}
      />

      <TextField
        name="consultationsCapacity"
        label="Approx. number of online consultations you can take per day/week"
        required
        value={data.consultationsCapacity}
        onChange={onChange}
        error={errors.consultationsCapacity}
      />
    </div>
  );
}
