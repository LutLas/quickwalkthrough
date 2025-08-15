import { Routes, Route } from 'react-router-dom';
import PageBusiness from './BusinessScreen/BusinessIndexScreen';
import PageCategory from './CategoryScreen/CategoryIndexScreen';
import PageMain from './MainScreen/MainIndexScreen';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PageMain />} />
                <Route path="/PageBusiness" element={<PageBusiness />} />
                <Route path="/PageCategory" element={<PageCategory />} />
            </Routes>
        </div>
    );
}
export default App;
