import AcceleratorCard from './AcceleratorCard';
import EmptyState from '@/shared/components/EmptyState';
import type { Accelerator } from '../types';

interface AcceleratorGridProps {
  accelerators: Accelerator[];
  onClearFilters: () => void;
}

const AcceleratorGrid = ({ accelerators, onClearFilters }: AcceleratorGridProps) => {
  if (accelerators.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} message="No accelerators found" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {accelerators.map((accelerator, index) => (
        <div
          key={accelerator.name}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <AcceleratorCard accelerator={accelerator} />
        </div>
      ))}
    </div>
  );
};

export default AcceleratorGrid;

