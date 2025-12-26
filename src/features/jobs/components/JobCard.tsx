import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const domain = new URL(job.url).hostname.replace(/^www\./, '');
  const faviconUrl = `https://fetchfavicon.com/i/${domain}?size=64`;
  
  const needsTruncation = job.description.length > 100;
  const displayDescription = isExpanded || !needsTruncation 
    ? job.description 
    : job.description.substring(0, 100);
  
  return (
    <article className="group relative bg-card rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-5">
        {imageError ? (
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-secondary/40 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">{job.name.charAt(0).toUpperCase()}</span>
          </div>
        ) : (
          <img
            src={faviconUrl}
            alt={`${job.name} logo`}
            className="flex-shrink-0 w-10 h-10 rounded-xl object-contain"
            onError={() => setImageError(true)}
          />
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-card-foreground truncate mb-1 group-hover:text-primary transition-colors duration-300">
            {job.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {displayDescription}
            {needsTruncation && !isExpanded && '... '}
            {needsTruncation && isExpanded && ' '}
            {needsTruncation && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors inline"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-9 h-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group-hover:scale-110"
          aria-label={`Visit ${job.name} website`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default JobCard;

