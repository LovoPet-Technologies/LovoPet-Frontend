import React, { useState } from "react";
import FormStepper from "./FormStepper";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalInfoStep from "./ProfessionalInfoStep";
import ClinicalInfoStep from "./ClinicalInfoStep";
import DocumentsStep from "./DocumentsStep";
import ReviewStep from "./ReviewStep";

const TOTAL_STEPS = 5;

const INITIAL_DATA = {
  // Personal Information
  fullName: "",
  gender: "",
  dateOfBirth: "",
  mobileNumber: "",
  email: "",
  languagesSpoken: "",
  city: "",
  state: "",
  pinCode: "",
  address: "",
  // Professional Information
  qualification: "",
  additionalQualification: "",
  yearOfPassing: "",
  stateVeterinaryCouncil: "",
  registrationNumber: "",
  yearOfRegistration: "",
  yearsOfExperience: "",
  clinicName: "",
  currentRole: "",
  collaborationReason: "",
  collaborationTypes: [],
  // Clinical Information
  primaryCategory: "",
  areasOfSpecialization: "",
  speciesTreated: "",
  servicesOffered: "",
  onlineConsultationFee: "",
  homeVisitFee: "",
  preferredConsultationDuration: "",
  preferredConsultationTime: "",
  consultationsCapacity: "",
  // Documents
  governmentIdProof: null,
  degreeCertificate: null,
  internshipCertificate: null,
  councilRegistrationCertificate: null,
  passportPhoto: null,
  additionalQualificationCertificate: null,
  clinicRegistrationCertificate: null,
};

const REQUIRED_FIELDS_BY_STEP = {
  1: ["fullName", "mobileNumber", "email", "languagesSpoken", "city", "state", "pinCode", "address"],
  2: [
    "qualification",
    "yearOfPassing",
    "stateVeterinaryCouncil",
    "registrationNumber",
    "yearOfRegistration",
    "yearsOfExperience",
    "collaborationTypes",
  ],
  3: [
    "primaryCategory",
    "areasOfSpecialization",
    "speciesTreated",
    "servicesOffered",
    "onlineConsultationFee",
    "homeVisitFee",
    "preferredConsultationDuration",
    "preferredConsultationTime",
    "consultationsCapacity",
  ],
  4: [
    "governmentIdProof",
    "degreeCertificate",
    "internshipCertificate",
    "councilRegistrationCertificate",
    "passportPhoto",
  ],
};

function validateStep(step, data) {
  const errors = {};
  const requiredFields = REQUIRED_FIELDS_BY_STEP[step] || [];

  requiredFields.forEach((field) => {
    const value = data[field];
    const isEmpty = Array.isArray(value) ? value.length === 0 : !value;
    if (isEmpty) {
      errors[field] = "This field is required.";
    }
  });

  if (step === 1 && data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (step === 1 && data.mobileNumber && !/^\d{10}$/.test(data.mobileNumber)) {
    errors.mobileNumber = "Enter a valid 10-digit mobile number.";
  }
  if (step === 1 && data.pinCode && !/^\d{6}$/.test(data.pinCode)) {
    errors.pinCode = "Enter a valid 6-digit PIN code.";
  }

  return errors;
}

const FILE_FIELDS = [
  "governmentIdProof",
  "degreeCertificate",
  "internshipCertificate",
  "councilRegistrationCertificate",
  "passportPhoto",
  "additionalQualificationCertificate",
  "clinicRegistrationCertificate",
];

function buildFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (FILE_FIELDS.includes(key)) {
      if (value) formData.append(key, value);
      return;
    }
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return formData;
}

export default function VeterinarianApplicationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setErrors({ agreement: "You must agree to the Terms & Conditions and Privacy Policy." });
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = buildFormData(data);

      const response = await fetch("/api/veterinarians/applications/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#8B9A5B]/25 bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B9A5B]/15 text-2xl text-[#8B9A5B]">
          ✓
        </div>
        <h2 className="text-lg font-semibold text-[#3D1E5C]">Application Submitted</h2>
        <p className="mt-2 text-sm text-[#3D1E5C]/70">
          Thank you for applying to collaborate with LovoPet. Our team will review
          your application and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#3D1E5C]/10 bg-white p-6 sm:p-8">
      <FormStepper currentStep={step} />

      {step === 1 && (
        <PersonalInfoStep data={data} onChange={handleFieldChange} errors={errors} />
      )}
      {step === 2 && (
        <ProfessionalInfoStep data={data} onChange={handleFieldChange} errors={errors} />
      )}
      {step === 3 && (
        <ClinicalInfoStep data={data} onChange={handleFieldChange} errors={errors} />
      )}
      {step === 4 && (
        <DocumentsStep data={data} onChange={handleFieldChange} errors={errors} />
      )}
      {step === 5 && (
        <ReviewStep
          data={data}
          agreed={agreed}
          onAgreedChange={setAgreed}
          error={errors.agreement}
        />
      )}

      {submitError && (
        <p className="mt-4 text-sm text-red-500">{submitError}</p>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-[#3D1E5C]/10 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || submitting}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#3D1E5C]/60 hover:text-[#3D1E5C] disabled:cursor-not-allowed disabled:opacity-0"
        >
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-[#E8752E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E8752E]/90"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-[#E8752E] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E8752E]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}
