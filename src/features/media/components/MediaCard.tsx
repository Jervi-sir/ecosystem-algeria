import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Media, MediaCategory } from '../types';

interface MediaCardProps {
  media: Media;
  category: MediaCategory | undefined;
}

const MediaCard = ({ media, category }: MediaCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const showImage = media.image && !imageError;
  
  // Check if description is long enough to need truncation (approximately 150 characters for 3 lines)
  const needsTruncation = media.description.length > 150;
  const displayDescription = isExpanded || !needsTruncation 
    ? media.description 
    : media.description.substring(0, 150);

  return (
    <article className="group relative bg-card rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-5">
        {showImage ? (
          <img
            src={media.image}
            alt={`${media.title} icon`}
            className="flex-shrink-0 w-12 h-12 rounded-xl object-cover bg-secondary/40"
            onError={() => setImageError(true)}
          />
        ) : category ? (
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/40 flex items-center justify-center text-3xl" aria-label={category.name}>
            {category.icon}
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-card-foreground truncate group-hover:text-primary transition-colors duration-300">
              {media.title}
            </h3>
          </div>
          {category && (
            <p className="text-sm font-medium text-primary/80 mb-2">{category.name}</p>
          )}
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
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-9 h-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group-hover:scale-110"
          aria-label={`Visit ${media.title}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default MediaCard;
