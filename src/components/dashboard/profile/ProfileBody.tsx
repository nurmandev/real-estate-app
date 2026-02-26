"use client";
import { useState, useEffect } from "react";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";
import Image from "next/image";
import UserAvatarSetting from "./UserAvatarSetting";
import AddressAndLocation from "./AddressAndLocation";
import Link from "next/link";
import SocialMediaFields from "./SocialMediaFields";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

import avatar_1 from "@/assets/images/dashboard/avatar_02.jpg";

const ProfileBody = () => {
  // Core user data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");

  // Social handles
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Address fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get("/api/auth/profile");

        setName(data.name || "");
        setEmail(data.email || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhoneNumber(data.phoneNumber || "");
        setAbout(data.about || "");

        // Socials
        if (data.socials) {
          setFacebook(data.socials.facebook || "");
          setTwitter(data.socials.twitter || "");
          setInstagram(data.socials.instagram || "");
          setLinkedin(data.socials.linkedin || "");
        }

        // Address
        if (data.address) {
          setAddress(data.address.street || "");
          setCity(data.address.city || "");
          setState(data.address.state || "");
          setZipCode(data.address.zipCode || "");
          setCountry(data.address.country || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await api.put("/api/auth/profile", {
        firstName,
        lastName,
        phoneNumber,
        about,
        socials: {
          facebook,
          twitter,
          instagram,
          linkedin,
        },
        address: {
          street: address,
          city,
          state,
          zipCode,
          country,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div
        className="dashboard-body d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeaderTwo title="Profile" />
        <h2 className="main-title d-block d-lg-none">Profile</h2>

        <div className="bg-white card-box border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image src={avatar_1} alt="" className="lazy-img user-img" />
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input
                type="file"
                id="uploadImg"
                name="uploadImg"
                placeholder=""
              />
            </div>
            <button className="delete-btn tran3s">Delete</button>
          </div>

          <UserAvatarSetting
            name={name}
            email={email}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            about={about}
            setAbout={setAbout}
          />
        </div>

        <SocialMediaFields
          facebook={facebook}
          setFacebook={setFacebook}
          twitter={twitter}
          setTwitter={setTwitter}
          instagram={instagram}
          setInstagram={setInstagram}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
        />

        <AddressAndLocation
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zipCode={zipCode}
          setZipCode={setZipCode}
          country={country}
          setCountry={setCountry}
        />

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button className="dash-btn-two tran3s me-3" onClick={handleSave}>
            Save
          </button>
          <Link href="#" className="dash-cancel-btn tran3s">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
