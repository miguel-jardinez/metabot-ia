import Image from "next/image";

type LoadingStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({ title, description } : LoadingStateProps) => (
  <div className="flex flex-col items-center justify-center">
    <Image 
      src="/empty.svg"
      alt="empty"
      width={240}
      height={240}
    />
    <div className="flex flex-col gap-y-6 max-w-md x-auto text-center">
      <h6 className="text-lg font-medium">{title}</h6>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
 
export default EmptyState;
