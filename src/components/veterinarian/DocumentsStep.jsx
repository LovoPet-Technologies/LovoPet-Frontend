import React from "react";
import { FileField } from "./FormFields";

export default function DocumentsStep({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#3D1E5C]">4. Documents Upload</h2>
      <p className="-mt-2 text-xs text-[#3D1E5C]/50">
        Accepted formats: PDF, JPG, PNG. Max 5 MB per file.
      </p>

      <FileField
        name="governmentIdProof"
        label="Government ID Proof"
        required
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.governmentIdProof?.name}
        onChange={onChange}
        error={errors.governmentIdProof}
      />

      <FileField
        name="degreeCertificate"
        label="B.V.Sc. Degree Certificate"
        required
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.degreeCertificate?.name}
        onChange={onChange}
        error={errors.degreeCertificate}
      />

      <FileField
        name="internshipCertificate"
        label="Internship Completion Certificate"
        required
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.internshipCertificate?.name}
        onChange={onChange}
        error={errors.internshipCertificate}
      />

      <FileField
        name="councilRegistrationCertificate"
        label="State Veterinary Council Registration Certificate"
        required
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.councilRegistrationCertificate?.name}
        onChange={onChange}
        error={errors.councilRegistrationCertificate}
      />

      <FileField
        name="passportPhoto"
        label="Recent Passport-size Photo"
        required
        accept=".jpg,.jpeg,.png"
        fileName={data.passportPhoto?.name}
        onChange={onChange}
        error={errors.passportPhoto}
      />

      <FileField
        name="additionalQualificationCertificate"
        label="Additional Qualification Certificate"
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.additionalQualificationCertificate?.name}
        onChange={onChange}
        error={errors.additionalQualificationCertificate}
      />

      <FileField
        name="clinicRegistrationCertificate"
        label="Clinic Registration Certificate (if applicable)"
        accept=".pdf,.jpg,.jpeg,.png"
        fileName={data.clinicRegistrationCertificate?.name}
        onChange={onChange}
        error={errors.clinicRegistrationCertificate}
      />
    </div>
  );
}
