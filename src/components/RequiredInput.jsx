"use-client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function RequiredInput({ label, value, onChange, type = "text", disabled = false }) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input 
        id={id} 
        value={value}
        placeholder={`Enter ${label}`}
        onChange={onChange}
        type={type}
        disabled={disabled}
        required 
        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}
