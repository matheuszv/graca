/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import SeletorDeCoordenadas from "./seletordecoordenadas";

interface cidades {
    nome: string;
    id: string;
    codigo_ibge: number;
    nome_completo: string;
    uf: string;
    estado: string;
    regiao: string;
    coord: [number, number];
    capital: boolean;
    ddd: number | null;
}


export default function NovoPontoForm({
  cidades,
  cidadesFormatadas,
  fields,
}: {
  cidades: cidades[];
  cidadesFormatadas: any[];
  fields: any;
}) {
  // Apenas estados necessários para UI
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date[]>(fields ? fields.data : []);

  // Refs para capturar valores
  const formRef = useRef<HTMLFormElement>(null);
  const coordenadaRef = useRef<[number, number] | null>(fields ? fields.coordenada : null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<number>(fields ? fields.cidade : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;
    // Captura todos os dados do formulário de uma vez
    const formData = new FormData(formRef.current);

    const dados = {
      nome: formData.get("nome") as string,
      local: formData.get("local") as string,
      endereco: formData.get("endereco") as string,
      tipoApoio: parseInt(formData.get("tipoApoio") as string),
      hora: formData.get("hora") as string,
      descricao: formData.get("descricao") as string,
      cidade: cidadeSelecionada,
      coordenada: coordenadaRef.current,
      contato: formData.get("contato") as string,
      data: date.map((dia) => dia.toLocaleDateString()).join(","),
      instagram: formData.get("instagram") as string,
    };

    const result = await fetch('/api/novoponto',{
      method: fields ? 'PUT':'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields ? {...dados, id: fields.id} : dados)
    })

    if(result.ok){
      fields ? alert("PONTO ALTERADO COM SUCESSO") : alert("PONTO CADASTRADO COM SUCESSO")
    } else {
      alert("Erro ao criar o ponto")
    }
  };

  return (
    <div className="flex-1 justify-center items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 justify-center flex flex-col p-4 rounded-lg w-[500px] max-md:w-[350px] z-[10] max-md:p-2">
        <Card className="border-border bg-card backdrop-blur-sm shadow-2xl max-md:gap-0.5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground max-md:text-lg">
              Novo Ponto de Doação
            </CardTitle>
            <p className="text-sm text-muted-foreground max-md:text-sx">
              Preencha as informações para cadastrar um novo ponto
            </p>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 max-md:space-y-2"
            >
              {/* NOME */}
              <div className="space-y-2 max-md:space-y-1">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  defaultValue={fields ? fields.nome : ''}
                  placeholder="Ex: Apoio a UPA de Mangabeira"
                  className="max-md:text-sm"
                  required
                />
              </div>

              {/* LOCAL + CIDADE */}
              <div className="flex items-center justify-between gap-4 max-md:gap-2">
                <div className="space-y-2 max-md:space-y-1 flex-1">
                  <Label htmlFor="local">Local</Label>
                  <Input
                    id="local"
                    name="local"
                    defaultValue={fields ? fields.local : ''}
                    placeholder="Ex: UPA de Mangabeira"
                    className="max-md:text-sm"
                    required
                  />
                </div>
                <div className="space-y-2 max-md:space-y-1">
                  <Label htmlFor="local">Cidade</Label>
                  <ComboboxDemo
                    cidades={cidadesFormatadas}
                    handleCidadeFiltro={(id) => {
                      setCidadeSelecionada(id); // Atualiza o estado (re-render)
                    }}
                    escolhida={cidadeSelecionada}
                    disabled={false}
                  />
                </div>
              </div>

              {/* ENDEREÇO */}
              <div className="space-y-2 max-md:space-y-1">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  defaultValue={fields ? fields.endereco : ''}
                  placeholder="Rua João Carlos, 1587"
                  className="max-md:text-sm"
                  required
                />
              </div>

              {/* DATA + HORA */}
              <div className="flex gap-4 max-md:gap-2 ">
                <div className="flex flex-col flex-1 gap-3 max-w-[320px] max-md:max-w-[212px]">
                  <Label htmlFor="date-picker" className="px-1">
                    Dia(s)
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        id="date-picker"
                        className="flex-1 justify-between font-normal overflow-x-hidden max-md:text-xs"
                      >
                        {date.length > 0
                          ? date.map((dia) => dia?.toLocaleDateString()).join(",")
                          : "Selecione o(s) dia(s)"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="multiple"
                        required
                        selected={date}
                        onSelect={(date) => {
                          setDate(date || []);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Hora
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    name="hora"
                    defaultValue={fields ? fields.hora: ''}
                    step="60"
                    className="bg-background max-md:text-xs appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>

              {/* TIPO APOIO */}
               <div className="flex gap-4 max-md:gap-2 ">
                  <div className="space-y-2 max-md:space-y-1">
                    <Label htmlFor="tipoApoio">Tipo de Apoio</Label>
                    <Select name="tipoApoio" defaultValue={fields ? fields.tipoApoio.toString() : null}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Alimentos</SelectItem>
                        <SelectItem value="2">Roupas</SelectItem>
                        <SelectItem value="3">Higiene</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2 max-md:space-y-1">
                    <Label>Contato</Label>
                    <Input
                      type="text"
                      defaultValue={fields ? fields.contato : ''}
                      placeholder="(011)01122-3344"
                      name="contato"
                      className="bg-background max-md:text-xs appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                  <div className="flex-1 space-y-2 max-md:space-y-1">
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      defaultValue={fields ? fields.instagram : ''}
                      placeholder="@InstaDoProjeto"
                      name="instagram"
                      className="bg-background max-md:text-xs appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
               </div>
              

              {/* COORDENADAS */}
              <div className="space-y-2 max-md:space-y-1">
                <Label>Localização no mapa</Label>
                <SeletorDeCoordenadas
                  cidadeCoord={
                    cidades.find(
                      (cidade) => cidade.codigo_ibge === cidadeSelecionada
                    )?.coord
                  }
                  onSelect={(coords) => {
                    coordenadaRef.current = coords;
                  }}
                  coordenadaAtual={fields ? fields.coordenada : null}
                />
                {coordenadaRef.current && (
                  <p className="text-xs text-zinc-500">
                    📍 {coordenadaRef.current[0].toFixed(6)},{" "}
                    {coordenadaRef.current[1].toFixed(6)}
                  </p>
                )}
              </div>

              {/* DESCRIÇÃO */}
              <div className="space-y-2 max-md:space-y-1">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  defaultValue={fields ? fields.descricao : ''}
                  placeholder="Descreva detalhes importantes..."
                  required
                  className="min-h-[100px] max-md:text-sm"
                />
              </div>

              {/* BOTÃO */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all hover:shadow-lg cursor-pointer max-md:h-10 max-md:text-sm"
              >
                Cadastrar Ponto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ComboboxDemoProps = {
  cidades: any[];
  disabled: boolean;
  escolhida: number;
  handleCidadeFiltro: (cidade: number) => void;
};

export function ComboboxDemo({
  cidades,
  disabled,
  escolhida,
  handleCidadeFiltro,
}: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(escolhida ? escolhida : 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between max-md:text-[10px] max-md:w-[120px] w-[180px] truncate cursor-pointer"
        >
          {id
            ? cidades.find((cidade) => cidade.id === id)?.nome
            : "Escolha a cidade"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cidade" className="" />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {cidades.map((cidade) => (
                <CommandItem
                  key={cidade.id}
                  value={cidade.id}
                  onSelect={() => {
                    setId(cidade.id);
                    setOpen(false);
                    handleCidadeFiltro(cidade.id);
                  }}
                >
                  {cidade.nome}
                  <Check
                    className={cn(
                      "ml-auto",
                      id === cidade.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}