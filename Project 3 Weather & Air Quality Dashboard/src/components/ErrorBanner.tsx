interface ErrorBannerProps {
  message: string;
}

const ErrorBanner = ({ message }: ErrorBannerProps) => (
  <div
    role='alert'
    className='rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300'
  >
    {message}
  </div>
);

export default ErrorBanner;
