export const FeedbackMessage = ({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) => {
  return (
    <div
      style={{ height: 48 }}
      className={`flex items-center justify-center ${
        success ? 'bg-ra-green' : 'bg-red-600'
      } text-white font-bold absolute top-0 right-0 left-0`}
    >
      <span className="text-white font-bold">{message}</span>
    </div>
  );
};
