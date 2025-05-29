"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiSelectSearchProps {
  options: { id: string; name: string }[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder: string
  searchPlaceholder: string
}

export default function MultiSelectSearch({
  options,
  selected,
  onSelectionChange,
  placeholder,
  searchPlaceholder,
}: MultiSelectSearchProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (optionId: string) => {
    const newSelected = selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]
    onSelectionChange(newSelected)
  }

  const removeSelected = (optionId: string) => {
    onSelectionChange(selected.filter((id) => id !== optionId))
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-blue-200"
          >
            {selected.length > 0 ? `${selected.length} sélectionné(s)` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.id} onSelect={() => handleSelect(option.id)}>
                    <Check className={cn("mr-2 h-4 w-4", selected.includes(option.id) ? "opacity-100" : "opacity-0")} />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((selectedId) => {
            const option = options.find((opt) => opt.id === selectedId)
            return (
              <Badge key={selectedId} variant="secondary" className="bg-blue-100 text-blue-800">
                {option?.name}
                <button type="button" onClick={() => removeSelected(selectedId)} className="ml-2 hover:text-red-600">
                  ×
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
