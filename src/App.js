import './stylesheets/homePage/hero.css';
import './stylesheets/homePage/features.css';
import './stylesheets/homePage/aboutus.css';
import './stylesheets/homePage/contactus.css';
import './stylesheets/homePage/footer.css';
import './stylesheets/homePage/navbar.css';
import './stylesheets/user/login.css';
import './stylesheets/user/currentUserProfile.css';
import './stylesheets/feed/feed.css';
import './stylesheets/feed/feedNavBar.css';
import './stylesheets/feed/post.css';
import './stylesheets/feed/posts.css';
import './App.css';
import './stylesheets/notfound.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/homePage/Home';
import LogIn from './components/user/LogIn';
import SignUp from './components/user/SignUp';
import CurrentUserProfile from './components/user/userProfile';
import NotFound from './components/NotFound';
import Feed from './components/feed/Feed';

function App() {
  return (
    <div className="Home">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/userProfile" element={<CurrentUserProfile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
