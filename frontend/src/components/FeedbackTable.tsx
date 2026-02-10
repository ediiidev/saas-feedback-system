import type { Feedback } from "@/types/feedback";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryBadge, StatusBadge } from "@/components/FeedbackBadges";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface FeedbackTableProps {
  feedbacks: Feedback[];
  onResolve: (id: string) => void;
}

export function FeedbackTable({ feedbacks, onResolve }: FeedbackTableProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No se encontraron feedbacks con este filtro.
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-medium">Nombre</TableHead>
            <TableHead className="font-medium">Categoría</TableHead>
            <TableHead className="font-medium max-w-[300px]">Comentario</TableHead>
            <TableHead className="font-medium">Fecha</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((fb) => (
            <TableRow key={fb.id} className="animate-fade-in">
              <TableCell className="font-medium">{fb.name}</TableCell>
              <TableCell>
                <CategoryBadge category={fb.category} />
              </TableCell>
              <TableCell className="max-w-[300px] truncate text-muted-foreground text-sm">
                {fb.comment}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {format(new Date(fb.createdAt), "dd MMM yyyy", { locale: es })}
              </TableCell>
              <TableCell>
                <StatusBadge status={fb.status} />
              </TableCell>
              <TableCell className="text-right">
                {fb.status === "Pendiente" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                    onClick={() => onResolve(fb.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resolver
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
