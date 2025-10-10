'use client'
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  initialMinutes?: number; // default 5
  storageKey?: string; // key no localStorage (opcional)
  onResend?: () => Promise<void> | void; // callback quando clicar reenviar
  className?: string;
};

export default function ResendCodeButton({
  initialMinutes = 5,
  onResend,
}: Props) {

  // estado do tempo restante em ms
  const [loading, setLoading] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(initialMinutes * 60); // 5 minutos em segundos

  useEffect(() => {
    if (tempoRestante <= 0) return;

    const timer = setInterval(() => {
      setTempoRestante((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [tempoRestante]);

 function formatMs(ms: number) {
    const totalSeconds = Math.ceil(ms);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }


  // ação ao clicar reenviar
  async function handleResend() {
    if (tempoRestante > 0 || loading) return;
    try {
      setLoading(true);
      // dispara callback externo (ex: fetch /api/sendEmail)
      await onResend?.();

      setTempoRestante(initialMinutes*60*1000)
    } catch (err) {
      // trate erro como quiser (mensagem, toast...)
      console.error("Erro ao reenviar código:", err);
    } finally {
      setLoading(false);
    }
  }

  const isCounting = tempoRestante > 0;

  return (
    <Button
      onClick={handleResend}
      disabled={isCounting || loading}
      aria-disabled={isCounting || loading}
      className="cursor-pointer"
    >
      {loading ? "Enviando..." : isCounting ? `Reenviar código: ${formatMs(tempoRestante)}` : "Reenviar código"}
    </Button>
  );
}
