import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import SearchForm from '../components/flight/SearchForm';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';

const features = [
  {
    Icon: LocalActivityIcon,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Best Prices Guarantee',
    desc: 'We compare millions of flights to find you the absolute cheapest deals, strictly avoiding hidden fees.',
  },
  {
    Icon: SecurityIcon,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Secure Transactions',
    desc: 'Your payments are protected with 256-bit enterprise encryption and proactive fraud prevention systems.',
  },
  {
    Icon: StarIcon,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    title: 'Premium Class Experience',
    desc: 'Enjoy a beautiful, seamless, and ad-free booking flow managed by our 24/7 priority concierge support.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const queryParams = new URLSearchParams(searchParams).toString();
    navigate(`/results?${queryParams}`);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box className="w-full h-[650px] relative flex items-center justify-center -mt-20 overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-80 mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-blue-900/60 to-slate-50/100 z-10" />
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-10">
          <Typography
            variant="h1"
            className="text-white mb-6 drop-shadow-2xl font-black tracking-tight text-[2.5rem] sm:text-[4vw] md:text-[4.5rem] leading-[1.1]"
          >
            Elevate Your <br className="md:hidden"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-300">
              Travel Standard
            </span>
          </Typography>
          <Typography
            variant="h6"
            className="text-blue-50 font-medium mb-10 drop-shadow-md max-w-2xl mx-auto leading-relaxed opacity-95 text-[1rem] sm:text-[1.125rem]"
          >
            Discover unparalleled flight experiences to your dream destinations at unbeatable prices. Book smarter with SkyBooker today.
          </Typography>
        </div>
      </Box>

      {/* Search Form – overlaps the hero */}
      <Box className="w-full px-4 -mt-32 z-30 relative pb-20">
        <SearchForm onSearch={handleSearch} />
      </Box>

      {/* Features Section */}
      <Box className="bg-slate-50 py-24 relative overflow-hidden">
        {/* Soft decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <Container maxWidth="lg" className="relative z-10">
          {/* Section heading */}
          <div className="text-center mb-20">
            <Typography
              variant="h2"
              className="text-slate-900 font-extrabold mb-5 tracking-tight text-[2rem] sm:text-[3rem]"
            >
              Why Fly With{' '}
              <span className="text-blue-600">
                SkyBooker?
              </span>
            </Typography>
            <Typography variant="h6" className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed text-[1.125rem]">
              Experience a meticulously engineered travel platform tailored to make your flight reservations effortless and reliable.
            </Typography>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ Icon, iconBg, iconColor, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col items-center text-center p-10 rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <Icon className={`${iconColor} text-[32px]`} />
                </div>
                <Typography variant="h5" className="text-slate-900 font-bold mb-3 tracking-tight">
                  {title}
                </Typography>
                <Typography variant="body1" className="text-slate-500 leading-relaxed font-medium">
                  {desc}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Home;
