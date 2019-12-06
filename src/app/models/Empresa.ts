export interface Empresa {
  id: number;
  nome: string;
  endereco: string;
  cnpj: string;
  idArquivo?: number;
  file?: Blob;
}
