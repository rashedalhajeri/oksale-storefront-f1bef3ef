
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className={cn("relative group", isFocused && "focused-input-wrapper")}>
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "hide-password-toggle pr-10 transition-all duration-300",
            isFocused && "ring-2 ring-primary/20",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "absolute right-0 top-0 h-full px-3 py-1 text-gray-400 hover:text-gray-600 transition-colors duration-200",
            isFocused && "text-primary hover:text-primary/80"
          )}
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 animate-in fade-in duration-200" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4 animate-in fade-in duration-200" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          </span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
