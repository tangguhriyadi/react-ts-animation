import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Collection from "./pages/collection";
import CollectionDetail from "./pages/collection_detail";
import AnimeDetail from "./pages/detail";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./hooks/useNotification";
import ModalNotif from "./components/ModalNotif";

function App() {
    return (
        <BrowserRouter>
            <NotificationProvider>
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/anime-detail/:id"
                            element={<AnimeDetail />}
                        />
                        <Route path="/collection" element={<Collection />} />
                        <Route
                            path="/collection/:id"
                            element={<CollectionDetail />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ModalNotif />
                </div>
                <Footer author="Muhammad Tangguh Riyadi" year={2023} />
            </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;
