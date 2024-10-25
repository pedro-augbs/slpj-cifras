export function formatSpecialChars(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function formatStringToSlug(str: string) {
  return str
    .toLowerCase() // Converte todas as letras para minúsculas
    .normalize("NFD") // Normaliza a string decompondo os caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
    .replace(/ç/g, "c") // Substitui "ç" por "c"
    .replace(/\s+/g, "-") // Substitui espaços em branco por hífens
    .replace(/[^\w\-]+/g, "") // Remove caracteres que não são letras, números ou hífens
    .replace(/\-\-+/g, "-") // Substitui múltiplos hífens consecutivos por um único hífen
    .replace(/^-+/, "") // Remove hífens no início da string
    .replace(/-+$/, "") // Remove hífens no final da string
}
