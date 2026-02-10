import { useState } from "react";
import type { FeedbackCategory } from "@/types/feedback";
import { useFeedback } from "@/hooks/useFeedback";
import { FeedbackTable } from "@/components/FeedbackTable";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FILTER_OPTIONS: { value: FeedbackCategory | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "SaaS", label: "SaaS" },
  { value: "UI", label: "UI" },
  { value: "Error", label: "Error" },
];

const Dashboard = () => {
  const { feedbacks, markAsResolved, getFilteredFeedbacks } = useFeedback();
  const [activeFilter, setActiveFilter] = useState<FeedbackCategory | "all">("all");

  const filtered = activeFilter === "all" ? feedbacks : getFilteredFeedbacks(activeFilter);

  const totalCount = feedbacks.length;
  const pendingCount = feedbacks.filter((f) => f.status === "Pendiente").length;
  const resolvedCount = feedbacks.filter((f) => f.status === "Resuelto").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-[52px]">
              Gestiona y revisa los feedbacks de tus usuarios.
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Formulario
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-semibold mt-1">{totalCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Pendientes</p>
            <p className="text-2xl font-semibold mt-1 text-[hsl(var(--badge-pending-text))]">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Resueltos</p>
            <p className="text-2xl font-semibold mt-1 text-[hsl(var(--badge-resolved-text))]">
              {resolvedCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <span className="text-sm text-muted-foreground mr-1">Filtrar:</span>
          {FILTER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              size="sm"
              variant={activeFilter === opt.value ? "default" : "outline"}
              className="text-xs h-8"
              onClick={() => setActiveFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        {/* Table */}
        <div className="animate-fade-in">
          <FeedbackTable feedbacks={filtered} onResolve={markAsResolved} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
