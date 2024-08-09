import { Alert, AlertTitle } from "@/components/ui/alert";
import { FaCircleCheck } from "react-icons/fa6";

interface SuccessAlertComponentProps {
  message: string | null;
}

export const SuccessAlert: React.FC<SuccessAlertComponentProps> = ({
  message,
}) => {
  if (!message) return null;
  return (
    <Alert className="flex">
      <FaCircleCheck className="h-4 w-4 text-green-800 dark:text-green-400" />
      <AlertTitle className="border-green-800 dark:border-green-400 text-green-800 dark:text-green-400 justify-center">
        {message}
      </AlertTitle>
    </Alert>
  );
};
