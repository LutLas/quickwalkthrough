// BusinessResultsTemp.js
import React from 'react';
import {starredVar} from "../../index";
import { useAuth0 } from "@auth0/auth0-react";

function BusinessResultsTemp(props) {
    const {businesses} = props;
    const starredItems = starredVar();
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <h2>Business Results</h2>
            <table>
                <thead>
                <tr>
                    <th>Star</th>
                    {/* Add a header for the Star button */}
                    <th>Name</th>
                    <th>Address</th>
                    <th>Category</th>
                    {isAuthenticated ? <th>Average Stars</th> : null}
                </tr>
                </thead>
                <tbody>
                {businesses.map((b) => (
                    <tr key={b.businessId}>
                        <td>
                            <button
                                onClick={() => {
                                    // toggle starred item, if starred then remove businessId from starredVar
                                    if (b.isStarred) {
                                        starredVar(
                                            starredItems.filter((i) => {
                                                return i !== b.businessId;
                                            })
                                        );
                                    } else {
                                        // not starred, add businessId to starredVar
                                        starredVar([...starredItems, b.businessId]);
                                    }
                                }}
                            >
                                Star
                            </button>
                        </td>
                        <td style={b.isStarred ? {fontWeight: "bold"} : null}>
                            {b.name}
                        </td>
                        <td> {/* No whitespace */}
                            {b.address}
                        </td>
                        <td> {/* No whitespace */}
                            {b.categories.map(c => c.name).join(", ")}
                        </td>
                        {isAuthenticated ? <td>{b.reviews.map(c => c.stars).reduce((acc, val)=> acc + val, 0)/b.reviews.map(c => c.stars).length}</td> : null}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BusinessResultsTemp;