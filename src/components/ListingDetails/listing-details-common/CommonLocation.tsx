const CommonLocation = ({ property }: any) => {
  const address = property?.address || property?.location || "Dubai, UAE";
  return (
    <>
      <h4 className="mb-40">Location</h4>
      <div className="bg-white shadow4 border-20 p-30">
        <div className="mb-20">
          <i className="bi bi-geo-alt"></i>{" "}
          <span className="fs-18">{address}</span>
        </div>
        <div className="map-banner overflow-hidden border-15">
          <div className="gmap_canvas h-100 w-100">
            <iframe
              src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(
                address,
              )}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-100 h-100"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonLocation;
