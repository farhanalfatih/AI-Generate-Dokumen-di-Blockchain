import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType; // opsional
  description?: string;
  href?: string;
  cta?: ReactNode; // bisa string / element
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    {background && <div className="absolute inset-0">{background}</div>}

    <div className="relative z-10 p-4">
      <div className="flex flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
        {Icon && (
          <Icon className="h-10 w-10 text-neutral-700 dark:text-neutral-300 mb-2" />
        )}
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        {description && (
          <p className="max-w-lg text-neutral-400">{description}</p>
        )}
      </div>

      {cta && (
        <div className="flex justify-center mt-4 gap-4">{cta}</div>
      )}

      {href && (
        <div className="hidden lg:flex absolute bottom-0 w-full translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 p-4">
          <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
            <a href={href}>
              {cta || "Learn more"}
              <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
            </a>
          </Button>
        </div>
      )}
    </div>
  </div>
);

export { BentoCard, BentoGrid };
