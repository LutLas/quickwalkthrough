import React, { useState } from "react";
import BusinessResultsTemp from "../BusinessScreen/Fillers/BusinessResultsTemp";


function BusinessIndexScreen(props) {


    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSearchTextChange = e => {
        setSearchText(e.target.value)
    };

    const handleSelectedCategoryChange = e => {
        setSelectedCategory(e.target.value)
    };

    const filteredByBusinessesName = props.businesses.filter(
        business => business.name.toLowerCase().includes(searchText.toLowerCase())
    )

    const filteredByBusinessesCategory = filteredByBusinessesName.filter(
            business => business.categories.some(c=>c.name.toLowerCase().includes(selectedCategory.toLowerCase()))
    )

    return (
        <div>
            <h1>Business Search</h1>

            <label>
                Search Business Name:
                <input
                    value={searchText}
                    onChange={handleSearchTextChange}/>
            </label>
            <form>
                <label>
                    Select Business Category:
                    <select value={selectedCategory}
                            onChange={handleSelectedCategoryChange}
                    >
                        <option value="">All</option>
                        {props.categories.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="button" value="CLEAR" onClick={() => {
                    setSelectedCategory("")
                    setSearchText("")
                }}/>
            </form>
            <BusinessResultsTemp businesses={filteredByBusinessesCategory}/>
        </div>
    );
}

export default BusinessIndexScreen;
