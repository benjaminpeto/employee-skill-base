import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbComponentProps {
  pathSegments: string[];
  labels: { [key: string]: string };
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  pathSegments,
  labels,
}) => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < pathSegments.length - 1 ? (
                <BreadcrumbLink
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                >
                  {labels[segment] || capitalize(segment)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {labels[segment] || capitalize(segment)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
