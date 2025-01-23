import { Info } from "lucide-react";
import { FormLabel } from "../ui/form";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { competencies } from "../../misc/competency-data";
import React from "react";

export default function CompetencySheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FormLabel className="flex items-center gap-x-2 mb-4">
          Core Competencies
          <Info
            className="text-gray-500 hover:text-white cursor-pointer"
            width={16}
            height={16}
          />
        </FormLabel>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Core Competencies</SheetTitle>
          <SheetDescription>
            {competencies.map((competency, index) => (
              <React.Fragment key={index}>
                <span className="text-lg text-gray-300">
                  {competency.title}
                </span>
                <br />
                <span className="text-gray-500 text-md">
                  {competency.description}
                </span>
                <br />
              </React.Fragment>
            ))}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
