import { Routes, Route } from 'react-router-dom';
import PageBusiness from './BusinessScreen/BusinessIndexScreen';
import PageCategory from './CategoryScreen/CategoryIndexScreen';
import PageMain from './MainScreen/MainIndexScreen';

import { gql, useQuery } from "@apollo/client";
import {useAuth0} from "@auth0/auth0-react";
import React from "react";

import Profile from "./Profile";
import MainHeader from "./MainScreen/Fillers/MainHeader";


function App() {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    /*Fragments*/
    const BUSINESS_DETAILS_FRAGMENT = gql`
        fragment businessDetails on Business {
            businessId
            name
            address
            categories {
                name
            }
            reviews {
                stars
            }
            isStarred @client
        }
    `;

    const CATEGORY_DETAILS_FRAGMENT = gql`
    fragment categoryDetails on Category {
        name
        businesses {
            name
        }
    }
`;
    /*Fragments*/

    /*Queries*/
    const GET_BUSINESSES_QUERY = gql`
    query BusinessesByCategory($selectedCategory: String! = "", $searchText: String! = "") {
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
            ...categoryDetails
        }
    }
    ${CATEGORY_DETAILS_FRAGMENT}
`;
    /*Queries*/

    const {
        loading: businessesLoading,
        error: businessesError,
        data: businessesData
    } = useQuery(
        GET_BUSINESSES_QUERY);

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

    const businesses = businessesData.businesses
    const categories = categoriesData.categories

    return (
        <div>
            <MainHeader />
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
            {isAuthenticated && <button onClick={() => logout()}>Log Out</button>}
            <Profile />
            <Routes>
                <Route path="/" element={<PageMain />} />
                <Route path="/PageBusiness" element={<PageBusiness businesses={businesses} categories={categories} />} />
                <Route path="/PageCategory" element={<PageCategory businesses={businesses} categories={categories} />} />
            </Routes>
        </div>
    );
}

export default App;
