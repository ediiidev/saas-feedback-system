import { Badge } from "@/components/ui/badge";
import type { FeedbackCategory, FeedbackStatus } from "@/types/feedback";

const categoryStyles: Record<FeedbackCategory, string> = {
  SaaS: "bg-[hsl(var(--badge-saas-bg))] text-[hsl(var(--badge-saas-text))] border-transparent",
  UI: "bg-[hsl(var(--badge-ui-bg))] text-[hsl(var(--badge-ui-text))] border-transparent",
  Error: "bg-[hsl(var(--badge-error-bg))] text-[hsl(var(--badge-error-text))] border-transparent",
};

const statusStyles: Record<FeedbackStatus, string> = {
  Pendiente: "bg-[hsl(var(--badge-pending-bg))] text-[hsl(var(--badge-pending-text))] border-transparent",
  Resuelto: "bg-[hsl(var(--badge-resolved-bg))] text-[hsl(var(--badge-resolved-text))] border-transparent",
};

export function CategoryBadge({ category }: { category: FeedbackCategory }) {
  return (
    <Badge variant="outline" className={categoryStyles[category]}>
      {category}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: FeedbackStatus }) {
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
}
