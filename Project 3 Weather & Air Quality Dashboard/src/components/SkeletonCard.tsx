interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({ className = '' }: SkeletonCardProps) => (
  <div
    className={`animate-pulse rounded-2xl border border-line bg-panel ${className}`}
    aria-hidden='true'
  />
);

export default SkeletonCard;
