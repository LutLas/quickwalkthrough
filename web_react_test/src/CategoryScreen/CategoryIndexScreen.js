import React, { useState } from "react";
import CategoryResultsTemp from "../CategoryScreen/Fillers/CategoryResultsTemp";
import { gql, useQuery } from "@apollo/client";
import CategoryHeader from "./Fillers/CategoryHeader";


/*Fragments*/
const CATEGORY_DETAILS_FRAGMENT = gql`
    fragment categoryDetails on Category {
        name
        businesses{
            businessId
            name
            address
        }
    }
`;
/*Fragments*/

/*Queries*/
const GET_CATEGORIES_QUERY = gql`
    query CategoriesByBusiness($selectedBusiness: String!) {
        categories(
            where: { businesses_SOME: { name_CONTAINS: $selectedBusiness } }
        ) {
            ...categoryDetails
        }
    }
    ${CATEGORY_DETAILS_FRAGMENT}
`;

const GET_BUSINESSES_QUERY = gql`
    query GetBusinesses {
        businesses{
            businessId
            name
        }
    }
`;
/*Queries*/

function CategoryIndexScreen() {
    const [selectedBusiness, setSelectedBusiness] = useState("");

    const {
            data: categoriesData,
            loading: categoriesLoading,
            error: categoriesError
        } = useQuery(
                GET_CATEGORIES_QUERY,{
                    variables: { selectedBusiness },
                });

    const {
        loading: businessesLoading,
        error: businessesError,
        data: businessesData
    } = useQuery(GET_BUSINESSES_QUERY);

    if (businessesError || categoriesError) return <p>Error</p>;
    if (businessesLoading || categoriesLoading) return <p>Loading...</p>;
    return (
        <div>
            <CategoryHeader />
            <h1>Category Search</h1>
            <form>
                <label>
                    Select Business in Category:
                    <select value={selectedBusiness}
                            onChange={(event) => setSelectedBusiness(event.target.value)}
                    >
                        <option value="">All</option>
                        {businessesData.businesses.map((business) => (
                            <option key={business.name} value={business.name}>
                                {business.name}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="button" value="CLEAR" onClick={() => setSelectedBusiness("")}/>
            </form>
            <CategoryResultsTemp categories={categoriesData.categories} />
        </div>
    );
}
export default CategoryIndexScreen;
