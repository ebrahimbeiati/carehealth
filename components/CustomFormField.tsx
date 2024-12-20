"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SelectValue, Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";


interface CustomProps {
  control: Control<any>,
  name: string,
  label?: string,
  fieldType: FormFieldType,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  value?: any,
  renderSkeleton?: (field: any) => React.ReactNode,
}
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}


const RenderField = ({ field, props }: { field: any; props: CustomProps}) => {
  const { fieldType, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 ">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input border-0 bg-slate-200"
              value={props.value}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
          <FormControl>
          <Textarea placeholder={placeholder}
            {...field} className="shad-textarea"
            disabled={props.disabled}
          />
             
            
          </FormControl>
      )

      
    

    case FormFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={placeholder}
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              withCountryCallingCode
              international
              className="input-phone border-none bg-slate-200"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/images/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    
    case FormFieldType.SELECT:
      return (
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      </FormControl>
      )
    
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
         
        </FormControl>
      )
    
    default:
      break;
  }
}


const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
