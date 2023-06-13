import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import MarketResearch from './MarketResearch';
import PersonalizeEmail from './PersonalizeEmail';
import CRM from './crm/CRM';
import Marketing from './marketing/Marketing';
import FollowUp from './crm/FollowUp';
import WelcomeNew from './crm/WelcomeNew';
import SocialMediaPost from './marketing/SocialMediaPost';
import SocialMediaCaption from './marketing/SocialMediaCaption';
import MarketDetails from './MarketDetails';
const InvolveAi = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}x
                    />
                    <Route
                        path='/market-research'
                        element={<MarketResearch />}
                    />
                    <Route
                        path='/market-research/:id'
                        element={<MarketDetails />}
                    />
                    <Route
                        path='/personalize-email'
                        element={<PersonalizeEmail />}
                    />
                    <Route
                        path='/crm'
                        element={<CRM />}
                    />
                    <Route
                        path='/crm/follow-Up'
                        element={<FollowUp />}
                    />
                    <Route
                        path='/crm/welcome-new'
                        element={<WelcomeNew />}
                    />
                    <Route
                        path='/marketing'
                        element={<Marketing />}
                    />
                    <Route
                        path='/marketing/create-caption'
                        element={<SocialMediaCaption />}
                    />
                    <Route
                        path='/marketing/create-post'
                        element={<SocialMediaPost />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default InvolveAi;
