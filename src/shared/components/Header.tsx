import { Rocket, Building2, Zap, Users, Radio, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  description?: string;
}

const Header = ({ 
  title = "Startups",
  description = "Discover the vibrant startup ecosystem of Algeria. Explore innovative companies shaping the future across technology, finance, and beyond."
}: HeaderProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Startups', icon: Rocket },
    { path: '/incubators', label: 'Incubators', icon: Building2 },
    { path: '/accelerators', label: 'Accelerators', icon: Zap },
    { path: '/coworking-spaces', label: 'Co-Working Spaces', icon: Users },
    { path: '/media', label: 'Media', icon: Radio },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
  ];

  return (
    <header className="text-center py-8 sm:py-12 md:py-16 px-4">
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-primary-foreground">
          <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Algeria Ecosystem</h2>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-2 max-w-full overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden min-[375px]:inline">{item.label}</span>
              <span className="min-[375px]:hidden">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4 px-4">
        {title}
      </h1>
      
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
        {description}
      </p>
    </header>
  );
};

export default Header;

