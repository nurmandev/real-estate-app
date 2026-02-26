const CommonPropertyFeatureList = ({ property }: any) => {
  if (!property) return null;

  const feature_list = [
    {
      id: 1,
      title: "Property Details",
      feature_list: [
        { title: "Property ID", count: property.id || property._id },
        {
          title: "Price",
          count: `AED ${Number(property.price).toLocaleString()}`,
        },
        {
          title: "Property Size",
          count: `${property.property_info?.sqft || property.area} sqft`,
        },
        { title: "Year Built", count: property.yearBuilt || "2023" },
        {
          title: "Bedrooms",
          count: property.property_info?.bed || property.bedrooms,
        },
        {
          title: "Bathrooms",
          count: property.property_info?.bath || property.bathrooms,
        },
      ],
    },
    {
      id: 2,
      title: "Additional Details",
      feature_list: [
        { title: "Garages", count: property.garages || 0 },
        { title: "Garage Size", count: property.garageSize || "0 sqft" },
        { title: "Floors No", count: property.floorsNo || 1 },
        { title: "Property Type", count: property.type },
        { title: "Property Status", count: property.status },
      ],
    },
  ];

  return (
    <div className="accordion" id="accordionTwo">
      {feature_list.map((item) => (
        <div key={item.id} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${item.id === 1 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
              aria-expanded={item.id === 1 ? "true" : "false"}
              aria-controls={`collapse${item.id}`}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`}
            data-bs-parent="#accordionTwo"
          >
            <div className="accordion-body">
              <div className="feature-list-two">
                <ul className="style-none d-flex flex-wrap justify-content-between">
                  {item.feature_list.map((list, i) => (
                    <li key={i}>
                      <span>{list.title} </span>{" "}
                      <span className="fw-500 color-dark">{list.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonPropertyFeatureList;
