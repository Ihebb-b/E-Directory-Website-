import React from "react";

function Sidebar({ filters }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const urlParams = new URLSearchParams(window.location.search);

    if (checked) {
      urlParams.append(name, name);
    } else {
      const currentValues = urlParams.get(name)?.split(",") || [];
      const updatedValues = currentValues.filter((val) => val !== name);
      urlParams.set(name, updatedValues.join(","));
    }

    window.history.replaceState(null, "", `?${urlParams.toString()}`);
    window.location.reload(); // Optionally, refetch data dynamically
  };

  const diets = ["Vegan", "Vegetarian", "Fruitarian", "Flexitarian", "No Diet"];

  return (
    <div className="sidebar sticky-sidebar col-lg-3">
      <div className="widget-sidebar">
        <h4 className="widget-title text-uppercase font-weight-bold">Filter Restaurants</h4>
        <div className="filter_type mt-4">
          <h6 className="text">Diet</h6>
          <ul className="list-unstyled">
            {diets.map((diet) => (
              <li key={diet} className="d-flex align-items-center mb-2">
                <span className="flex-grow-1">{diet}</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="diet"
                    id={diet}
                    value={diet}
                    checked={filters.diet?.includes(diet)}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
