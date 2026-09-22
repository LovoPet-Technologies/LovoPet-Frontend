import React, { useState } from "react";

const TOTAL_STEPS = 5;

const BUSINESS_TYPES = [
  "Manufacturer",
  "Distributor",
  "Wholesaler",
  "Retailer",
  "Importer",
];

const PRODUCT_CATEGORIES = [
  "Pet Food",
  "Pet Supplements",
  "Pet Accessories",
  "Grooming Products",
  "Veterinary Supplies",
  "Pet Toys",
  "Others",
];

const INITIAL_DATA = {
  // 1. Business Information
  businessName: "",
  businessTypes: [],
  yearEstablished: "",
  gstNumber: "",
  panNumber: "",
  cinNumber: "",
  registeredAddress: "",
  // 2. Primary Contact Details
  contactPersonName: "",
  mobileNumber: "",
  email: "",
  alternateContactNumber: "",
  // 3. Product Information
  productCategories: [],
  brandsSold: "",
  numberOfSkus: "",
  productCertifications: null,
  // 4. Operations & Fulfillment
  serviceableRegions: "",
  warehouseLocations: "",
  averageProcessingTime: "",
  supportsBulkOrders: "",
  // 5. Quality & Compliance
  fssaiLicense: null,
  manufacturingLicense: null,
  isoCertifications: null,
};

const REQUIRED_FIELDS_BY_STEP = {
  1: [
    "businessName",
    "businessTypes",
    "gstNumber",
    "panNumber",
    "registeredAddress",
  ],
  2: ["contactPersonName", "mobileNumber", "email"],
  3: ["productCategories", "numberOfSkus"],
  4: ["serviceableRegions", "averageProcessingTime", "supportsBulkOrders"],
  5: [],
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

  if (step === 2 && data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (step === 2 && data.mobileNumber && !/^\d{10}$/.test(data.mobileNumber)) {
    errors.mobileNumber = "Enter a valid 10-digit mobile number.";
  }

  return errors;
}

const FILE_FIELDS = [
  "productCertifications",
  "fssaiLicense",
  "manufacturingLicense",
  "isoCertifications",
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

export default function VendorApplicationPage() {
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

  const handleCheckboxArray = (name, option) => {
    const currentList = data[name] || [];
    const updated = currentList.includes(option)
      ? currentList.filter((item) => item !== option)
      : [...currentList, option];
    handleFieldChange(name, updated);
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
      setErrors({
        agreement:
          "You must declare authenticity and agree to marketplace terms.",
      });
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = buildFormData(data);
      const API_URL = import.meta.env.VITE_API_URL || "";

      const response = await fetch(`${API_URL}/api/vendors/applications/`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.message || "Submission failed. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    "Business",
    "Contact",
    "Products",
    "Operations",
    "Compliance & Review",
  ];

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-15">
      <header className="border-b border-[#E8752E]/20 bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-15">
          <h1 className="text-2xl font-bold text-[#3D1E5C]">
            Join LovoPet as a Vendor
          </h1>
          <p className="mt-1 text-sm text-[#3D1E5C]/70">
            Submit your business and product details to register as a partner.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-xl border border-[#3D1E5C]/10 bg-white p-6 sm:p-8">
          {/* Stepper Header */}
          <div className="mb-8 flex items-center">
            {stepLabels.map((label, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === step;
              const isDone = stepNum < step;

              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isDone
                          ? "bg-[#E8752E] text-white"
                          : isActive
                            ? "border-2 border-[#E8752E] text-[#E8752E]"
                            : "border-2 border-[#3D1E5C]/15 text-[#3D1E5C]/40"
                      }`}
                    >
                      {isDone ? "✓" : stepNum}
                    </div>
                    <span
                      className={`hidden text-xs sm:block ${
                        isActive
                          ? "font-medium text-[#3D1E5C]"
                          : "text-[#3D1E5C]/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {stepNum !== stepLabels.length && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        isDone ? "bg-[#E8752E]" : "bg-[#3D1E5C]/10"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {submitted ? (
            <div className="rounded-xl border border-[#8B9A5B]/25 bg-white py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B9A5B]/15 text-2xl text-[#8B9A5B]">
                ✓
              </div>
              <h2 className="text-lg font-semibold text-[#3D1E5C]">
                Application Submitted
              </h2>
              <p className="mt-2 text-sm text-[#3D1E5C]/70">
                Thank you for applying to sell on LovoPet. Our onboarding team
                will review your details and contact you shortly.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: Business Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-[#3D1E5C]">
                    1. Business Information
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Business/Company Name *
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.businessName}
                      onChange={(e) =>
                        handleFieldChange("businessName", e.target.value)
                      }
                    />
                    {errors.businessName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C] mb-2">
                      Business Type (Select multiple) *
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {BUSINESS_TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 text-sm text-[#3D1E5C]/80"
                        >
                          <input
                            type="checkbox"
                            checked={data.businessTypes.includes(type)}
                            onChange={() =>
                              handleCheckboxArray("businessTypes", type)
                            }
                            className="rounded border-gray-300 text-[#E8752E] focus:ring-[#E8752E]"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.businessTypes && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.businessTypes}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Year Established
                      </label>
                      <input
                        type="number"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.yearEstablished}
                        onChange={(e) =>
                          handleFieldChange("yearEstablished", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        GST Number *
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.gstNumber}
                        onChange={(e) =>
                          handleFieldChange("gstNumber", e.target.value)
                        }
                      />
                      {errors.gstNumber && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.gstNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        PAN Number *
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.panNumber}
                        onChange={(e) =>
                          handleFieldChange("panNumber", e.target.value)
                        }
                      />
                      {errors.panNumber && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.panNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        CIN/Registration Number (if applicable)
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.cinNumber}
                        onChange={(e) =>
                          handleFieldChange("cinNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Registered Business Address *
                    </label>
                    <textarea
                      rows={3}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.registeredAddress}
                      onChange={(e) =>
                        handleFieldChange("registeredAddress", e.target.value)
                      }
                    />
                    {errors.registeredAddress && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.registeredAddress}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Primary Contact Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-[#3D1E5C]">
                    2. Primary Contact Details
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.contactPersonName}
                      onChange={(e) =>
                        handleFieldChange("contactPersonName", e.target.value)
                      }
                    />
                    {errors.contactPersonName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.contactPersonName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.mobileNumber}
                        onChange={(e) =>
                          handleFieldChange("mobileNumber", e.target.value)
                        }
                      />
                      {errors.mobileNumber && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Alternate Contact Number
                    </label>
                    <input
                      type="tel"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.alternateContactNumber}
                      onChange={(e) =>
                        handleFieldChange(
                          "alternateContactNumber",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Product Information */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-[#3D1E5C]">
                    3. Product Information
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C] mb-2">
                      Product Categories Offered *
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center space-x-2 text-sm text-[#3D1E5C]/80"
                        >
                          <input
                            type="checkbox"
                            checked={data.productCategories.includes(cat)}
                            onChange={() =>
                              handleCheckboxArray("productCategories", cat)
                            }
                            className="rounded border-gray-300 text-[#E8752E] focus:ring-[#E8752E]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                    {errors.productCategories && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.productCategories}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Brand(s) Sold (e.g. Drools, Pedigree)
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.brandsSold}
                        onChange={(e) =>
                          handleFieldChange("brandsSold", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Number of SKUs Available *
                      </label>
                      <input
                        type="number"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.numberOfSkus}
                        onChange={(e) =>
                          handleFieldChange("numberOfSkus", e.target.value)
                        }
                      />
                      {errors.numberOfSkus && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.numberOfSkus}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Product Certifications (if applicable)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={(e) =>
                        handleFieldChange(
                          "productCertifications",
                          e.target.files[0],
                        )
                      }
                      className="mt-1 text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#E8752E]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#E8752E] hover:file:bg-[#E8752E]/20"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Operations & Fulfillment */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-[#3D1E5C]">
                    4. Operations & Fulfillment
                  </h2>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Serviceable Regions/States *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pan-India, Maharashtra, Delhi NCR"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.serviceableRegions}
                      onChange={(e) =>
                        handleFieldChange("serviceableRegions", e.target.value)
                      }
                    />
                    {errors.serviceableRegions && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.serviceableRegions}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3D1E5C]">
                      Warehouse / Shop Location(s)
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                      value={data.warehouseLocations}
                      onChange={(e) =>
                        handleFieldChange("warehouseLocations", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Average Order Processing Time *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 24 hours, 2 days"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.averageProcessingTime}
                        onChange={(e) =>
                          handleFieldChange(
                            "averageProcessingTime",
                            e.target.value,
                          )
                        }
                      />
                      {errors.averageProcessingTime && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.averageProcessingTime}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Do you support bulk orders? *
                      </label>
                      <select
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#E8752E] focus:outline-none"
                        value={data.supportsBulkOrders}
                        onChange={(e) =>
                          handleFieldChange(
                            "supportsBulkOrders",
                            e.target.value,
                          )
                        }
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.supportsBulkOrders && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.supportsBulkOrders}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Quality, Compliance & Declaration */}
              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-[#3D1E5C]">
                    5. Quality, Compliance & Declaration
                  </h2>

                  <div className="space-y-4 rounded-lg border border-[#3D1E5C]/10 bg-[#FDF6EC]/40 p-4">
                    <h3 className="text-sm font-semibold text-[#3D1E5C]">
                      Document Uploads (Optional/If applicable)
                    </h3>

                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        FSSAI License (for food/supplements)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          handleFieldChange("fssaiLicense", e.target.files[0])
                        }
                        className="mt-1 text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#E8752E]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#E8752E] hover:file:bg-[#E8752E]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        Manufacturing License
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          handleFieldChange(
                            "manufacturingLicense",
                            e.target.files[0],
                          )
                        }
                        className="mt-1 text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#E8752E]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#E8752E] hover:file:bg-[#E8752E]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#3D1E5C]">
                        ISO / Other Certifications
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) =>
                          handleFieldChange(
                            "isoCertifications",
                            e.target.files[0],
                          )
                        }
                        className="mt-1 text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#E8752E]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#E8752E] hover:file:bg-[#E8752E]/20"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-[#E8752E] focus:ring-[#E8752E]"
                      />
                      <span className="text-xs text-[#3D1E5C]/80">
                        I hereby declare that the products sold are authentic. I
                        agree to the marketplace terms and conditions and
                        consent to the processing of business data by LovoPet.
                      </span>
                    </label>
                    {errors.agreement && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.agreement}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {submitError && (
                <p className="mt-4 text-sm text-red-500">{submitError}</p>
              )}

              {/* Navigation Actions */}
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
                    {submitting ? "Submitting..." : "Submit Registration"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
