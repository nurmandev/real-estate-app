"use client";
import { useState } from "react";
import Wrapper from "@/layouts/Wrapper";
import HeaderTwo from "@/layouts/headers/HeaderTwo";
import FooterFour from "@/layouts/footers/FooterFour";
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo";

const KYCOnboarding = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    residentialAddress: "",
  });
  const [files, setFiles] = useState({
    passport: null,
    emiratesId: null,
    supporting: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any, type: string) => {
    setFiles((prev) => ({ ...prev, [type]: e.target.files[0] }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    console.log("KYC Data:", formData, files);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Wrapper>
        <HeaderTwo style_1={true} style_2={false} />
        <BreadcrumbTwo title="KYC Confirmation" sub_title="KYC Onboarding" />
        <div className="container mt-150 mb-150 text-center">
          <div className="row">
            <div className="col-xl-6 m-auto">
              <i
                className="bi bi-check-circle"
                style={{ fontSize: "80px", color: "#28a745" }}
              ></i>
              <h2 className="mt-4">Submission Successful</h2>
              <p className="fs-20 mt-3">
                We have received your KYC documents. Our team will review them
                and get back to you shortly. A confirmation email has been sent
                to {formData.email}.
              </p>
              <button
                className="btn-five mt-30"
                onClick={() => setSubmitted(false)}
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
        <FooterFour />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <HeaderTwo style_1={true} style_2={false} />
      <BreadcrumbTwo title="Client Onboarding" sub_title="KYC Verification" />
      <div className="container mt-150 mb-150">
        <div className="row">
          <div className="col-xl-8 m-auto">
            <div className="form-style-one wow fadeInUp">
              <div className="title-one mb-40 text-center">
                <h2>KYC Verification Form</h2>
                <p className="fs-20">
                  Please provide the required details and documents for secure
                  onboarding.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded shadow-sm"
              >
                <div className="row">
                  <div className="col-md-6 mb-20">
                    <label className="form-label fw-500">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="As per passport"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-20">
                    <label className="form-label fw-500">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-20">
                    <label className="form-label fw-500">
                      Phone Number (with Country Code) *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="+971 58 825 1088"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-20">
                    <label className="form-label fw-500">Nationality *</label>
                    <input
                      type="text"
                      name="nationality"
                      required
                      placeholder="Your Country"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 mb-20">
                    <label className="form-label fw-500">
                      Residential Address *
                    </label>
                    <textarea
                      name="residentialAddress"
                      required
                      placeholder="Full Residential Address"
                      className="form-control"
                      style={{ height: "100px" }}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="col-md-6 mb-30">
                    <label className="form-label fw-500">
                      Passport Upload *
                    </label>
                    <input
                      type="file"
                      required
                      className="form-control"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "passport")}
                    />
                    <small className="text-muted">
                      Clear image or PDF of the main page.
                    </small>
                  </div>
                  <div className="col-md-6 mb-30">
                    <label className="form-label fw-500">
                      Emirates ID (if applicable)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "emiratesId")}
                    />
                    <small className="text-muted">
                      Front and back combined or separate files.
                    </small>
                  </div>
                  <div className="col-12 mb-40">
                    <label className="form-label fw-500">
                      Supporting Documents
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "supporting")}
                    />
                    <small className="text-muted">
                      Marriage certificate, utility bills, etc.
                    </small>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn-five w-100">
                      SUBMIT KYC DOCUMENTS
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FooterFour />
    </Wrapper>
  );
};

export default KYCOnboarding;
