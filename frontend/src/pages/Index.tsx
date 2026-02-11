import { useState } from "react";
import type { FeedbackCategory } from "@/types/feedback";
import { useFeedback } from "@/hooks/useFeedback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const CATEGORIES: { value: FeedbackCategory; label: string }[] = [
  { value: "SaaS", label: "SaaS" },
  { value: "UI", label: "UI" },
  { value: "Error", label: "Error" },
];

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<FeedbackCategory | "">("");
  const [comment, setComment] = useState("");
  const { addFeedback } = useFeedback();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Preparamos los datos del formulario
    const formData = {
      name: name,
      category: category, // Aquí va si es SaaS, Idea, etc.
      message: comment    // Tu estado 'comment' es el mensaje
    };

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "¡Feedback enviado!",
          description: "Se ha guardado tu categoría: " + category,
        });
        // Limpiar estados
        setName("");
        setCategory("");
        setComment("");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <MessageSquarePlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Enviar Feedback</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Tu opinión nos ayuda a mejorar. Cuéntanos qué piensas.
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Nuevo feedback</CardTitle>
            <CardDescription>Completa los campos para enviar tu comentario.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val as FeedbackCategory)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comentario</Label>
                <Textarea
                  id="comment"
                  placeholder="Describe tu feedback en detalle..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {comment.length}/1000
                </p>
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Enviar Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Ir al Dashboard
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
