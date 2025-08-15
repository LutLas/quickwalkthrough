import React, { useState } from "react";
import BusinessResultsTemp from "../BusinessScreen/Fillers/BusinessResultsTemp";
import BusinessHeader from "./Fillers/BusinessHeader";
import { gql, useQuery } from "@apollo/client";


/*Fragments*/
const BUSINESS_DETAILS_FRAGMENT = gql`
    fragment businessDetails on Business {
        businessId
        name
        address
        categories {
            name
        }
        isStarred @client
    }
`;
/*Fragments*/

/*Queries*/
const GET_BUSINESSES_QUERY = gql`
    query BusinessesByCategory($selectedCategory: String!, $searchText: String!) {
        businesses(
            where: { name_CONTAINS: $searchText, categories_SOME: { name_CONTAINS: $selectedCategory }}
        ) {
            ...businessDetails
        }
    }
    ${BUSINESS_DETAILS_FRAGMENT}
`;

/*const GET_BUSINESSES_BY_NAME_QUERY = gql`
    query BusinessesByCategory($searchText: String!) {
        businesses(
            where: { name_CONTAINS: $searchText } 
        ) {
            ...businessDetails
        }
    }
    ${BUSINESS_DETAILS_FRAGMENT}
`;*/



const GET_CATEGORIES_QUERY = gql`
    query GetCategories {
        categories {
            name
        }
    }
`;
/*Queries*/

function BusinessIndexScreen() {
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");

    const {
        loading: businessesLoading,
        error: businessesError,
        data: businessesData
    } = useQuery(
        GET_BUSINESSES_QUERY,{
            variables: { selectedCategory, searchText },
        });

    const {
        loading: categoriesLoading,
        error: categoriesError,
        data: categoriesData
    } = useQuery(GET_CATEGORIES_QUERY);

    /*const {
        loading: businessByNameLoading,
        error: businessByNameError,
        data: businessByNameData
    } = useQuery(GET_BUSINESSES_BY_NAME_QUERY);*/

    if (businessesError || categoriesError /*|| businessByNameError*/) return <p>Error</p>;
    if (businessesLoading || categoriesLoading /*|| businessByNameLoading*/) return <p>Loading...</p>;
    return (
        <div>
            <BusinessHeader/>
            <h1>Business Search</h1>

            <label>
                Search Business Name:
                <input
                    value={inputText}
                    onChange={event => setInputText(event.target.value)}/>
                <input type="button" value="SEARCH" onClick={() => setSearchText(inputText)}/>
            </label>
            <form>
                <label>
                    Select Business Category:
                    <select value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                    >
                        <option value="">All</option>
                        {categoriesData.categories.map((category) => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <input type="button" value="CLEAR" onClick={() => {
                    setSelectedCategory("")
                    setSearchText("")
                    setInputText("")
                }}/>
            </form>
            <BusinessResultsTemp businesses={businessesData.businesses}/>
        </div>
    );
}

export default BusinessIndexScreen;
