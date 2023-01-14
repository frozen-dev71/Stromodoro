import Overview from '../components/Dashboard/Overview';
import { useEffect, useState } from 'react';
import ProductiveHours from '../components/Dashboard/ProductiveHours';
import Distribution from '../components/Dashboard/Distribution';

let isInitial = true;
const DashboardPage = () => {
  const [welcomeIsShown, setWelcomeIsShown] = useState();

  useEffect(() => {
    if (isInitial) {
      setWelcomeIsShown(true);
      isInitial = false;
    }
    return () => {
      setWelcomeIsShown(false);
    };
  }, []);

  return (
    <div className="main-grid">
      {welcomeIsShown && <h2 className="greeting">Welcome back!</h2>}
      <Overview />
      <ProductiveHours />
      <Distribution />
    </div>
  );
};

export default DashboardPage;
