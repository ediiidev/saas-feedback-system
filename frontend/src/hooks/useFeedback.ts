import { useState, useCallback, useEffect } from "react";
import type { Feedback, FeedbackCategory } from "@/types/feedback";
import { useToast } from "@/hooks/use-toast";

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const { toast } = useToast();

  // 1. FUNCIÓN PARA CARGAR DATOS (GET)
  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback');
      const data = await response.json();
      
      // Mapeamos los datos de Supabase al formato que espera Lovable
      const formattedData = data.map((f: any) => ({
        id: f.id.toString(),
        name: f.name,
        category: f.category as FeedbackCategory,
        comment: f.message, // Supabase usa 'message', Lovable usa 'comment'
        status: "Pendiente",
        createdAt: f.created_at
      }));
      
      setFeedbacks(formattedData);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  }, []);

  // Cargar al iniciar
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // 2. FUNCIÓN PARA AGREGAR (POST)
  // Puedes dejar la que ya tienes o conectarla también aquí
  const addFeedback = useCallback((data: { name: string; category: FeedbackCategory; comment: string }) => {
     // Aquí podrías mover la lógica del fetch POST que pusimos en Index.tsx
     // Por ahora, refresquemos la lista después de enviar
     fetchFeedbacks();
  }, [fetchFeedbacks]);

  return {
    feedbacks,
    addFeedback,
    refreshFeedbacks: fetchFeedbacks
  };
}