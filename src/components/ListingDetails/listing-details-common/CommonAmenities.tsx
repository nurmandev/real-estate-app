const ammenities_data: string[] = [
  "A/C & Heating",
  "Garages",
  "Garden",
  "Disabled Access",
  "Swimming Pool",
  "Parking",
  "Wifi",
  "Pet Friendly",
  "Ceiling Height",
  "Fireplace",
  "Play Ground",
  "Elevator",
];

const CommonAmenities = ({ property }: any) => {
  const amenities = property?.amenities || [];

  return (
    <>
      <h4 className="mb-20">Amenities</h4>
      {amenities.length > 0 ? (
        <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
          {amenities.map((list: string, i: number) => (
            <li key={i}>{list}</li>
          ))}
        </ul>
      ) : (
        <p>No amenities listed.</p>
      )}
    </>
  );
};

export default CommonAmenities;
