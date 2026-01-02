import { Rocket, Building2, Zap, Users, Radio, Briefcase, MessageCircle, Calendar, BookOpen, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMemo } from 'react';

// Icon Map for dynamic types
const iconMap: Record<string, any> = {
  'startup': Rocket,
  'incubator': Building2,
  'accelerator': Zap,
  'coworking-space': Users,
  'media': Radio,
  'job_portal': Briefcase,
  'community': MessageCircle,
  'event': Calendar,
  'resource': BookOpen,
};

const Header = () => {
  const location = useLocation();

  // Fetch Entity Types dynamically
  const { data: entityTypes, isLoading } = useQuery({
    queryKey: ['header_entity_types'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('api?task=get-lookups&table=entity_types', {
        method: 'GET'
      });
      if (error) throw error;
      return data as { id: string, slug: string, name: string }[];
    }
  });

  const navItems = useMemo(() => {
    // Start with dynamic types
    const dynamicItems = (entityTypes || []).map(type => ({
      path: `/${type.slug}s`, // Simple pluralization for URL
      label: type.name,
      icon: iconMap[type.slug] || Info, // Fallback icon
      order: Object.keys(iconMap).indexOf(type.slug) // Keep consistent order if possible
    })).sort((a, b) => {
      // Sort by defined iconMap order to keep UI consistent, or name if unknown
      if (a.order === -1 && b.order === -1) return a.label.localeCompare(b.label);
      if (a.order === -1) return 1;
      if (b.order === -1) return -1;
      return a.order - b.order;
    });

    // Add static items
    return [
      ...dynamicItems,
      { path: '/about', label: 'About', icon: Info }
    ];
  }, [entityTypes]);

  return (
    <header className="text-center py-6 sm:py-8 px-4 border-b border-border/40 mb-0 pb-0">
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-primary-foreground flex-shrink-0">
          <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">Algeria Ecosystem</h2>
        <div className="flex items-center flex-shrink-0 mt-1">
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 max-w-full overflow-x-auto">
        {isLoading ? (
          // Skeleton Loading
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 bg-muted animate-pulse rounded-lg flex-shrink-0"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))
        ) : (
          navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/about' && location.pathname.startsWith(item.path));
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
          })
        )}
      </nav>
    </header>
  );
};

export default Header;

