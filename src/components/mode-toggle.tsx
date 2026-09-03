import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={cn(
        "rounded-full text-inherit hover:bg-transparent hover:text-foreground",
        className
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="h-full w-full" />
      ) : (
        <MoonIcon className="h-full w-full" />
      )}
    </Button>
  );
}
