import { FormFieldWrapperProps } from "@/types/form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  name,
  label,
  placeholder,
  description,
  type = "text",
  component: Component = Input,
  disabled = false,
  form,
  onChange,
  ...props
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Component
            placeholder={placeholder}
            {...field}
            type={type}
            disabled={disabled}
            onChange={onChange || field.onChange}
            value={field.value ?? ""}
            {...props}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
