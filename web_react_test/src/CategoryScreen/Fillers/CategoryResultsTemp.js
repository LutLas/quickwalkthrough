function CategoryResultsTemp(props) {
    const { categories } = props;

    return (
        <div>
            <h2>Catergory Results</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    {/*<th>Business Count</th>*/}
                </tr>
                </thead>
                <tbody>
                {categories.map((c, i) => (
                    <tr key={i}>
                        <td>
                            {c.name}
                        </td>
                        {/*<td>
                            {c.businesses.sum()}
                        </td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryResultsTemp;