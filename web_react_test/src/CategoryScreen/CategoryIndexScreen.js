import React, { useState } from "react";
import CategoryResultsTemp from "../CategoryScreen/Fillers/CategoryResultsTemp";


function CategoryIndexScreen(props) {
    const [selectedBusiness, setSelectedBusiness] = useState("");

    const handleSelectedBusinessChange = e => {
        setSelectedBusiness(e.target.value)
    };

    const filteredByCategoriesBusiness = props.categories.filter(
        category=>category.businesses.some(c=>c.name.toLowerCase().includes(selectedBusiness.toLowerCase()))
    )

    return (
        <div>
            <h1>Category Search</h1>
            <form>
                <label>
                    Select Business in Category:
                    <select value={selectedBusiness}
                            onChange={handleSelectedBusinessChange}
                    >
                        <option value="">All</option>
                        {props.businesses.map((business) => (
                            <option key={business.name} value={business.name}>
                                {business.name}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="button" value="CLEAR" onClick={() => setSelectedBusiness("")}/>
            </form>
            <CategoryResultsTemp categories={filteredByCategoriesBusiness} />
        </div>
    );
}
export default CategoryIndexScreen;
