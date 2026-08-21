import React from "react";

function SummaryRow({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-[#3D1E5C]/50">{label}</span>
      <span className="text-right font-medium text-[#3D1E5C]">
        {Array.isArray(value) ? value.join(", ") : String(value)}
      </span>
    </div>
  );
}

export default function ReviewStep({ data, agreed, onAgreedChange, error }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[#3D1E5C]">5. Review &amp; Submit</h2>

      <div className="rounded-xl border border-[#3D1E5C]/10 bg-white p-4">
        <SummaryRow label="Full Name" value={data.fullName} />
        <SummaryRow label="Mobile Number" value={data.mobileNumber} />
        <SummaryRow label="Email" value={data.email} />
        <SummaryRow label="City, State" value={[data.city, data.state].filter(Boolean).join(", ")} />
        <SummaryRow label="Qualification" value={data.qualification} />
        <SummaryRow label="Registration Number" value={data.registrationNumber} />
        <SummaryRow label="Years of Experience" value={data.yearsOfExperience} />
        <SummaryRow label="Collaboration Types" value={data.collaborationTypes} />
        <SummaryRow label="Primary Category" value={data.primaryCategory} />
        <SummaryRow label="Species Treated" value={data.speciesTreated} />
        <SummaryRow label="Online Consultation Fee" value={data.onlineConsultationFee} />
      </div>

      <div className="rounded-xl bg-[#3D1E5C]/5 p-4 text-sm leading-relaxed text-[#3D1E5C]/80">
        <p className="mb-2 font-medium text-[#3D1E5C]">Declaration:</p>
        <p>
          I hereby declare that the information and documents provided by me are
          true and accurate to the best of my knowledge. I understand that LovoPet
          may verify my professional qualifications, registration and submitted
          documents before approving my application.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[#3D1E5C]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[#3D1E5C]/30 text-[#E8752E] focus:ring-[#E8752E]/40"
        />
        <span>
          I agree to LovoPet&apos;s{" "}
          <a href="/terms" className="text-[#E8752E] underline underline-offset-2">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[#E8752E] underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
