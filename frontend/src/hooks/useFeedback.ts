import { useState, useCallback } from "react";
import type { Feedback, FeedbackCategory } from "@/types/feedback";

const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: "1",
    name: "Carlos Méndez",
    category: "SaaS",
    comment: "La integración con Stripe falla al procesar pagos recurrentes. El error aparece en el tercer ciclo de cobro.",
    status: "Pendiente",
    createdAt: "2026-02-08T10:30:00Z",
  },
  {
    id: "2",
    name: "Ana García",
    category: "UI",
    comment: "El sidebar se superpone al contenido principal en dispositivos móviles. Afecta la navegación completa.",
    status: "Resuelto",
    createdAt: "2026-02-07T14:15:00Z",
  },
  {
    id: "3",
    name: "Miguel Torres",
    category: "Error",
    comment: "Error 500 al intentar exportar reportes en formato CSV. Solo ocurre con datasets mayores a 1000 registros.",
    status: "Pendiente",
    createdAt: "2026-02-06T09:45:00Z",
  },
  {
    id: "4",
    name: "Laura Ruiz",
    category: "SaaS",
    comment: "Sería ideal tener un sistema de notificaciones por email cuando un ticket cambia de estado.",
    status: "Pendiente",
    createdAt: "2026-02-05T16:20:00Z",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    category: "UI",
    comment: "Los gráficos del dashboard tardan mucho en cargar. Consideren lazy loading o paginación.",
    status: "Resuelto",
    createdAt: "2026-02-04T11:00:00Z",
  },
];

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACKS);

  // TODO: Replace with API call — POST /api/feedbacks
  const addFeedback = useCallback(
    (data: { name: string; category: FeedbackCategory; comment: string }) => {
      const newFeedback: Feedback = {
        id: crypto.randomUUID(),
        ...data,
        status: "Pendiente",
        createdAt: new Date().toISOString(),
      };
      setFeedbacks((prev) => [newFeedback, ...prev]);
    },
    []
  );

  // TODO: Replace with API call — PATCH /api/feedbacks/:id
  const markAsResolved = useCallback((id: string) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Resuelto" as const } : f))
    );
  }, []);

  // TODO: Replace with API call — GET /api/feedbacks?category=X
  const getFilteredFeedbacks = useCallback(
    (category?: FeedbackCategory) => {
      if (!category) return feedbacks;
      return feedbacks.filter((f) => f.category === category);
    },
    [feedbacks]
  );

  return { feedbacks, addFeedback, markAsResolved, getFilteredFeedbacks };
}
