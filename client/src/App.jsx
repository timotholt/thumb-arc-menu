import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MenuProvider } from './contexts/MenuContext';
import ThumbMenu from './components/ThumbMenu';
import ActionBar from './components/ActionBar';
import Home from './pages/Home';
import Mindset from './pages/Mindset';
import Today from './pages/Today';
import DreamBuilder from './pages/DreamBuilder';
import Community from './pages/Community';
import Settings from './pages/Settings';
import './App.css';

function NavigationBar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { text: 'Home', icon: 'home', path: '/' },
    { text: 'Mindset', icon: 'psychology', path: '/mindset' },
    { text: 'Today', icon: 'today', path: '/today' },
    { text: 'DreamBuilder', icon: 'cloud', path: '/dreambuilder' },
    { text: 'Community', icon: 'groups', path: '/community' }
  ];

  useEffect(() => {
    // Update active tab based on current path
    const currentPath = location.pathname;
    const currentTab = navItems.find(item => item.path === currentPath)?.text.toLowerCase() || 'home';
    setActiveTab(currentTab);
  }, [location, setActiveTab]);

  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName.toLowerCase());
    navigate(path);
  };

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`nav-button ${activeTab === item.text.toLowerCase() ? 'active' : ''}`}
          onClick={() => handleNavigation(item.path, item.text)}
        >
          <span className="material-icons">{item.icon}</span>
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('material');

  const themes = [
    { text: 'Material', value: 'material' },
    { text: 'Bootstrap', value: 'bootstrap' },
    { text: 'Fabric', value: 'fabric' },
    { text: 'High Contrast', value: 'highcontrast' },
    { text: 'Tailwind', value: 'tailwind' }
  ];

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    
    // Remove existing theme
    document.body.classList.forEach(className => {
      if (className.startsWith('e-')) {
        document.body.classList.remove(className);
      }
    });
    
    // Add new theme
    document.body.classList.add(`e-${newTheme}`);
  };

  // Initialize theme on mount
  useEffect(() => {
    document.body.classList.add(`e-${currentTheme}`);
  }, []);

  return (
    <Router>
      <MenuProvider>
        <div className={`app-container theme-${currentTheme}`}>
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mindset" element={<Mindset />} />
              <Route path="/today" element={<Today />} />
              <Route path="/dreambuilder" element={<DreamBuilder />} />
              <Route path="/community" element={<Community />} />
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    currentTheme={currentTheme}
                    onThemeChange={handleThemeChange}
                    themes={themes}
                  />
                } 
              />
            </Routes>
          </div>
          <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <ThumbMenu />
          <ActionBar />
        </div>
      </MenuProvider>
    </Router>
  );
}

export default App;
