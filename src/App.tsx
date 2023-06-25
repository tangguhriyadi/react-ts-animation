import "./App.css";
import Collection from "./pages/collection";
import CollectionDetail from "./pages/collection_detail";
import AnimeDetail from "./pages/detail";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <h1>it will be navbar</h1>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/anime-detail/:id" element={<AnimeDetail/>} />
                        <Route path="/collection" element={<Collection/>} />
                        <Route path="/collection/:id" element={<CollectionDetail/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
