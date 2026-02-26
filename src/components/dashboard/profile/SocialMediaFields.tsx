import React from "react";

interface SocialMediaFieldsProps {
  facebook: string;
  setFacebook: (val: string) => void;
  twitter: string;
  setTwitter: (val: string) => void;
  instagram: string;
  setInstagram: (val: string) => void;
  linkedin: string;
  setLinkedin: (val: string) => void;
}

const SocialMediaFields: React.FC<SocialMediaFieldsProps> = ({
  facebook,
  setFacebook,
  twitter,
  setTwitter,
  instagram,
  setInstagram,
  linkedin,
  setLinkedin,
}) => {
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Social Media</h4>

      <div className="dash-input-wrapper mb-20">
        <label htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          type="text"
          placeholder="https://www.facebook.com/yourprofile"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </div>
      <div className="dash-input-wrapper mb-20">
        <label htmlFor="twitter">Twitter (X)</label>
        <input
          id="twitter"
          type="text"
          placeholder="https://twitter.com/yourhandle"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <div className="dash-input-wrapper mb-20">
        <label htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          type="text"
          placeholder="https://instagram.com/yourhandle"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>
      <div className="dash-input-wrapper mb-20">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          id="linkedin"
          type="text"
          placeholder="https://linkedin.com/in/yourprofile"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SocialMediaFields;
